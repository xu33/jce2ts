declare global {
  namespace ABC {
    //财务权息版本数据
    interface HCWVerData {
      shtSetCode?: string;
      sCode?: string;
      lCWVersion?: string; //财务数据最新版本

      lQXVersion?: string; //权息数据最新版本

      lLTGChgVersion?: string; //变动流通股最新版本

    }
    // 股票类型
    enum E_STOCK_TYPE {
      E_STOCK_TYPE_A, // A股

      E_STOCK_TYPE_B, // B股

    }
  }
}
export {};