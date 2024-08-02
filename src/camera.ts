import { Main } from "./index";

export class Camera {
  main: Main; // 메인

  position: { x: number; y: number };
  movement: {
    over: number;
    back: number;
    forward: number;
  }; // 화면이 이동되는 임계치 값

  constructor({ main }: { main: Main }) {
    this.main = main;

    this.position = { x: 0, y: 0 };
    /**
     * 320 x 240 기준 (해상도 비율로 조절)
     *
     * over: 60
     * back: 40
     * forward: 200
     */
    this.movement = {
      over: (this.main.stageHeight / 240) * 60,
      back: (this.main.stageWidth / 320) * 40,
      forward: (this.main.stageWidth / 320) * 200,
    };
  }

  update() {
    // 플레이어 화면이 맵 크기를 넘지 않고,
    // 풀레이어 좌표가 화면 이동 임계치를 넘길 때 (y축)
    if (
      this.position.y + this.main.stageHeight <= this.main.map.height &&
      ((this.main.player.velocity.y > 0 && // 떨어지면서 화면 이동 임계치를 넘길 때
        this.main.player.position.y - this.position.y >= this.movement.over) ||
        (this.main.player.velocity.y < 0 && // 점프하면서 화면 이동 임계치를 넘길 때
          this.main.player.position.y - this.position.y <= this.movement.over))
    ) {
      // 좌표 보정 (화면 이탈 방지)
      if (
        this.position.y + this.main.stageHeight + this.main.player.velocity.y >=
        this.main.map.height
      ) {
        this.position.y = this.main.map.height - this.main.stageHeight;
      } else {
        this.position.y += this.main.player.velocity.y;
      }
    }

    // 플레이어 화면이 맵 크기를 넘지 않고,
    // 풀레이어 좌표가 화면 이동 임계치를 넘길 때 (x축 - forward)
    if (
      this.position.x + this.main.stageWidth <= this.main.map.width &&
      this.main.player.position.x - this.position.x >= this.movement.forward
    ) {
      // 좌표 보정 (화면 이탈 방지)
      if (this.position.x + this.main.stageWidth + this.main.player.speed >= this.main.map.width) {
        this.position.x = this.main.map.width - this.main.stageWidth;
      } else {
        this.position.x += this.main.player.speed;

        // 배경 화면 이동
        this.main.map.background.update(this.main.player.speed);
      }
    }

    // 플레이어 화면이 맵 크기를 넘지 않고,
    // 풀레이어 좌표가 화면 이동 임계치를 넘길 때 (x축 - back)
    if (
      this.position.x >= 0 &&
      this.main.player.position.x - this.position.x <= this.movement.back
    ) {
      // 좌표 보정 (화면 이탈 방지)
      if (this.position.x - this.main.player.speed <= 0) {
        this.position.x = 0;
      } else {
        this.position.x -= this.main.player.speed;

        // 배경 화면 이동
        this.main.map.background.update(-this.main.player.speed);
      }
    }
  }
}
