declare global {
  namespace FuPan {
    enum E_BLOCK_DATA_TYPE {
      E_BLOCK_BASIC_DATA = 0,
      E_BLOCK_DRAGON_HEAD,
      E_BLOCK_HIS_ZT_TRAIL,
      E_BLOCK_ZT_STATIC,
      E_BLOCK_ZT_NUM,
      E_BLOCK_ZT_NUM_TS,
      E_BLOCK_STORM_EYE,
      E_BLOCK_STORM_EYE_IDX,
      E_BLOCK_DATA_TYPE_END,
    }
    enum E_BLK_BASIC_DATA_TYPE {
      E_BLK_BASIC_DATA_TYPE_BASIC = 0,
      E_BLK_BASIC_DATA_TYPE_ZTSTK,
      E_BLK_BASIC_DATA_TYPE_UNZTSTK,
      E_BLK_BASIC_DATA_TYPE_ALLSTK,
      E_BLK_BASIC_DATA_TYPE_ALL,
    }
    enum E_BLK_STK_ZD_STATE {
      E_BLK_STK_RISE,
      E_BLK_STK_FALL,
      E_BLK_STK_STATIC,
      E_BLK_STK_ZT,
      E_BLK_STK_DT,
    }
    enum E_BLK_STK_STNEW_TYPE {
      E_BLK_STK_NORMAL,
      E_BLK_STK_NEW,
      E_BLK_STK_ST,
    }
    interface FBlockInfo {
      block?: FBlockSimpleInfo;
      dHot?: string;
      dChgRatio?: string;
    }
    interface FBlockStockInfo {
      iMarket?: number;
      sCode?: string;
      dNowPrice?: string;
      dChgRatio?: string;
      dTurnOver?: string;
      eZdState?: E_BLK_STK_ZD_STATE;
      iContinueBoard?: number;
      iDetailNum?: number;
      stBoard?: FBoardPeriod;
      eType?: E_STOCK_ZT_TYPE;
      iFirstZTime?: number;
      iLastZTime?: number;
      lLastZTVol?: string;
      dLastZTRatio?: string;
      eSTNew?: E_BLK_STK_STNEW_TYPE;
      dFloatValue?: string;
      dTotalMarketValue?: string;
      dAmount?: string;
      vecBlk?: Array<FBlockInfo>;
      dUpSpeed?: string;
      dVolume?: string;
    }
    interface FBlockBasicInfo {
      blk?: FBlockSimpleInfo;
      dChgRatio?: string;
      dDayMainMoneyInflow?: string;
      dDayMainMoneyRatio?: string;
      dAmount?: string;
      dLiangBi?: string;
      dHot?: string;
      vecZDFenBu?: Array<number>;
      vecZDFenBuFiltSTNew?: Array<number>;
    }
    interface FBlcokStkSimpData {
      blk?: FBlockSimpleInfo;
      vecStk?: Array<StockInfo>;
    }
    interface FBlockStkCompData {
      blk?: FBlockSimpleInfo;
      vecStk?: Array<FBlockStockInfo>;
    }
    interface FBlockBasicData {
      stBlkBasic?: FBlockBasicInfo;
      stZtStk?: FBlcokStkSimpData;
      stUnZtStk?: FBlcokStkSimpData;
    }
    interface FBlockDragonHead {
      iDate?: number;
      mapDragonHeadBlk?: Record<string, FBlockZTData>;
    }
    interface FBlockHisZTTrail {
      iDate?: number;
      ztTimeTrail?: Record<string, FBlockTimeTrail>;
      ztStockTrail?: Record<string, FBlockStockTrail>;
    }
    interface FBlockZTStaticData {
      iDate?: number;
      ztStatic?: Record<string, FBlockZTStatic>;
    }
    interface FBlockZTStkNumInfo {
      blk?: FBlockSimpleInfo;
      iZTNum?: number;
      iZTNumFiltSTNew?: number;
      mapDayZTNum?: Record<number, number>;
      mapDayZTNumFiltSTNew?: Record<number, number>;
    }
    interface FBlockZTStkNum {
      iDate?: number;
      mapBlkZTStkNum?: Record<string, FBlockZTStkNumInfo>;
    }
    interface FZTStkNumTsInfo {
      iTime?: number;
      iZTStkNum?: number;
      iZTStkNumFiltSTNew?: number;
    }
    interface FBlockZTStkNumTsInfo {
      stBlkBasic?: FBlockBasicData;
      stZtStkNum?: FZTStkNumTsInfo;
    }
    interface FBlockZTStkNumTs {
      iDate?: number;
      vecBlkZTStkNum?: Array<FBlockZTStkNumTsInfo>;
    }
    interface FBlockStormEyeStockInfo {
      stk?: StockInfo;
      iNatureDayZTNum?: number;
      iNatureDayLeadNum?: number;
      dDayMainMoneyInflow?: string;
      dDayMainMoneyRatio?: string;
      dLiangBi?: string;
      bIsLeadStk?: boolean;
    }
    interface FBlockStormEyeInfo {
      stBlkBasic?: FBlockBasicInfo;
      vecStk?: Array<FBlockStormEyeStockInfo>;
      bIsNew?: boolean;
      iContinueRiseDay?: number;
      iZTStkNum?: number;
      iNatureDayZTNum?: number;
      iAccZTStkNum?: number;
      iNatureDayUnuActNum?: number;
      vecZTStkNum?: Array<number>;
      vecChgRatio?: Array<string>;
      vecMainRatio?: Array<string>;
    }
    interface FBlockStormEye {
      iDate?: number;
      vecBlkCoreStorm?: Array<FBlockStormEyeInfo>;
      vecBlkCommStorm?: Array<FBlockStormEyeInfo>;
    }
    interface FBlockStormEyeExt {
      mapBlkStkLeadNum?: Record<string, Record<number, Record<string, number>>>;
      mapBlkUnuActNum?: Record<string, Record<number, boolean>>;
      mapBlkChgRatio?: Record<string, Record<number, string>>;
      mapBlkMainRatio?: Record<string, Record<number, string>>;
    }
    interface FBlockStormEyeDB {
      iDate?: number;
      stStormEye?: FBlockStormEye;
      stStormEyeExt?: FBlockStormEyeExt;
    }
    interface FBlockStormLevel {
      blk?: FBlockSimpleInfo;
      iZTStkNum?: number;
      iAccZTStkNum?: number;
    }
    interface FBlockStormNum {
      iCoreStormNum?: number;
      iCommStormNum?: number;
    }
    interface FBlockStormEyeIdx {
      iDate?: number;
      stStormNum?: FBlockStormNum;
      mapStormLv?: Record<string, FBlockStormLevel>;
    }
    interface FBlockExternData {
      iDate?: number;
      stDragonHead?: FBlockDragonHead;
      stHisZTTrail?: FBlockHisZTTrail;
      stZTStatic?: FBlockZTStaticData;
      stZTNum?: FBlockZTStkNum;
      stZTNumTs?: FBlockZTStkNumTs;
      stStormEye?: FBlockStormEye;
      stStormEyeIdx?: FBlockStormEyeIdx;
    }
    interface FBlockData {
      iDate?: number;
      mapBlkBasicData?: Record<string, FBlockBasicData>;
      mapAllZtStk?: Record<string, FBlockStockInfo>;
      mapAllUnZtStk?: Record<string, FBlockStockInfo>;
      stBlkExtData?: FBlockExternData;
    }
  }
}
export {};