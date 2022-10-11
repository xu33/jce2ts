declare global {
  namespace FuPan {
    interface StockInfo {
      shtSetcode?: string;
      sCode?: string;
    }
    interface StkInfo {
      sett?: string;
      code?: string;
    }
    interface StkSimpInfo {
      iMarket?: number;
      sCode?: string;
      sName?: string;
    }
    enum E_STOCK_FILTER_TYPE {
      E_STOCK_ALL = 0,
      E_STOCK_FILTER_ST,
      E_STOCK_FILTER_NEWSTOCK,
      E_STOCK_FILTER_ST_NEWSTOCK,
    }
    enum E_STOCK_POOL_TYPE {
      E_STOCK_ZT_POOL = 0,
      E_STOCK_ONE_POOL,
      E_STOCK_T_POOL,
      E_STOCK_CHANGE_POOL,
      E_STOCK_OPEN_POOL,
      E_STOCK_STRONG_POOL,
      E_STOCK_COMP_POOL,
      E_STOCK_LASTZT_POOL,
      E_STOCK_DT_POOL,
      E_STOCK_DT_OPEN_POOL,
      E_STOCK_FANBAO_ZT_POOL,
      E_STOCK_HIT_BOARD_POOL,
      E_STOCK_BARGAIN_HUNTING_POOL,
      E_STOCK_POOL_TYPE_END,
    }
    enum E_STOCK_ZT_TYPE {
      E_STOCK_ZT_UNKNOWN,
      E_STOCK_COMP_ZT,
      E_STOCK_ONE_BOARD,
      E_STOCK_T_BOARD,
      E_STOCK_CHANGE_BOARD,
      E_STOCK_OPEN_BOARD,
    }
    enum E_BLOCK_CLASS_TYPE {
      E_BLOCK_INDUSTRY = 0,
      E_BLOCK_AREA,
      E_BLOCK_CONCEPT,
      E_BLOCK_OTHER,
    }
    interface FBlockSimpleInfo {
      iMarket?: number;
      sCode?: string;
      eType?: E_BLOCK_CLASS_TYPE;
      sName?: string;
    }
    interface FOpenBoardDetail {
      iZDTTime?: number;
      iZDTOpenTime?: number;
      dLowRatio?: string;
      lFirstZDTVol?: string;
      dFirstZDTRatio?: string;
      lLastZDTVol?: string;
      dLastZDTRatio?: string;
      lHighZDTVol?: string;
      dHighZDTRatio?: string;
    }
    interface FBoardPeriod {
      iStrongWeakNum?: number;
      iZDTNum?: number;
      iOneNum?: number;
    }
    interface StockZDTHisDate {
      market?: number;
      sCode?: string;
      setZtDays?: Array<number>;
      setOneZtDays?: Array<number>;
      setDtDays?: Array<number>;
      setOneDtDays?: Array<number>;
    }
    interface FZDStockInfo {
      iMarket?: number;
      sCode?: string;
      dNowPrice?: string;
      dChgRatio?: string;
      dTurnOver?: string;
      dAvgTurnOver?: string;
      iLastZDTime?: number;
      iFirstZDTime?: number;
      lLastZDTVol?: string;
      dLastZDTRatio?: string;
      dFloatValue?: string;
      iContinueBoard?: number;
      iDetailNum?: number;
      vecDetail?: Array<FOpenBoardDetail>;
      stBoard?: FBoardPeriod;
      eType?: E_STOCK_ZT_TYPE;
      iDate?: number;
      dPrevRatio?: string;
      bIsZt?: boolean;
      bUnOpenNewStock?: boolean;
      bIsST?: boolean;
      bSubNewStock?: boolean;
      strStockZTReason?: string;
      vecBlk?: Array<FBlockSimpleInfo>;
      dTotalMarketValue?: string;
      bIsDt?: boolean;
      nStockZTReasonUpdateTime?: number;
      vRelatedPlates?: Array<string>;
      dHighPrice?: string;
      dLowPrice?: string;
    }
    interface FPoolMapInfo {
      stockMap?: Record<string, FZDStockInfo>;
      lRefreshTime?: string;
    }
    interface FStockZTData {
      dZTPrice?: string;
      dDTPrice?: string;
      dTurnover?: string;
      dZdf?: string;
    }
    interface FupanZTStockLabelInfo {
      iMarket?: number;
      sCode?: string;
      iContinueBoard?: number;
      stBoard?: FBoardPeriod;
      iDate?: number;
      bIsZt?: boolean;
      bUnOpenNewStock?: boolean;
      bIsDt?: boolean;
      iFirstZDTime?: number;
      eType?: E_STOCK_ZT_TYPE;
    }
    interface FZTLabelPoolMapInfo {
      stockMap?: Record<string, FupanZTStockLabelInfo>;
      lRefreshTime?: string;
    }
    interface FupanZTLabelHisData {
      iLastDate?: number;
      mapZDtHisDate?: Record<string, StockZDTHisDate>;
      vecPreZTStock?: Array<FupanZTStockLabelInfo>;
      mapHisStockInfo?: Record<string, Record<number, FStockZTData>>;
    }
  }
}
export {};