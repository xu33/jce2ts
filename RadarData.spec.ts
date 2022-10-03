declare global {
  namespace RadarData {
    enum E_STARS_LEVEL {
      E_STARS_NONE,
      E_STARS_LEVEL1,
      E_STARS_LEVEL2,
      E_STARS_LEVEL3,
      E_STARS_LEVEL4,
    }
    enum E_STRENGTH_CHANGE {
      NO_CHANGE,
      UP_CHANGE,
      DOWN_CHANGE,
    }
    interface Temperature {
      iMarket?: string;
      sCode?: string;
      iUpdateTime?: string;
      dblStrength?: string;
      lStrengthBuy?: string;
      lStrengthSell?: string;
      dblLatent?: string;
      lLatentBuy?: string;
      lLatentSell?: string;
    }
    interface RadarQt {
      iStockID?: string;
      iTime?: string;
      dblStrength?: string;
      eStarsLevel?: E_STARS_LEVEL;
      lStrengthBuy?: string;
      lStrengthSell?: string;
      eChgFlag?: E_STRENGTH_CHANGE;
      dNowPrice?: string;
      dPrevPrice?: string;
    }
    enum E_RADAR_TYPE {
      E_RADAR_BUY,
      E_RADAR_SELL,
    }
    interface RadarChg {
      iStockID?: string;
      iTime?: string;
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
      iTime?: string;
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
      iDate?: string;
      iFlag?: string;
      vtTemperature?: Array<Temperature>;
    }
  }
}
export {};