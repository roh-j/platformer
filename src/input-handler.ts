import { Main } from "./index";

export class InputHandler {
  main: Main; // 메인
  keys: string[];

  handleKeyDown: EventListener;
  handleKeyUp: EventListener;

  constructor({ main }: { main: Main }) {
    this.main = main;
    this.keys = [];

    // 키 다운 이벤트 제어
    this.handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "ArrowRight" ||
          event.key === "ArrowDown" ||
          event.key === "ArrowLeft" ||
          event.key === " ") &&
        !this.keys.includes(event.key)
      ) {
        this.keys.push(event.key);
      }
    };

    // 키 업 이벤트 제어
    this.handleKeyUp = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === " "
      ) {
        this.keys.splice(this.keys.indexOf(event.key), 1);
      }
    };

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  destory() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }
}
