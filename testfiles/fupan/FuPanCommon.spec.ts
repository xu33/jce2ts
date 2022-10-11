declare global {
  namespace FuPan {
    enum E_TREND_DATE_TYPE {
      E_TREND_CURRENT,
      E_TREND_LAST_30_DAY,
    }
    enum E_MARKET_TREND_TYPE {
      E_INDEX_TREND,
      E_MARKET_ZD_TREND,
      E_MARKET_FENBU_TREND,
      E_MARKET_ZTDT_TREND,
      E_ZT_PROFIT_TREND,
      E_CHG_PROFIT_TREND,
      E_OPEN_BOARD_TREND,
      E_CONTINUE_BOARD_TREND,
      E_HIT_BOARD_TREND,
      E_MARKET_VOL_TREND,
      E_MARKET_HOT_TREND,
      E_POSITION_RATE_TREND,
      E_MARKET_FENBU_TREND_DETAIL,
    }
    enum E_PUSH_MSG_TYPE {
      E_MSG_TYPE_NONE,
      E_MSG_TYPE_DRAGON_HEAD_SNIPER,
    }
    interface FIndexCurrent {
      dSHRatio?: string;
      dSH50Ratio?: string;
      dCYRatio?: string;
      dSZRatio?: string;
    }
    interface FIndexTrend {
      vecTime?: Array<number>;
      vecData?: Array<FIndexCurrent>;
    }
    interface FZDCurrent {
      iUpNum?: number;
      iDownNum?: number;
      dRatio?: string;
    }
    interface FZDTrend {
      vecTime?: Array<number>;
      vecData?: Array<FZDCurrent>;
    }
    interface FZDFenBuCurrent {
      iZPer5Num?: number;
      iDPer5Num?: number;
      iZTNum?: number;
      iZPer8Num?: number;
      iZPer6Num?: number;
      iZPer4Num?: number;
      iZPer2Num?: number;
      iZPer0Num?: number;
      iDPer0Num?: number;
      iDPer2Num?: number;
      iDPer4Num?: number;
      iDPer6Num?: number;
      iDPer8Num?: number;
      iDTNum?: number;
    }
    interface FZDFenBuNewCurrent {
      iZTNum?: number;
      iZPer9Num?: number;
      iZPer8Num?: number;
      iZPer7Num?: number;
      iZPer6Num?: number;
      iZPer5Num?: number;
      iZPer4Num?: number;
      iZPer3Num?: number;
      iZPer2Num?: number;
      iZPer1Num?: number;
      iZPer0Num?: number;
      iDPer0Num?: number;
      iDPer1Num?: number;
      iDPer2Num?: number;
      iDPer3Num?: number;
      iDPer4Num?: number;
      iDPer5Num?: number;
      iDPer6Num?: number;
      iDPer7Num?: number;
      iDPer8Num?: number;
      iDPer9Num?: number;
      iDTNum?: number;
      iPPNum?: number;
      iZPNum?: number;
      iZNum?: number;
      iDNum?: number;
    }
    interface FZDFenBuTrend {
      vecTime?: Array<number>;
      vecData?: Array<FZDFenBuCurrent>;
    }
    interface FZDFenBuNewTrend {
      vecTime?: Array<number>;
      mapData?: Record<number, Array<FZDFenBuNewCurrent>>;
    }
    interface FZTDTCurrent {
      iZTNum?: number;
      iNoOneBNum?: number;
      iDTNum?: number;
      iOneBoardNum?: number;
    }
    interface FZTDTTrend {
      vecTime?: Array<number>;
      vecData?: Array<FZTDTCurrent>;
    }
    interface FZTProfitCurrent {
      dOneBProfit?: string;
      dChgBProfit?: string;
      dSHProfit?: string;
      dZTProfit?: string;
    }
    interface FZTProfitTrend {
      vecTime?: Array<number>;
      vecData?: Array<FZTProfitCurrent>;
    }
    interface FChgProfitCurrent {
      dVolProfit?: string;
      dChgProfit?: string;
      dSHRatio?: string;
    }
    interface FChgProfitTrend {
      vecTime?: Array<number>;
      vecData?: Array<FChgProfitCurrent>;
    }
    interface FOpenBoardCurrent {
      iZTNum?: number;
      iOpenZTNum?: number;
    }
    interface FOpenBoardTrend {
      vecTime?: Array<number>;
      vecData?: Array<FOpenBoardCurrent>;
    }
    interface FConBoardCurrent {
      iContinueBNum?: number;
      iNoOneBNum?: number;
    }
    interface FConBoardTrend {
      vecTime?: Array<number>;
      vecData?: Array<FConBoardCurrent>;
    }
    interface FHitBoardCurrent {
      dHit?: string;
    }
    interface FHitBoardTrend {
      vecTime?: Array<number>;
      vecData?: Array<FHitBoardCurrent>;
    }
    interface FMarketVolCurrent {
      dSHAmount: string;
      dSZAmount: string;
    }
    interface FMarketVolTrend {
      vecTime: Array<number>;
      vecData: Array<FMarketVolCurrent>;
    }
    interface FMarketHotCurrent {
      dPreZTWinRate?: string;
      dZDRate?: string;
      dLBRate?: string;
      dWeight1?: string;
      dWeight2?: string;
      dWeight3?: string;
      dMarketHot?: string;
      nPreZTNum?: number;
      nCurrZNum?: number;
    }
    interface FMarketHotTrend {
      vecTime: Array<number>;
      vecData: Array<FMarketHotCurrent>;
    }
    interface FPositionRateCurrent {
      dRate?: string;
      nAttackWaveNum?: number;
      nTurnRoundWaveNum?: number;
    }
    interface FPositionRateTrend {
      vecTime: Array<number>;
      vecData: Array<FPositionRateCurrent>;
    }
    interface FMarketTrendData {
      stIndex?: FIndexTrend;
      stZD?: FZDTrend;
      stZDFenBu?: FZDFenBuTrend;
      stZTDT?: FZTDTTrend;
      stZTProfit?: FZTProfitTrend;
      stChgProfit?: FChgProfitTrend;
      stOpenBoard?: FOpenBoardTrend;
      stConBoard?: FConBoardTrend;
      stHitBoard?: FHitBoardTrend;
      stMarketVol?: FMarketVolTrend;
      stMarketHot?: FMarketHotTrend;
      stPositionRate?: FPositionRateTrend;
      iDate?: number;
      stZDFenBuNew?: FZDFenBuNewTrend;
    }
    interface FBlockStockZT {
      iMarket?: number;
      sCode?: string;
      iZTTime?: number;
      eType?: E_STOCK_ZT_TYPE;
      iConNum?: number;
      lLastZTVol?: string;
      dLastZTRatio?: string;
      iLastZTTime?: number;
      dLTValue?: string;
      iOpenNum?: number;
    }
    interface FBlockStockUnZT {
      iMarket?: number;
      sCode?: string;
      dUpSpeed?: string;
      dTurnOver?: string;
      dLTValue?: string;
      dChgRatio?: string;
    }
    interface FStockZTMap {
      stockMap?: Record<string, FBlockStockZT>;
    }
    interface FStockUnZTMap {
      stockMap?: Record<string, FBlockStockUnZT>;
    }
    interface FBlockZTData {
      sCode?: string;
      iMarket?: number;
      iUpNum?: number;
      dUpRatio?: string;
      iZTNum?: number;
      vecZTStock?: Array<FBlockStockZT>;
      vecUnZTStock?: Array<FBlockStockUnZT>;
      iTotalNum?: number;
    }
    interface FBlockTimeStock {
      iMarket?: number;
      sCode?: string;
      iTime?: number;
      eType?: E_STOCK_ZT_TYPE;
      iConNum?: number;
    }
    interface FBlockTimeData {
      iDate?: number;
      iZTNum?: number;
      vecStock?: Array<FBlockTimeStock>;
    }
    interface FBlockTimeTrail {
      iMarket?: number;
      sCode?: string;
      vecData?: Array<FBlockTimeData>;
    }
    interface FStockTrailDetail {
      iDate?: number;
      iTime?: number;
      eType?: E_STOCK_ZT_TYPE;
      iConNum?: number;
    }
    interface FBlockStockData {
      iMarket?: number;
      sCode?: string;
      iZTNum?: number;
      iLeadNum?: number;
      iMaxCon?: number;
      vecDetail?: Array<FStockTrailDetail>;
    }
    interface FBlockStockTrail {
      iMarket?: number;
      sCode?: string;
      vecData?: Array<FBlockStockData>;
    }
    interface FStockLastHis {
      iDate?: number;
      dRatio?: string;
      iZTNum?: number;
    }
    interface FBlockZTStatic {
      iMarket?: number;
      sCode?: string;
      iZTDay?: number;
      dTotalRatio?: string;
      vecData?: Array<FStockLastHis>;
    }
    enum E_FUPAN_REG_TYPE {
      E_FUPAN_STOCK_POOL,
      E_FUPAN_MARKET_TREND,
      E_FUPAN_BLOCK_DATA,
      E_FUPAN_FILTER_MARKET_TREND,
      E_FUPAN_HISFACTOR,
      E_FUPAN_BLK_STK_INFO,
      E_FUPAN_MARKET_DATA,
      E_FUPAN_NEW_BLOCK_DATA,
      E_FUPAN_CALL_AUCTION_DATA,
    }
    interface FBlockAllData {
      ztBlock?: Record<string, FBlockZTData>;
      ztTimeTrail?: Record<string, FBlockTimeTrail>;
      ztStockTrail?: Record<string, FBlockStockTrail>;
      ztStatic?: Record<string, FBlockZTStatic>;
    }
    interface FStockZTReasonInfo {
      strCode: string;
      strReasion: string;
      updateTimestamp?: number;
      vRelatedPlates?: Array<string>;
    }
    interface FStockZTReasonReq {
      iDate?: number;
      vecStock?: Array<FStockZTReasonInfo>;
    }
    interface FStockZTReasonRsp {
      bSucc?: boolean;
    }
    interface FBlkStkInfo {
      mapBlockSimpleInfo?: Record<string, FBlockSimpleInfo>;
      mapStk2BlkAll?: Record<string, Array<string>>;
      mapBlk2StkAll?: Record<string, Array<string>>;
    }
    interface FMarketCommonData {
      iDate?: number;
      iTime?: number;
      cMarketStatus?: string;
    }
    interface FDragonHeadSniperMsg {
      mapStk?: Record<string, StkSimpInfo>;
    }
    interface FPushMsg {
      eMsgType?: E_PUSH_MSG_TYPE;
      sMsg?: string;
    }
  }
}
export {};