import { Main } from "./index";
import { TUserState } from "./resource";

class PlayerState {
  main: Main; // 메인

  state: TUserState;

  constructor({ main, state }: { main: Main; state: TUserState }) {
    this.main = main;

    this.state = state;
  }

  enter() {
    const playerImage = this.main.resource.user[this.state];

    this.main.player.currentFrame = 0;
    this.main.player.width = playerImage.width / playerImage.totalFrame;
    this.main.player.height = playerImage.height;
  }
}

export class IdleRight extends PlayerState {
  constructor(main: { main: Main }) {
    super({ ...main, state: "IDLE_RIGHT" });
  }

  handleInput({ input }: { input: string[] }) {
    // 플레이어가 떨어질 때
    if (!this.main.onPlatform()) {
      this.main.player.setState("LANDING_RIGHT");
    }

    if (input.includes("ArrowRight")) {
      this.main.player.setState("RUN_RIGHT");
    }

    if (input.includes("ArrowLeft")) {
      this.main.player.setState("RUN_LEFT");
    }

    if (input.includes(" ")) {
      this.main.player.setState("JUMP_RIGHT");
    }
  }
}

export class IdleLeft extends PlayerState {
  constructor(main: { main: Main }) {
    super({ ...main, state: "IDLE_LEFT" });
  }

  handleInput({ input }: { input: string[] }) {
    // 플레이어가 떨어질 때
    if (!this.main.onPlatform()) {
      this.main.player.setState("LANDING_LEFT");
    }

    if (input.includes("ArrowRight")) {
      this.main.player.setState("RUN_RIGHT");
    }

    if (input.includes("ArrowLeft")) {
      this.main.player.setState("RUN_LEFT");
    }

    if (input.includes(" ")) {
      this.main.player.setState("JUMP_LEFT");
    }
  }
}

export class RunRight extends PlayerState {
  constructor(main: { main: Main }) {
    super({ ...main, state: "RUN_RIGHT" });
  }

  handleInput({ input }: { input: string[] }) {
    // 플레이어가 떨어질 때
    if (!this.main.onPlatform()) {
      this.main.player.setState("LANDING_RIGHT");
    }

    if (input.includes(" ") && input.includes("ArrowRight")) {
      this.main.player.setState("JUMP_RIGHT");
    }

    if (!input.includes("ArrowRight")) {
      this.main.player.setState("IDLE_RIGHT");
    }
  }
}

export class RunLeft extends PlayerState {
  constructor(main: { main: Main }) {
    super({ ...main, state: "RUN_LEFT" });
  }

  handleInput({ input }: { input: string[] }) {
    // 플레이어가 떨어질 때
    if (!this.main.onPlatform()) {
      this.main.player.setState("LANDING_LEFT");
    }

    if (input.includes(" ") && input.includes("ArrowLeft")) {
      this.main.player.setState("JUMP_LEFT");
    }

    if (!input.includes("ArrowLeft")) {
      this.main.player.setState("IDLE_LEFT");
    }
  }
}

export class JumpRight extends PlayerState {
  constructor(main: { main: Main }) {
    super({ ...main, state: "JUMP_RIGHT" });
  }

  handleInput({ input }: { input: string[] }) {
    if (input.includes("ArrowLeft") && !input.includes("ArrowRight")) {
      this.main.player.setState("JUMP_LEFT");
    }

    if (this.main.player.velocity.y >= 0) {
      this.main.player.setState("LANDING_RIGHT");
    }
  }
}

export class JumpLeft extends PlayerState {
  constructor(main: { main: Main }) {
    super({ ...main, state: "JUMP_LEFT" });
  }

  handleInput({ input }: { input: string[] }) {
    if (input.includes("ArrowRight") && !input.includes("ArrowLeft")) {
      this.main.player.setState("JUMP_RIGHT");
    }

    if (this.main.player.velocity.y >= 0) {
      this.main.player.setState("LANDING_LEFT");
    }
  }
}

export class LandingRight extends PlayerState {
  constructor(main: { main: Main }) {
    super({ ...main, state: "LANDING_RIGHT" });
  }

  handleInput({ input }: { input: string[] }) {
    if (input.includes("ArrowLeft") && !input.includes("ArrowRight")) {
      this.main.player.setState("LANDING_LEFT");
    }

    if (this.main.onPlatform()) {
      this.main.player.setState("IDLE_RIGHT");
    }
  }
}

export class LandingLeft extends PlayerState {
  constructor(main: { main: Main }) {
    super({ ...main, state: "LANDING_LEFT" });
  }

  handleInput({ input }: { input: string[] }) {
    if (input.includes("ArrowRight") && !input.includes("ArrowLeft")) {
      this.main.player.setState("LANDING_RIGHT");
    }

    if (this.main.onPlatform()) {
      this.main.player.setState("IDLE_LEFT");
    }
  }
}
