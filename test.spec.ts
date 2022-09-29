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
    enum E_STOCK_FILTER_TYPE {
      E_STOCK_ALL, //全部

      E_STOCK_FILTER_ST, //过滤ST

      E_STOCK_FILTER_NEWSTOCK, //过滤未开板新股

      E_STOCK_FILTER_ST_NEWSTOCK, //过滤ST跟未开板新股

    }
    interface BBB {
      count: string;
      name?: string;
      age: string;
      vx?: XXX[];
      b: boolean;
    }
    interface ZZZ {
      count: string;
      name?: string;
      age: string;
      zb: STORM_EYE_IDX_TYPE;
      bage: ABC.BBB;
    }
    interface FLeadBlkRsp {
      vecData?: ABC.ZZZ[];
      mapNumOfStk?: Record<string, ZZZ>; //各个异动对应个股数

    }
  }
}
export {};