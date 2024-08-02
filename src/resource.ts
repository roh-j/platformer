export type TBackground = "LAYER_1" | "LAYER_2" | "LAYER_3" | "LAYER_4" | "LAYER_5";

export type TPlatform = "SQUARE";

export type TUserState =
  | "IDLE_RIGHT"
  | "IDLE_LEFT"
  | "RUN_RIGHT"
  | "RUN_LEFT"
  | "JUMP_RIGHT"
  | "JUMP_LEFT"
  | "LANDING_RIGHT"
  | "LANDING_LEFT";

const RESOURCES = {
  BACKGROUND: {
    LAYER_1: {
      src: "/resources/img/background/layer_1.png",
      width: 1536,
      height: 864,
      totalFrame: 1,
    },
    LAYER_2: {
      src: "/resources/img/background/layer_2.png",
      width: 1536,
      height: 864,
      totalFrame: 1,
    },
    LAYER_3: {
      src: "/resources/img/background/layer_3.png",
      width: 1536,
      height: 864,
      totalFrame: 1,
    },
    LAYER_4: {
      src: "/resources/img/background/layer_4.png",
      width: 1536,
      height: 864,
      totalFrame: 1,
    },
    LAYER_5: {
      src: "/resources/img/background/layer_5.png",
      width: 1536,
      height: 864,
      totalFrame: 1,
    },
  },
  PLATFORM: {
    SQUARE: {
      src: "/resources/img/platform/square.png",
      width: 192,
      height: 192,
      totalFrame: 1,
    },
  },
  USER: {
    IDLE_RIGHT: {
      src: "/resources/img/user/idle_right.png",
      width: 1008,
      height: 148,
      totalFrame: 12,
    },
    IDLE_LEFT: {
      src: "/resources/img/user/idle_left.png",
      width: 1008,
      height: 148,
      totalFrame: 12,
    },
    RUN_RIGHT: {
      src: "/resources/img/user/run_right.png",
      width: 736,
      height: 148,
      totalFrame: 8,
    },
    RUN_LEFT: {
      src: "/resources/img/user/run_left.png",
      width: 736,
      height: 148,
      totalFrame: 8,
    },
    JUMP_RIGHT: {
      src: "/resources/img/user/jump_right.png",
      width: 76,
      height: 148,
      totalFrame: 1,
    },
    JUMP_LEFT: {
      src: "/resources/img/user/jump_left.png",
      width: 76,
      height: 148,
      totalFrame: 1,
    },
    LANDING_RIGHT: {
      src: "/resources/img/user/landing_right.png",
      width: 88,
      height: 148,
      totalFrame: 1,
    },
    LANDING_LEFT: {
      src: "/resources/img/user/landing_left.png",
      width: 88,
      height: 148,
      totalFrame: 1,
    },
  },
};

export class Resource {
  background: any; // 배경 이미지
  platform: any; // 플랫폼 이미지
  user: any; // 플레이어 이미지

  constructor() {
    this.background = {
      LAYER_1: {
        image: this.load(RESOURCES.BACKGROUND.LAYER_1.src),
        ...RESOURCES.BACKGROUND.LAYER_1,
      },
      LAYER_2: {
        image: this.load(RESOURCES.BACKGROUND.LAYER_2.src),
        ...RESOURCES.BACKGROUND.LAYER_2,
      },
      LAYER_3: {
        image: this.load(RESOURCES.BACKGROUND.LAYER_3.src),
        ...RESOURCES.BACKGROUND.LAYER_3,
      },
      LAYER_4: {
        image: this.load(RESOURCES.BACKGROUND.LAYER_4.src),
        ...RESOURCES.BACKGROUND.LAYER_4,
      },
      LAYER_5: {
        image: this.load(RESOURCES.BACKGROUND.LAYER_5.src),
        ...RESOURCES.BACKGROUND.LAYER_5,
      },
    };

    this.platform = {
      SQUARE: {
        image: this.load(RESOURCES.PLATFORM.SQUARE.src),
        ...RESOURCES.PLATFORM.SQUARE,
      },
    };

    this.user = {
      IDLE_RIGHT: {
        image: this.load(RESOURCES.USER.IDLE_RIGHT.src),
        ...RESOURCES.USER.IDLE_RIGHT,
      },
      IDLE_LEFT: {
        image: this.load(RESOURCES.USER.IDLE_LEFT.src),
        ...RESOURCES.USER.IDLE_LEFT,
      },
      RUN_RIGHT: {
        image: this.load(RESOURCES.USER.RUN_RIGHT.src),
        ...RESOURCES.USER.RUN_RIGHT,
      },
      RUN_LEFT: {
        image: this.load(RESOURCES.USER.RUN_LEFT.src),
        ...RESOURCES.USER.RUN_LEFT,
      },
      JUMP_RIGHT: {
        image: this.load(RESOURCES.USER.JUMP_RIGHT.src),
        ...RESOURCES.USER.JUMP_RIGHT,
      },
      JUMP_LEFT: {
        image: this.load(RESOURCES.USER.JUMP_LEFT.src),
        ...RESOURCES.USER.JUMP_LEFT,
      },
      LANDING_RIGHT: {
        image: this.load(RESOURCES.USER.LANDING_RIGHT.src),
        ...RESOURCES.USER.LANDING_RIGHT,
      },
      LANDING_LEFT: {
        image: this.load(RESOURCES.USER.LANDING_LEFT.src),
        ...RESOURCES.USER.LANDING_LEFT,
      },
    };
  }

  load(source: string) {
    const image = new Image();
    image.src = source;

    return image;
  }
}
