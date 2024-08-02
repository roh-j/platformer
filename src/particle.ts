import { Main } from "./index";

class Particle {
  main: Main; // 메인

  position: { x: number; y: number };
  direction: { x: number; y: number };
  size: number;

  constructor({
    main,
    position,
    direction,
    size,
  }: {
    main: Main;
    position: { x: number; y: number };
    direction: { x: number; y: number };
    size: number;
  }) {
    this.main = main;

    this.position = { ...position };
    this.direction = direction;
    this.size = size;
  }
}

export class Dust extends Particle {
  isHide: boolean;
  speed: number;

  constructor({
    main,
    position,
    direction,
    speed,
  }: {
    main: Main;
    position: { x: number; y: number };
    direction: { x: number; y: number };
    speed: number;
  }) {
    super({
      main,
      position,
      direction,
      size: Math.random() * 10 + 5,
    });

    this.isHide = false;
    this.speed = speed;
  }

  update() {
    this.position.x -= this.direction.x * this.speed;
    this.position.y -= this.direction.y * this.speed;

    this.size *= 0.95;

    if (this.size < 0.5) {
      this.isHide = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.position.x - this.main.camera.position.x,
      this.position.y - this.main.camera.position.y,
      this.size,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "#000";
    ctx.fill();
  }
}
