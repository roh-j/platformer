import { Main } from "./index";
import { TBackground } from "./resource";

class Layer {
  main: Main; // 메인
  source: TBackground; // 불러올 배경 이미지 소스

  speedWeight: number; // 배경 이동 속도 가중치
  position: { x: number; y: number };

  constructor({
    main,
    source,
    speedWeight,
    position,
  }: {
    main: Main;
    source: TBackground;
    speedWeight: number;
    position: { x: number; y: number };
  }) {
    this.main = main;
    this.source = source;

    this.speedWeight = speedWeight;
    this.position = position;
  }

  update(dx: number) {
    const backgroundImage = this.main.resource.background[this.source];

    // 이동 시켰을 때, 벗어나는지 확인
    if (
      this.position.x <= -backgroundImage.width ||
      this.position.x >= backgroundImage.width ||
      this.position.x - dx * this.speedWeight < -backgroundImage.width ||
      this.position.x - dx * this.speedWeight > backgroundImage.width
    ) {
      this.position.x = 0;
    }

    this.position.x -= dx * this.speedWeight;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const backgroundImage = this.main.resource.background[this.source];

    // 화면에서 벗어나는 영역도 미리 이미지를 불러옴
    for (let i = -1; i <= 2; i++) {
      ctx.drawImage(
        backgroundImage.image,
        this.position.x + backgroundImage.width * i,
        this.position.y,
        backgroundImage.width,
        backgroundImage.height
      );
    }
  }
}

export class Background {
  main: Main; // 메인
  layers: Layer[]; // 배경 레이어

  constructor({ main }: { main: Main }) {
    this.main = main;
    this.layers = [
      new Layer({
        main,
        source: "LAYER_1",
        speedWeight: 0.2,
        position: { x: 0, y: 0 },
      }),
      new Layer({
        main,
        source: "LAYER_2",
        speedWeight: 0.4,
        position: { x: 0, y: 0 },
      }),
      new Layer({
        main,
        source: "LAYER_3",
        speedWeight: 0.6,
        position: { x: 0, y: 0 },
      }),
      new Layer({
        main,
        source: "LAYER_4",
        speedWeight: 0.8,
        position: { x: 0, y: 0 },
      }),
      new Layer({
        main,
        source: "LAYER_5",
        speedWeight: 1,
        position: { x: 0, y: 0 },
      }),
    ];
  }

  update(dx: number) {
    this.layers.forEach((layer: Layer) => {
      layer.update(dx);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.layers.forEach((layer: Layer) => {
      layer.draw(ctx);
    });
  }
}
