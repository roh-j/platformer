import { Dust } from "./particle";
import { FrameUtil } from "./utils";
import { Main } from "./index";
import {
  IdleLeft,
  IdleRight,
  JumpLeft,
  JumpRight,
  LandingLeft,
  LandingRight,
  RunLeft,
  RunRight,
} from "./player-state";

export class User {
  main: Main; // 메인

  frameUtil: FrameUtil;

  dusts: Dust[]; // 먼지 파티클

  /** 플레이어의 모든 움직임 상태 정의 */
  states: any;
  currentState: any;
  currentFrame: number;

  width: number; // 플레이어 너비
  height: number; // 플레이어 높이

  position: { x: number; y: number };
  velocity: { y: number };
  speed: number; // 플레이어 움직임 속도

  constructor({ main, position }: { main: Main; position: { x: number; y: number } }) {
    this.main = main;

    this.frameUtil = new FrameUtil(15);

    this.dusts = [];

    this.states = {
      IDLE_RIGHT: new IdleRight({ main }),
      IDLE_LEFT: new IdleLeft({ main }),
      RUN_RIGHT: new RunRight({ main }),
      RUN_LEFT: new RunLeft({ main }),
      JUMP_RIGHT: new JumpRight({ main }),
      JUMP_LEFT: new JumpLeft({ main }),
      LANDING_RIGHT: new LandingRight({ main }),
      LANDING_LEFT: new LandingLeft({ main }),
    };
    this.currentState = this.states.IDLE_RIGHT; // IDLE_RIGHT 상태를 기본으로 지정
    this.currentFrame = 0;

    const userImage = this.main.resource.user[this.currentState.state];

    this.width = userImage.width / userImage.totalFrame;
    this.height = userImage.height;

    this.position = position;
    this.velocity = { y: 0 };
    this.speed = 5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const userImage = this.main.resource.user[this.currentState.state];

    ctx.drawImage(
      userImage.image,
      this.width * this.currentFrame,
      0,
      this.width,
      this.height,
      this.position.x - this.main.camera.position.x,
      this.position.y - this.main.camera.position.y,
      this.width,
      this.height
    ); // 캐릭터 렌더링
  }
}
