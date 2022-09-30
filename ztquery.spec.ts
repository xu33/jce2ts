declare global {
  namespace FuPan {
    interface FStockPoolReq {
      stHeader?: HQSys.HeaderInfo;
      eStockType?: E_STOCK_POOL_TYPE;
      bGetDetail?: boolean;
      iBeg?: string;
      iWantNum?: string;
      iDate?: string;
      lRefreshTime?: string;
    }
    interface FStockPoolRsp {
      vecStock?: Array<FZDStockInfo>;
      iSize?: string;
      lTime?: string;
      iDate?: string;
    }
    interface FBatchStockPoolReq {
      vecStockPoolReq: Array<FStockPoolReq>;
    }
    interface FBatchStockPoolRsp {
      vecStockPoolRsp?: Array<FStockPoolRsp>;
    }
    interface FBoardDetailReq {
      stHeader?: HQSys.HeaderInfo;
      iMarket?: string;
      sCode?: string;
      iDate?: string;
      eType?: E_STOCK_POOL_TYPE;
    }
    interface FBoardDetailRsp {
      vecDetail?: Array<FOpenBoardDetail>;
    }
    interface FTrendDataType {
      eTrend?: E_MARKET_TREND_TYPE;
      eDate?: E_TREND_DATE_TYPE;
      iDate?: string;
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
      iWantNum?: string;
      iPos?: string;
      eDetail?: E_BLK_CURR_DATA_TYPE;
      iDate?: string;
      lBlkUpdteTime?: string;
      iMinZTNum?: string;
    }
    interface FBlkCurrentRsp {
      vecData?: Array<FBlockZTData>;
      iDate?: string;
      lBlkUpdteTime?: string;
    }
    interface FBlkCurZTReq {
      stHeader?: HQSys.HeaderInfo;
      sCode?: string;
      iWantNum?: string;
      iPos?: string;
      iDate?: string;
    }
    interface FBlkCurZTRsp {
      vecStock?: Array<FBlockStockZT>;
    }
    interface FBlkCurUnZTReq {
      stHeader?: HQSys.HeaderInfo;
      sCode?: string;
      iWantNum?: string;
      iPos?: string;
      iDate?: string;
    }
    interface FBlkCurUnZTRsp {
      vecStock?: Array<FBlockStockUnZT>;
    }
    interface FStockUnique {
      iMarket?: string;
      sCode?: string;
    }
    interface FBlkLastHisReq {
      stHeader?: HQSys.HeaderInfo;
      vecStock?: Array<FStockUnique>;
      iDayNum?: string;
      iDate?: string;
    }
    interface FStockLastHisData {
      iMarket?: string;
      sCode?: string;
      hisData?: Array<FStockLastHis>;
    }
    interface FBlkLastHisRsp {
      vecData?: Array<FStockLastHisData>;
    }
    interface FBlkTimeHisReq {
      stHeader?: HQSys.HeaderInfo;
      sCode?: string;
      iWantNum?: string;
      iPos?: string;
      iStockNum?: string;
    }
    interface FBlkTimeHisRsp {
      stData?: FBlockTimeTrail;
    }
    interface FBlkStockHisReq {
      stHeader?: HQSys.HeaderInfo;
      sCode?: string;
      iWantNum?: string;
      iPos?: string;
    }
    interface FBlkStockHisRsp {
      stData?: FBlockStockTrail;
    }
    interface FBlkHisTurnReq {
      stHeader?: HQSys.HeaderInfo;
      iWantNum?: string;
    }
    interface FBlkHisTurnRsp {
      vecData?: Array<FBlockZTStatic>;
    }
    interface FLeadBlkReq {
      stHeader?: HQSys.HeaderInfo;
      iDate?: string;
      iBlockType?: string;
    }
    interface FLeadBlkRsp {
      vecData?: Array<IC.SLeadBlkInfo>;
    }
    interface FBlkChangesReq {
      stHeader?: HQSys.HeaderInfo;
      iDate?: string;
      eType?: IC.BLOCKCHANGE_TYPE;
      iBlkLeadStockNum?: string;
      iWantNum?: string;
      iPos?: string;
      iBlockType?: string;
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
      nStartDate?: string;
      nEndDate?: string;
      nDayNum?: string;
    }
    interface FHisFactorRsp {
      eHisFactorType?: E_HIS_FACTOR_TYPE;
      nStartDate?: string;
      nEndDate?: string;
      nDayNum?: string;
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
      iMarket?: string;
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
      iCount?: string;
      lRefreshTime?: string;
    }
    interface FSimpleZTStockInfo {
      iMarket?: string;
      sCode?: string;
      iContinueBoard?: string;
      stBoard?: FBoardPeriod;
      eType?: E_STOCK_ZT_TYPE;
      iLastZTime?: string;
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
      iCount?: string;
      lRefreshTime?: string;
    }
    interface FZTModelBlkInfo {
      blk?: StockInfo;
      vecStock?: Array<FSimpleZTStockInfo>;
      iHot?: string;
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
      iNDaysUnuActTime?: string;
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
      iDragonHeadIdx?: string;
    }
    interface FHotPointBlkRspInfo {
      blk?: StockInfo;
      vecStk?: Array<FHotPointBlkStockInfo>;
      iHot?: string;
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
      iLastZTTimeRank?: string;
    }
    interface FUltraShtLastZtStkRsp {
      vecStk?: Array<FUltraShtLastZtStkRspInfo>;
      lRefreshTime?: string;
    }
    interface FBlkBasicDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecBlk?: Array<StockInfo>;
      eBasicDataType?: E_BLK_BASIC_DATA_TYPE;
      iEndDate?: string;
      iPreDayNum?: string;
      iCmd?: string;
    }
    interface FDateBlkBasicData {
      iDate?: string;
      vecData?: Array<FBlockBasicData>;
    }
    interface FBlkBasicDataRsp {
      eBasicDataType?: E_BLK_BASIC_DATA_TYPE;
      vecDateData?: Array<FDateBlkBasicData>;
    }
    interface FBlkStkDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecBlk?: Array<StockInfo>;
      iStkType?: string;
      iEndDate?: string;
      iPreDayNum?: string;
    }
    interface FDateBlkStkData {
      iDate?: string;
      vecBlkStk?: Array<FBlockStkCompData>;
    }
    interface FBlkStkDataRsp {
      iStkType?: string;
      vecDateBlkStk?: Array<FDateBlkStkData>;
    }
    interface FBatchStkDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecStk?: Array<StockInfo>;
      iDate?: string;
    }
    interface FBatchStkDataRsp {
      iDate?: string;
      vecStk?: Array<FBlockStockInfo>;
    }
    interface FBlkExtDataReq {
      stHeader?: HQSys.HeaderInfo;
      eBlkDataType?: E_BLOCK_DATA_TYPE;
      iStartDate?: string;
      iEndDate?: string;
      iPreDayNum?: string;
      iSubCmd?: string;
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
      iStartDate?: string;
      iEndDate?: string;
      vecBlk?: Array<StockInfo>;
    }
    interface FStromEyeNumIdx {
      iDate?: string;
      stStormNum?: FBlockStormNum;
    }
    interface FStormEyeLv {
      iDate?: string;
      iZTStkNum?: string;
      iAccZTStkNum?: string;
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
      iStartDate?: string;
      iEndDate?: string;
      iPreDayNum?: string;
    }
    interface FNumOfCaUnuActTypeStkReq {
      stHeader?: HQSys.HeaderInfo;
      vecType?: Array<E_CALL_AUCTION_DATA_TYPE>;
      iStartDate?: string;
      iEndDate?: string;
      iPreDayNum?: string;
      bWantAll?: boolean;
    }
    interface FCaUnuActTypeDataReq {
      stHeader?: HQSys.HeaderInfo;
      eType?: E_CALL_AUCTION_DATA_TYPE;
      iStartDate?: string;
      iEndDate?: string;
      iPreDayNum?: string;
      iSubCmd?: string;
    }
    interface FCaUnuActTypeDataRsq {
      eType?: E_CALL_AUCTION_DATA_TYPE;
      vecCaUnuAct?: Array<FCaUnuActData>;
    }
    interface FCaUnuActLevelStkReq {
      stHeader?: HQSys.HeaderInfo;
      eLevel?: E_CA_UNU_ACT_LEVEL;
      iStartDate?: string;
      iEndDate?: string;
      iPreDayNum?: string;
    }
    interface FDateCaUnuActLevelStk {
      iDate?: string;
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
      mapNumOfStk?: Record<E_CALL_AUCTION_DATA_TYPE, string>;
      iNumOfAllStk?: string;
    }
    interface FZDPanKouInfoReq {
      stHeader?: HQSys.HeaderInfo;
      vecStk?: Array<StockInfo>;
    }
    interface FZDPanKouInfo {
      iMarket?: string;
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
      iDate?: string;
    }
    interface FUnitedPoolStock {
      eType?: E_UNITED_STK_POOL_TYPE;
      vecStk?: Array<StockInfo>;
    }
    interface FBatchUnitedStockPoolRsq {
      vecStkPool?: Array<FUnitedPoolStock>;
      lRefreshTime?: string;
      iDate?: string;
    }
    interface FZTTagReq {
      stHeader?: HQSys.HeaderInfo;
      vecTagType?: Array<E_ZT_TAG_TYPE>;
      eDataType?: E_TAG_DATA_TYPE;
      nStartDate?: string;
      nEndDate?: string;
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
  }
}
export {};