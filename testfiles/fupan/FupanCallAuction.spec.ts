declare global {
  namespace FuPan {
    enum E_CALL_AUCTION_DATA_TYPE {
      E_CA_DATA_TYPE_TS = 0,
      E_CA_DATA_TYPE_EXTERN_DATA,
      E_CA_DATA_TYPE_UNU_ACT_RUSH,
      E_CA_DATA_TYPE_UNU_ACT_HIT,
      E_CA_DATA_TYPE_UNU_ACT_OPEN_HIGH,
      E_CA_DATA_TYPE_UNU_ACT_OPEN_LOW,
      E_CA_DATA_TYPE_UNU_ACT_ZT_TRAIL,
      E_CA_DATA_TYPE_UNU_ACT_DT_TRAIL,
      E_CA_DATA_TYPE_UNU_ACT_BUY_STRENGTH,
      E_CA_DATA_TYPE_UNU_ACT_SELL_STRENGTH,
      E_CA_DATA_TYPE_UNU_ACT_LARGE_BUY,
      E_CA_DATA_TYPE_UNU_ACT_LARGE_SELL,
      E_CA_DATA_TYPE_UNU_ACT_RAPID_RISE,
      E_CA_DATA_TYPE_UNU_ACT_RAPID_FALL,
      E_CA_UNU_ACT_TYPE_END,
    }
    enum E_CA_UNU_ACT_LEVEL {
      E_CA_UNU_ACT_LEVEL_BULLISH = 0,
      E_CA_UNU_ACT_LEVEL_PARTIAL_BULLISH,
      E_CA_UNU_ACT_LEVEL_CHAOS,
      E_CA_UNU_ACT_LEVEL_PARTIAL_BEARISH,
      E_CA_UNU_ACT_LEVEL_BEARISH,
      E_CA_UNU_ACT_LEVEL_END,
    }
    interface FCaUnuActInfo {
      iBeginTime?: number;
      iEndTime?: number;
      dBeginChgRatio?: string;
      dBeginPrice?: string;
      dEndChgRatio?: string;
      dEndPrice?: string;
      eCaLv?: E_CA_UNU_ACT_LEVEL;
      dMatchVol?: string;
      dUnMatchVol?: string;
      dCallAmount?: string;
    }
    interface FCaTsInfo {
      iTime?: number;
      dChgRatio?: string;
      dNowPrice?: string;
    }
    interface FLastCaUnuActTypeInfo {
      eCaType?: E_CALL_AUCTION_DATA_TYPE;
      stCaUnuAct?: FCaUnuActInfo;
      dOpenPrice?: string;
      dOpenChgRatio?: string;
      dOpenAmount?: string;
      dNowChgRatio?: string;
      dPreCallAmoutRatio?: string;
    }
    interface FStkLastCaUnuAct {
      stk?: StkSimpInfo;
      lastCaTypeInfo?: FLastCaUnuActTypeInfo;
    }
    interface FBlkLastCaUnuAct {
      blk?: FBlockSimpleInfo;
      lastCaTypeInfo?: FLastCaUnuActTypeInfo;
    }
    interface FLastCaUnuActLevelStk {
      iDate?: number;
      eCaLevel?: E_CA_UNU_ACT_LEVEL;
      mapStkCaUnuAct?: Record<string, FStkLastCaUnuAct>;
      mapBlkCaUnuAct?: Record<string, FBlkLastCaUnuAct>;
    }
    interface FStkCaUnuActTypeInfo {
      stk?: StkSimpInfo;
      eCaType?: E_CALL_AUCTION_DATA_TYPE;
      vecCaUnuAct?: Array<FCaUnuActInfo>;
      dOpenPrice?: string;
      dOpenChgRatio?: string;
      dOpenAmount?: string;
      dNowChgRatio?: string;
      vecBlk?: Array<FBlockSimpleInfo>;
      strCaUnuActDesc?: string;
      bIsSTStk?: boolean;
      bSubNewStock?: boolean;
      dPreCallAmoutRatio?: string;
    }
    interface FStkCaTs {
      stk?: StkSimpInfo;
      vecTs?: Array<FCaTsInfo>;
    }
    interface FBlkCaUnuActTypeInfo {
      blk?: FBlockSimpleInfo;
      vecCaUnuAct?: Array<FCaUnuActInfo>;
      dOpenPrice?: string;
      dOpenChgRatio?: string;
    }
    interface FBlkCaTs {
      blk?: FBlockSimpleInfo;
      vecTs?: Array<FCaTsInfo>;
    }
    interface FCaUnuActTypeData {
      iDate?: number;
      eCaType?: E_CALL_AUCTION_DATA_TYPE;
      mapStkUnuActInfo?: Record<string, FStkCaUnuActTypeInfo>;
      mapBlkUnuActInfo?: Record<string, FBlkCaUnuActTypeInfo>;
    }
    interface FCaTsData {
      iDate?: number;
      eCaType?: E_CALL_AUCTION_DATA_TYPE;
      mapStkCaTs?: Record<string, FStkCaTs>;
      mapBlkCaTs?: Record<string, FBlkCaTs>;
    }
    interface FMarketZdFenBu {
      iMarket?: number;
      vecZdFenBu?: Array<number>;
    }
    interface FBlockChgRatio {
      blk?: FBlockSimpleInfo;
      dNowChgRatio?: string;
      dOpenPrice?: string;
      dOpenChgRatio?: string;
    }
    interface FTimePrice {
      iTime?: number;
      dPrice?: string;
    }
    interface FIndexPrice {
      iMarket?: number;
      sCode?: string;
      vecPrice?: Array<FTimePrice>;
      dPreClose?: string;
    }
    interface FCaUnuAcTopBlkStk {
      stCaUnuActblk?: FBlkLastCaUnuAct;
      vecCaUnuActStk?: Array<FStkLastCaUnuAct>;
    }
    interface FCaUnuActHotBlockInfo {
      block?: FBlockSimpleInfo;
      dHot?: string;
      dChgRatio?: string;
    }
    interface FCaUnuActHotStockInfo {
      stk?: StkSimpInfo;
      eCaType?: E_CALL_AUCTION_DATA_TYPE;
      dCaUnuChgRatio?: string;
      iConnBoradNum?: number;
      bIsActZT?: boolean;
    }
    interface FCaUnuActHotSubect {
      blk?: FCaUnuActHotBlockInfo;
      vecHotStk?: Array<FCaUnuActHotStockInfo>;
    }
    interface FCaExternData {
      iDate?: number;
      eCaType?: E_CALL_AUCTION_DATA_TYPE;
      vecMarketZdNum?: Array<FMarketZdFenBu>;
      vecBlkRatio?: Array<FBlockChgRatio>;
      vecIdxPrice?: Array<FIndexPrice>;
      vecTopBlkStk?: Array<FCaUnuAcTopBlkStk>;
      vecTopHotSubject?: Array<FCaUnuActHotSubect>;
    }
    interface FCaUnuActData {
      iDate?: number;
      stCaTs?: FCaTsData;
      stExternData?: FCaExternData;
      vecCaUnuActData?: Array<FCaUnuActTypeData>;
    }
    interface FCaUnuActTypeVecInfo {
      eCaType?: E_CALL_AUCTION_DATA_TYPE;
      vecUnuActInfo?: Array<FCaUnuActInfo>;
    }
    interface FStkAllCaUnuAct {
      stk?: StockInfo;
      vecTs?: Array<FStkCaTs>;
      vecUnuAct?: Array<FCaUnuActTypeVecInfo>;
      dOpenPrice?: string;
      dOpenChgRatio?: string;
      dOpenAmount?: string;
      dNowChgRatio?: string;
    }
    interface FBlkAllCaUnuAct {
      blk?: FBlockSimpleInfo;
      vecTs?: Array<FBlkCaTs>;
      vecUnuAct?: Array<FCaUnuActTypeVecInfo>;
    }
    interface FBlkStkAllCaUnuAct {
      iDate?: number;
      mapStkCaUnuAct?: Record<string, FStkAllCaUnuAct>;
      mapBlkCaUnuAct?: Record<string, FBlkAllCaUnuAct>;
    }
  }
}
export {};