export class FrameUtil {
  fps: number;
  time: number;

  constructor(fps: number) {
    this.fps = fps;
  }

  needsUpdate(current: number) {
    if (!this.time) {
      this.time = current;
    }

    if (1000 / this.fps >= current - this.time) {
      return false;
    }

    this.time = current;
    return true;
  }
}
