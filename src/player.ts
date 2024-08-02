import { Dust } from "./particle";
import { User } from "./user";

export class Player extends User {
  update({ current, input }: { current: number; input: string[] }) {
    if (this.frameUtil.needsUpdate(current)) {
      const playerImage = this.main.resource.user[this.currentState.state];

      this.currentFrame = (this.currentFrame + 1) % playerImage.totalFrame;
    }

    // 우측 키 입력
    if (input.includes("ArrowRight")) {
      // 플레이어 화면 이탈 방지
      if (this.position.x + this.speed >= this.main.map.width) {
        this.position.x = this.main.map.width;
      } else {
        this.position.x += this.speed;
      }

      this.dusts.push(
        new Dust({
          main: this.main,
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height - 30,
          },
          direction: {
            x: Math.random(),
            y: Math.random(),
          },
          speed: this.speed * 0.6,
        })
      );
    }

    // 좌측 키 입력
    if (input.includes("ArrowLeft")) {
      // 플레이어 화면 이탈 방지
      if (this.position.x - this.speed <= 0) {
        this.position.x = 0;
      } else {
        this.position.x -= this.speed;
      }

      this.dusts.push(
        new Dust({
          main: this.main,
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height - 30,
          },
          direction: {
            x: -Math.random(),
            y: Math.random(),
          },
          speed: this.speed * 0.6,
        })
      );
    }

    // 스페이스 키 입력
    if (input.includes(" ") && this.main.onPlatform()) {
      this.velocity.y = -15;
    }

    this.currentState.handleInput({ input });
  }

  setState(state: any) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}
