declare global {
  namespace ABC {
    interface XXX {
      count: string; //风口数量指标

      name?: string;
      age: string;
    }
    enum STORM_EYE_IDX_TYPE {
      STORM_EYE_IDX_TYPE_NUM, //风口数量指标

      STORM_EYE_IDX_TYPE_LEVEL, //板块风级指标

    }
    interface BBB {
      count: string;
      name?: string;
      age: string;
    }
    interface ZZZ {
      count: string;
      name?: string;
      age: string;
      zb: STORM_EYE_IDX_TYPE;
    }
  }
}
export {};