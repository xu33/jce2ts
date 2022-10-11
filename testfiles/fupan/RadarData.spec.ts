declare global {
  namespace RadarData {
    enum E_STARS_LEVEL {
      E_STARS_NONE = 0,
      E_STARS_LEVEL1 = 1,
      E_STARS_LEVEL2 = 2,
      E_STARS_LEVEL3 = 3,
      E_STARS_LEVEL4 = 4,
    }
    enum E_STRENGTH_CHANGE {
      NO_CHANGE = 1,
      UP_CHANGE = 2,
      DOWN_CHANGE = 3,
    }
    interface Temperature {
      iMarket?: number;
      sCode?: string;
      iUpdateTime?: number;
      dblStrength?: string;
      lStrengthBuy?: string;
      lStrengthSell?: string;
      dblLatent?: string;
      lLatentBuy?: string;
      lLatentSell?: string;
    }
    interface RadarQt {
      iStockID?: number;
      iTime?: number;
      dblStrength?: string;
      eStarsLevel?: E_STARS_LEVEL;
      lStrengthBuy?: string;
      lStrengthSell?: string;
      eChgFlag?: E_STRENGTH_CHANGE;
      dNowPrice?: string;
      dPrevPrice?: string;
    }
    enum E_RADAR_TYPE {
      E_RADAR_BUY = 1,
      E_RADAR_SELL = 2,
    }
    interface RadarChg {
      iStockID?: number;
      iTime?: number;
      eType?: E_RADAR_TYPE;
      eStarsLevel?: E_STARS_LEVEL;
      lStrengthBuy?: string;
      lStrengthSell?: string;
      eChgFlag?: E_STRENGTH_CHANGE;
      dNowPrice?: string;
      dPrevPrice?: string;
    }
    interface RadarQtList {
      vRadarQt?: Array<RadarQt>;
    }
    interface RadarRtMin {
      uiStockID?: string;
      iTime?: number;
      dblRtStrength?: string;
      lRtStrengthBuy?: string;
      lRtStrengthSell?: string;
    }
    interface RadarRtMinList {
      bClear?: boolean;
      uiStockID?: string;
      vData?: Array<RadarRtMin>;
    }
    interface RadarRtMinBatchList {
      vStock?: Array<RadarRtMinList>;
    }
    interface TempList {
      iDate?: number;
      iFlag?: number;
      vtTemperature?: Array<Temperature>;
    }
  }
}
export {};