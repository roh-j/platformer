import { Main } from "./index";
import { TPlatform } from "./resource";

export class Platform {
  main: Main; // 메인

  source: TPlatform; // 배경 이미지 주소
  position: { x: number; y: number };

  constructor({
    main,
    source,
    position,
  }: {
    main: Main;
    source: TPlatform;
    position: { x: number; y: number };
  }) {
    this.main = main;

    this.source = source;
    this.position = position;
  }

  update(dx: number) {
    this.position.x -= dx;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const platformImage = this.main.resource.platform[this.source];

    ctx.drawImage(
      platformImage.image,
      this.position.x - this.main.camera.position.x,
      this.position.y - this.main.camera.position.y,
      platformImage.width,
      platformImage.height
    );
  }
}
