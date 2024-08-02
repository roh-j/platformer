import { Background } from "./background";
import { Main } from "./index";
import { Platform } from "./platform";

export class Map {
  main: Main; // 메인

  width: number;
  height: number;

  background: Background; // 배경화면 인스턴스
  platforms: Platform[]; // 플랫폼 인스턴스

  constructor({ main }: { main: Main }) {
    this.main = main;

    this.width = 1920 * 2;
    this.height = 1080 * 2;

    this.background = new Background({ main });
    this.platforms = [
      new Platform({ main: this.main, source: "SQUARE", position: { x: 0, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 1, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 2, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 3, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 4, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 5, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 6, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 7, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 8, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 9, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 10, y: 1968 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 3, y: 1768 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 4, y: 1568 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 5, y: 1368 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 7, y: 1568 } }),
      new Platform({ main: this.main, source: "SQUARE", position: { x: 192 * 8, y: 1568 } }),
    ];
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.background.draw(ctx); // 배경화면
    this.platforms.forEach((platform: Platform) => {
      platform.draw(ctx);
    }); // 플랫폼
  }
}
