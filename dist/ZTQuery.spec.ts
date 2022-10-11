declare global {
  namespace FuPan {
    interface FStockPoolReq {
      stHeader?: HQSys.HeaderInfo;
      eStockType?: E_STOCK_POOL_TYPE;
      bGetDetail?: boolean;
      iBeg?: number;
      iWantNum?: number;
      iDate?: number;
      lRefreshTime?: string;
    }
    interface FStockPoolRsp {
      vecStock?: Array<FZDStockInfo>;
      iSize?: number;
      lTime?: string;
      iDate?: number;
    }
    interface FBatchStockPoolReq {
      vecStockPoolReq: Array<FStockPoolReq>;
    }
    interface FBatchStockPoolRsp {
      vecStockPoolRsp?: Array<FStockPoolRsp>;
    }
    interface FBoardDetailReq {
      stHeader?: HQSys.HeaderInfo;
      iMarket?: number;
      sCode?: string;
      iDate?: number;
      eType?: E_STOCK_POOL_TYPE;
    }
    interface FBoardDetailRsp {
      vecDetail?: Array<FOpenBoardDetail>;
    }
    interface FTrendDataType {
      eTrend?: E_MARKET_TREND_TYPE;
      eDate?: E_TREND_DATE_TYPE;
      iDate?: number;
      eFilterType?: E_STOCK_FILTER_TYPE;
    }
    interface FMarketTrendReq {
      stHeader?: HQSys.HeaderInfo;
      vecType?: Array<FTrendDataType>;
    }
    interface FMarketTrendRsp {
      stData?: FMarketTrendData;
    }
    interface FMarketTrendVecRsp {
      vecData?: Array<FMarketTrendData>;
    }
    enum E_BLK_CURR_DATA_TYPE {
      E_BLK_CURR_NO_STOCK,
      E_BLK_CURR_ZT_STOCK,
      E_BLK_CURR_UNZT_STOCK,
    }
    interface FBlkCurrentReq {
      stHeader?: HQSys.HeaderInfo;
      iWantNum?: number;
      iPos?: number;
      eDetail?: E_BLK_CURR_DATA_TYPE;
      iDate?: number;
      lBlkUpdteTime?: string;
      iMinZTNum?: number;
    }
    interface FBlkCurrentRsp {
      vecData?: Array<FBlockZTData>;
      iDate?: number;
      lBlkUpdteTime?: string;
    }
    interface FBlkCurZTReq {
      stHeader?: HQSys.HeaderInfo;
      sCode?: string;
      iWantNum?: number;
      iPos?: number;
      iDate?: number;
    }
    interface FBlkCurZTRsp {
      vecStock?: Array<FBlockStockZT>;
    }
    interface FBlkCurUnZTReq {
      stHeader?: HQSys.HeaderInfo;
      sCode?: string;
      iWantNum?: number;
      iPos?: number;
      iDate?: number;
    }
    interface FBlkCurUnZTRsp {
      vecStock?: Array<FBlockStockUnZT>;
    }
    interface FStockUnique {
      iMarket?: number;
      sCode?: string;
    }
    interface FBlkLastHisReq {
      stHeader?: HQSys.HeaderInfo;
      vecStock?: Array<FStockUnique>;
      iDayNum?: number;
      iDate?: number;
    }
    interface FStockLastHisData {
      iMarket?: number;
      sCode?: string;
      hisData?: Array<FStockLastHis>;
    }
    interface FBlkLastHisRsp {
      vecData?: Array<FStockLastHisData>;
    }
    interface FBlkTimeHisReq {
      stHeader?: HQSys.HeaderInfo;
      sCode?: string;
      iWantNum?: number;
      iPos?: number;
      iStockNum?: number;
    }
    interface FBlkTimeHisRsp {
      stData?: FBlockTimeTrail;
    }
    interface FBlkStockHisReq {
      stHeader?: HQSys.HeaderInfo;
      sCode?: string;
      iWantNum?: number;
      iPos?: number;
    }
    interface FBlkStockHisRsp {
      stData?: FBlockStockTrail;
    }
    interface FBlkHisTurnReq {
      stHeader?: HQSys.HeaderInfo;
      iWantNum?: number;
    }
    interface FBlkHisTurnRsp {
      vecData?: Array<FBlockZTStatic>;
    }
    interface FLeadBlkReq {
      stHeader?: HQSys.HeaderInfo;
      iDate?: number;
      iBlockType?: number;
    }
    interface FLeadBlkRsp {
      vecData?: Array<IC.SLeadBlkInfo>;
    }
    interface FBlkChangesReq {
      stHeader?: HQSys.HeaderInfo;
      iDate?: number;
      eType?: IC.BLOCKCHANGE_TYPE;
      iBlkLeadStockNum?: number;
      iWantNum?: number;
      iPos?: number;
      iBlockType?: number;
    }
    interface FBlkChangesRsp {
      vecData?: Array<IC.SBlockChange>;
    }
    interface FStockPoolFBoardPeriodReq {
      stHeader?: HQSys.HeaderInfo;
      vecStock?: Array<FStockUnique>;
    }
    interface FStockPoolFBoardPeriodInfo {
      stock?: FStockUnique;
      stBoard?: FBoardPeriod;
    }
    interface FStockPoolFBoardPeriodRsp {
      vecStBoardPeriodData?: Array<FStockPoolFBoardPeriodInfo>;
    }
    interface FHisFactorReq {
      stHeader?: HQSys.HeaderInfo;
      eHisFactorType?: E_HIS_FACTOR_TYPE;
      nStartDate?: number;
      nEndDate?: number;
      nDayNum?: number;
    }
    interface FHisFactorRsp {
      eHisFactorType?: E_HIS_FACTOR_TYPE;
      nStartDate?: number;
      nEndDate?: number;
      nDayNum?: number;
      vecHisFactorData?: Array<FHisFactorData>;
    }
    interface FSubDragonHeadBlkInfo {
      blk?: StockInfo;
    }
    interface FBatchSubDragonHeadStockReq {
      stHeader?: HQSys.HeaderInfo;
      vecSubject?: Array<FSubDragonHeadBlkInfo>;
      lRefreshTime?: string;
    }
    interface FSimpleStockInfo {
      iMarket?: number;
      sCode?: string;
    }
    interface FSubDragonHeadBlkRspInfo {
      blk?: StockInfo;
      vecStk?: Array<FSimpleStockInfo>;
    }
    interface FSubDragonHeadStockRsp {
      vecSubject?: Array<FSubDragonHeadBlkRspInfo>;
      lRefreshTime?: string;
    }
    interface FZTTrendStockReq {
      stHeader?: HQSys.HeaderInfo;
      iCount?: number;
      lRefreshTime?: string;
    }
    interface FSimpleZTStockInfo {
      iMarket?: number;
      sCode?: string;
      iContinueBoard?: number;
      stBoard?: FBoardPeriod;
      eType?: E_STOCK_ZT_TYPE;
      iLastZTime?: number;
      vecHotBlk?: Array<FHotBlockInfo>;
      dChgRatio?: string;
      bUnOpenNewStock?: boolean;
    }
    interface FZTTrendStockRsp {
      vecStock?: Array<FSimpleZTStockInfo>;
      lRefreshTime?: string;
    }
    interface FZTModelStockReq {
      stHeader?: HQSys.HeaderInfo;
      iCount?: number;
      lRefreshTime?: string;
    }
    interface FZTModelBlkInfo {
      blk?: StockInfo;
      vecStock?: Array<FSimpleZTStockInfo>;
      iHot?: number;
    }
    interface FZTModelInfo {
      stkInfo?: FSimpleZTStockInfo;
      modelInfo?: FZTModelBlkInfo;
    }
    interface FZTModelStockRsp {
      vecModelInfo?: Array<FZTModelInfo>;
      lRefreshTime?: string;
    }
    interface FSubNewStockReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string;
    }
    interface FSubNewStockInfo {
      stkInfo?: FMDaySubNewStockInfo;
      vecBlk?: Array<FBlockSimpleInfo>;
    }
    interface FSubNewStockRsp {
      vecStk?: Array<FSubNewStockInfo>;
      lRefreshTime?: string;
    }
    interface FBlkUnuActReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string;
    }
    interface FBlkUnuActDetailInfo {
      blkUnuAct?: FBlkUnuActInfo;
      iNDaysUnuActTime?: number;
    }
    interface FBlkUnuActRsp {
      vecBlkUnuActDetail?: Array<FBlkUnuActDetailInfo>;
      lRefreshTime?: string;
    }
    interface FBlkUnuActFlagReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string;
    }
    interface FBlkUnuActFlagRsp {
      vecBlkUnuActTag?: Array<FBlkUnuActTagInfo>;
      lRefreshTime?: string;
    }
    interface FHotPointBlkStkReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string;
    }
    interface FHotPointBlkStockInfo {
      stkInfo?: FSimpleZTStockInfo;
      iDragonHeadIdx?: number;
    }
    interface FHotPointBlkRspInfo {
      blk?: StockInfo;
      vecStk?: Array<FHotPointBlkStockInfo>;
      iHot?: number;
    }
    interface FHotPointBlkStkRsp {
      vecHotPointBlkStk?: Array<FHotPointBlkRspInfo>;
      lRefreshTime?: string;
    }
    interface FUltraShortTermStkReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string;
    }
    interface FUltraShortTermStkRsp {
      stUltraStkPool?: FUltraShorttermStkPool;
      lRefreshTime?: string;
    }
    interface FCatchBullStkReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string;
    }
    interface FCatchBullStkRsp {
      vecZtStk?: Array<FSimpleZTStockInfo>;
      vecFbStk?: Array<FSimpleZTStockInfo>;
      vecSnStk?: Array<FSimpleZTStockInfo>;
      lRefreshTime?: string;
    }
    interface FUltraShtLastZtStkReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string;
    }
    interface FUltraShtLastZtStkRspInfo {
      stkInfo?: FSimpleZTStockInfo;
      eOriPool?: E_UNITED_STK_POOL_TYPE;
      iLastZTTimeRank?: number;
    }
    interface FUltraShtLastZtStkRsp {
      vecStk?: Array<FUltraShtLastZtStkRspInfo>;
      lRefreshTime?: string;
    }
    interface FBlkBasicDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecBlk?: Array<StockInfo>;
      eBasicDataType?: E_BLK_BASIC_DATA_TYPE;
      iEndDate?: number;
      iPreDayNum?: number;
      iCmd?: number;
    }
    interface FDateBlkBasicData {
      iDate?: number;
      vecData?: Array<FBlockBasicData>;
    }
    interface FBlkBasicDataRsp {
      eBasicDataType?: E_BLK_BASIC_DATA_TYPE;
      vecDateData?: Array<FDateBlkBasicData>;
    }
    interface FBlkStkDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecBlk?: Array<StockInfo>;
      iStkType?: number;
      iEndDate?: number;
      iPreDayNum?: number;
    }
    interface FDateBlkStkData {
      iDate?: number;
      vecBlkStk?: Array<FBlockStkCompData>;
    }
    interface FBlkStkDataRsp {
      iStkType?: number;
      vecDateBlkStk?: Array<FDateBlkStkData>;
    }
    interface FBatchStkDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecStk?: Array<StockInfo>;
      iDate?: number;
    }
    interface FBatchStkDataRsp {
      iDate?: number;
      vecStk?: Array<FBlockStockInfo>;
    }
    interface FBlkExtDataReq {
      stHeader?: HQSys.HeaderInfo;
      eBlkDataType?: E_BLOCK_DATA_TYPE;
      iStartDate?: number;
      iEndDate?: number;
      iPreDayNum?: number;
      iSubCmd?: number;
    }
    interface FBlkExtDataRsp {
      eBlkDataType?: E_BLOCK_DATA_TYPE;
      vecExtData?: Array<FBlockExternData>;
    }
    enum STORM_EYE_IDX_TYPE {
      STORM_EYE_IDX_TYPE_NUM,
      STORM_EYE_IDX_TYPE_LEVEL,
    }
    interface FBlkStormEyeIdxReq {
      stHeader?: HQSys.HeaderInfo;
      eIdxType?: STORM_EYE_IDX_TYPE;
      iStartDate?: number;
      iEndDate?: number;
      vecBlk?: Array<StockInfo>;
    }
    interface FStromEyeNumIdx {
      iDate?: number;
      stStormNum?: FBlockStormNum;
    }
    interface FStormEyeLv {
      iDate?: number;
      iZTStkNum?: number;
      iAccZTStkNum?: number;
    }
    interface FBlkStormEyeLvIdx {
      blk?: FBlockSimpleInfo;
      vecLv?: Array<FStormEyeLv>;
    }
    interface FBlkStormEyeIdxRsp {
      vecStormNum?: Array<FStromEyeNumIdx>;
      vecStormLv?: Array<FBlkStormEyeLvIdx>;
    }
    interface FBatchStkCaUnuActReq {
      stHeader?: HQSys.HeaderInfo;
      vecStk?: Array<StockInfo>;
    }
    interface FBatchStkCaUnuActRsp {
      vecStkCaUnuAct?: Array<FStkAllCaUnuAct>;
    }
    interface FMultiCaUnuActTypeDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecType?: Array<E_CALL_AUCTION_DATA_TYPE>;
      iStartDate?: number;
      iEndDate?: number;
      iPreDayNum?: number;
    }
    interface FNumOfCaUnuActTypeStkReq {
      stHeader?: HQSys.HeaderInfo;
      vecType?: Array<E_CALL_AUCTION_DATA_TYPE>;
      iStartDate?: number;
      iEndDate?: number;
      iPreDayNum?: number;
      bWantAll?: boolean;
    }
    interface FCaUnuActTypeDataReq {
      stHeader?: HQSys.HeaderInfo;
      eType?: E_CALL_AUCTION_DATA_TYPE;
      iStartDate?: number;
      iEndDate?: number;
      iPreDayNum?: number;
      iSubCmd?: number;
    }
    interface FCaUnuActTypeDataRsq {
      eType?: E_CALL_AUCTION_DATA_TYPE;
      vecCaUnuAct?: Array<FCaUnuActData>;
    }
    interface FCaUnuActLevelStkReq {
      stHeader?: HQSys.HeaderInfo;
      eLevel?: E_CA_UNU_ACT_LEVEL;
      iStartDate?: number;
      iEndDate?: number;
      iPreDayNum?: number;
    }
    interface FDateCaUnuActLevelStk {
      iDate?: number;
      vecCaUnuActStk?: Array<FStkLastCaUnuAct>;
    }
    interface FCaUnuActLevelStkRsp {
      eLevel?: E_CA_UNU_ACT_LEVEL;
      vecCaLevel?: Array<FDateCaUnuActLevelStk>;
    }
    interface FAllCallAuctionDataRsp {
      vecAllCaUnuAct?: Array<FCaUnuActTypeData>;
    }
    interface FNumOfCallAuctionStkRsp {
      mapNumOfStk?: Map<E_CALL_AUCTION_DATA_TYPE, number>;
      iNumOfAllStk?: number;
    }
    interface FZDPanKouInfoReq {
      stHeader?: HQSys.HeaderInfo;
      vecStk?: Array<StockInfo>;
    }
    interface FZDPanKouInfo {
      iMarket?: number;
      strCode?: string;
      strStockZTReason?: string;
      dCurFDAmount?: string;
      dFDRatio?: string;
      dHighFDAmout?: string;
      dZTTradeAmout?: string;
    }
    interface FZDPanKouInfoRsq {
      vecFZDPanKouInfo?: Array<FZDPanKouInfo>;
    }
    interface FBatchUnitedStockPoolReq {
      stHeader?: HQSys.HeaderInfo;
      vecType?: Array<E_UNITED_STK_POOL_TYPE>;
      lRefreshTime?: string;
      iDate?: number;
    }
    interface FUnitedPoolStock {
      eType?: E_UNITED_STK_POOL_TYPE;
      vecStk?: Array<StockInfo>;
    }
    interface FBatchUnitedStockPoolRsq {
      vecStkPool?: Array<FUnitedPoolStock>;
      lRefreshTime?: string;
      iDate?: number;
    }
    interface FZTTagReq {
      stHeader?: HQSys.HeaderInfo;
      vecTagType?: Array<E_ZT_TAG_TYPE>;
      eDataType?: E_TAG_DATA_TYPE;
      nStartDate?: number;
      nEndDate?: number;
    }
    interface FZTTagRsp {
      vecTagData?: Array<FStockZTTag>;
    }
    interface FZTAllTagTypeReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string;
      eTagType?: E_TAG_DATA_TYPE;
    }
    interface FTagTypeInfo {
      eType?: E_ZT_TAG_TYPE;
      strTypeName?: string;
    }
    interface FZTAllTagTypeRsp {
      vecType?: Array<FTagTypeInfo>;
      lRefreshTime?: string;
    }
    interface ZTQuery {
      getAllTagType: (stReq: FZTAllTagTypeReq) => FZTAllTagTypeRsp;
      getTagTypeData: (stReq: FZTTagReq) => FZTTagRsp;
      batchUnitedStockPool: (stReq: FBatchUnitedStockPoolReq) => FBatchUnitedStockPoolRsq;
      getZTPanKouInfo: (stReq: FZDPanKouInfoReq) => FZDPanKouInfoRsq;
      getNumOfCallAuctionStk: (stReq: FNumOfCaUnuActTypeStkReq) => FNumOfCallAuctionStkRsp;
      getAllCallAuctionData: (stReq: FMultiCaUnuActTypeDataReq) => FCaUnuActTypeDataRsq;
      getCaUnuActLevelStk: (stReq: FCaUnuActLevelStkReq) => FCaUnuActLevelStkRsp;
      getCaUnuActTypeData: (stReq: FCaUnuActTypeDataReq) => FCaUnuActTypeDataRsq;
      batchStkCaUnuAct: (stReq: FBatchStkCaUnuActReq) => FBatchStkCaUnuActRsp;
      batchBlkStormEyeIdx: (stReq: FBlkStormEyeIdxReq) => FBlkStormEyeIdxRsp;
      getBlockExternData: (stReq: FBlkExtDataReq) => FBlkExtDataRsp;
      batchStockData: (stReq: FBatchStkDataReq) => FBatchStkDataRsp;
      getBlockStockData: (stReq: FBlkStkDataReq) => FBlkStkDataRsp;
      getBlockBasicData: (stReq: FBlkBasicDataReq) => FBlkBasicDataRsp;
      getUltraShortLastZTStock: (stReq: FUltraShtLastZtStkReq) => FUltraShtLastZtStkRsp;
      getCatchBullStock: (stReq: FCatchBullStkReq) => FCatchBullStkRsp;
      getUltraShortTermStock: (stReq: FUltraShortTermStkReq) => FUltraShortTermStkRsp;
      getHotPointBlkStock: (stReq: FHotPointBlkStkReq) => FHotPointBlkStkRsp;
      getBlkUnusualActionTag: (stReq: FBlkUnuActFlagReq) => FBlkUnuActFlagRsp;
      getBlkUnusualAction: (stReq: FBlkUnuActReq) => FBlkUnuActRsp;
      getSubNewStock: (stReq: FSubNewStockReq) => FSubNewStockRsp;
      getZTModelStock: (stReq: FZTModelStockReq) => FZTModelStockRsp;
      getZTTrendStock: (stReq: FZTTrendStockReq) => FZTTrendStockRsp;
      batchSubDragonHeadStock: (stReq: FBatchSubDragonHeadStockReq) => FSubDragonHeadStockRsp;
      getBlkChanges: (stReq: FBlkChangesReq) => FBlkChangesRsp;
      getLeadBlkByDate: (stReq: FLeadBlkReq) => FLeadBlkRsp;
      pushLeadBlkInfo: (sPushLeadBlkInfo: IC.SPushLeadBlkInfo) => void;
      pushBlockChangeDataNew: (sPushBlockChangeDataNew: IC.SPushBlockChangeDataNew) => void;
      pushNewTradeDate: (iNewDate: number) => void;
      blkHisTurn: (stReq: FBlkHisTurnReq) => FBlkHisTurnRsp;
      blkStockHis: (stReq: FBlkStockHisReq) => FBlkStockHisRsp;
      blkTimeHis: (stReq: FBlkTimeHisReq) => FBlkTimeHisRsp;
      blkLastHis: (stReq: FBlkLastHisReq) => FBlkLastHisRsp;
      blkCurUnZT: (stReq: FBlkCurUnZTReq) => FBlkCurUnZTRsp;
      blkCurZT: (stReq: FBlkCurZTReq) => FBlkCurZTRsp;
      blkCurrent: (stReq: FBlkCurrentReq) => FBlkCurrentRsp;
      marketTrendVec: (stReq: FMarketTrendReq) => FMarketTrendVecRsp;
      marketTrend: (stReq: FMarketTrendReq) => FMarketTrendRsp;
      boardDetail: (stReq: FBoardDetailReq) => FBoardDetailRsp;
      batchStockPool: (stReq: FBatchStockPoolReq) => FBatchStockPoolRsp;
      stockPool: (stReq: FStockPoolReq) => FStockPoolRsp;
      getStockPoolFBoardPeriod: (stReq: FStockPoolFBoardPeriodReq) => FStockPoolFBoardPeriodRsp;
      getHisFactorData: (stReq: FHisFactorReq) => FHisFactorRsp;
    }
  }
}
export {};