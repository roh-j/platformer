import { Camera } from "./camera";
import { Dust } from "./particle";
import { FrameUtil } from "./utils";
import { InputHandler } from "./input-handler";
import { Map } from "./map";
import { Platform } from "./platform";
import { Player } from "./player";
import { Resource } from "./resource";

export class Main {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stageWidth: number;
  stageHeight: number;

  requestId: number;
  resizeHandler: EventListener;
  frameUtil: FrameUtil;
  inputHandler: InputHandler; // 입력 핸들러

  camera: Camera; // 플레이어 화면
  resource: Resource; // 리소스 인스턴스
  map: Map; // 맵
  player: Player; // 플레이어 인스턴스

  gravity: number; // 중력

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.resizeHandler = this.resize.bind(this);

    window.addEventListener("resize", this.resizeHandler);
    this.resize();

    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  onPlatformVertical({ player, platform }: { player: Player; platform: Platform }) {
    return (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y
    );
  }

  onPlatformHorizon({ player, platform }: { player: Player; platform: Platform }) {
    const platformImage = this.resource.platform[platform.source];

    return (
      player.position.x + player.width / 2 >= platform.position.x &&
      player.position.x + player.width / 2 <= platform.position.x + platformImage.width
    );
  }

  onPlatform() {
    return this.map.platforms
      .map(
        (platform: Platform) =>
          this.onPlatformVertical({ player: this.player, platform }) &&
          this.onPlatformHorizon({ player: this.player, platform })
      )
      .reduce((prev: boolean, cur: boolean) => prev || cur);
  }

  resize() {
    this.stageWidth = this.canvas.getBoundingClientRect().width;
    this.stageHeight = this.canvas.getBoundingClientRect().height;

    // Retina Display 지원
    // this.canvas.width = this.stageWidth * 2;
    // this.canvas.height = this.stageHeight * 2;
    // this.ctx.scale(2, 2);

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.frameUtil = new FrameUtil(120);
    this.inputHandler = new InputHandler({ main: this }); // 입력 핸들러

    this.camera = new Camera({ main: this });
    this.resource = new Resource();
    this.map = new Map({ main: this });
    this.player = new Player({ main: this, position: { x: 200, y: 0 } });

    this.gravity = 0.5; // 중력
  }

  update(current: number) {
    if (!this.frameUtil.needsUpdate(current)) {
      return;
    }

    this.player.dusts.forEach((dust: Dust, index: number) => {
      dust.update();

      if (dust.isHide) {
        this.player.dusts.splice(index, 1);
      }
    }); // 파티클 업데이트

    this.player.update({ current, input: this.inputHandler.keys }); // 플레이어 업데이트
    this.camera.update();
    this.player.position.y += this.player.velocity.y; // 플레이어 중력 적용

    // 플레이어와 플랫폼 상호작용
    if (this.onPlatform()) {
      for (let i = 0; i < this.map.platforms.length; i++) {
        if (this.onPlatformVertical({ player: this.player, platform: this.map.platforms[i] })) {
          this.player.position.y = this.map.platforms[i].position.y - this.player.height;
          break;
        }
      }

      this.player.velocity.y = 0;
      return;
    }

    this.player.velocity.y += this.gravity;
  }

  draw() {
    this.map.draw(this.ctx); // 맵 렌더링
    this.player.dusts.forEach((dust: Dust) => {
      dust.draw(this.ctx);
    }); // 움직임 파티클
    this.player.draw(this.ctx); // 캐릭터 렌더링
  }

  animate(current: number) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.update(current);
    this.draw();

    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  destroy() {
    window.removeEventListener("resize", this.resizeHandler);
    this.inputHandler.destory();
    cancelAnimationFrame(this.requestId);
  }
}

const canvasEl = document.getElementById("canvas") as HTMLCanvasElement;

new Main({ canvas: canvasEl });
