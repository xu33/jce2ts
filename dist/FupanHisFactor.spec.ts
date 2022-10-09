declare global {
  namespace FuPan {
    enum E_HIS_FACTOR_TYPE {
      E_HIS_FACTOR_MAKE_MONEY_EFFECT = 0,
      E_HIS_FACTOR_PREDICT_TOP_BOTTOM = 1,
      E_HIS_FACTOR_TREND_STRENGTH = 2,
      E_HIS_FACTOR_HOT_SUBJECT = 3,
      E_HIS_FACTOR_SUBNEW_STOCK = 4,
      E_HIS_FACTOR_RECOMMEND_STOCKPOOL = 5,
      E_HIS_FACTOR_ATTACK_WAVE = 6,
      E_HIS_FACTOR_MARKET_COPYWRITER = 7,
      E_HIS_FACTOR_STK_NATURE_ZTNUM = 8,
      E_HIS_FACTOR_BLK_UNUSUAL_ACTION = 9,
      E_HIS_FACTOR_BLK_UNUSUAL_ACTION_TAG = 10,
      E_HIS_FACTOR_TWICE_ZT_STK = 11,
      E_HIS_FACTOR_ZD_STK_STATISTIC = 12,
      E_HIS_FACTOR_DRAGON_GENE_STK = 13,
      E_HIS_FACTOR_TWICE_ZT_STK_TS = 14,
      E_HIS_FACTOR_ULTRA_SHORTTERM_STOCKPOOL = 15,
      E_HIS_FACTOR_DAROU_DAMIAN_STK = 16,
      E_HIS_FACTOR_DAROU_DAMIAN_STK_TS = 17,
      E_HIS_FACTOR_MOOD_LEVEL = 18,
      E_HIS_FACTOR_MOOD_LEVEL_TS = 19,
      E_HIS_FACTOR_DATA_ANALYSE = 20,
      E_HIS_FACTOR_DRAGON_HEAD_STK = 21,
      E_HIS_FACTOR_LB_PREDICT_POOL = 22,
      E_HIS_FACTOR_HOT_SUBJECT_TS = 23,
      E_HIS_FACTOR_HOT_SUBJECT_DL = 24,
      E_HIS_FACTOR_ZT_TAG = 25,
      E_HIS_FACTOR_END,
    }
    enum E_HIS_FACTOR_DATA_TYPE {
      E_HIS_FACTOR_DATA_STR = 0,
      E_HIS_FACTOR_DATA_BIN,
    }
    enum E_NTRADE_DATE_ZT_TYPE {
      E_NTRADE_DATE_ZT_NONE = 0,
      E_NTRADE_DATE_ZT_ONCE,
      E_NTRADE_DATE_ZT_TWICE_CONTINUE,
      E_NTRADE_DATE_ZT_TWICE_INCONTINUITY,
      E_NTRADE_DATE_ZT_TWICE_ALL,
    }
    enum E_UNITED_STK_POOL_TYPE {
      E_UNI_ZT_POOL = 0,
      E_UNI_ZT_OPEN_POOL,
      E_UNI_DT_POOL,
      E_UNI_DT_OPEN_POOL,
      E_UNI_STRONG_POOL,
      E_UNI_COMP_POOL,
      E_UNI_LASTZT_POOL,
      E_UNI_FANBAO_ZT_POOL,
      E_UNI_HIT_BOARD_POOL,
      E_UNI_BARGAIN_BOARD_POOL,
      E_UNI_ULTRA_SHTTERM_POOL,
      E_UNI_RECENT_SUBNEW_POOL,
      E_UNI_ZT_FIRST_BOARD_POOL,
      E_UNI_DAROU_POOL,
      E_UNI_DAMIAN_POOL,
      E_UNI_CONTINUE_BOARD_POOL,
      E_TYPE_POOL_END,
    }
    enum E_MARKET_TERM_TYPE {
      E_MARKET_TERM_RISING = 0,
      E_MARKET_TERM_DIFF_RISE,
      E_MARKET_TERM_DIFF_FALL,
      E_MARKET_TERM_FALLING,
      E_MARKET_TERM_END,
    }
    enum E_ZT_TAG_TYPE {
      E_ZT_TAG_ALL,
      E_ZT_TAG_ONE_BOARD,
      E_ZT_TAG_NUCLEAR_BUTTON,
      E_ZT_TAG_SEC_BOARD,
      E_ZT_TAG_CALL_AUCTION_RUSH,
      E_ZT_TAG_LAN_BOARD,
      E_ZT_TAG_OLD_DRAGON_RALLY,
      E_ZT_TAG_OPEN_BOARD_ZT,
      E_ZT_TAG_FAN_BAO_ZT,
      E_ZT_TAG_HIGH_HUNDRED,
      E_ZT_TAG_DAMIAN,
      E_ZT_TAG_DALONGLEG,
      E_ZT_TAG_VOL_UP,
      E_ZT_TAG_VOL_DOWN,
      E_ZT_TAG_SMALL_STOCK,
      E_ZT_TAG_WEIGHTED_UP,
      E_ZT_TAG_WEIGHTED_DOWN,
      E_ZT_TAG_UNKNOW,
      E_ZT_TAG_END,
    }
    interface FMakeMoneyIndexInfo {
      dIncrease?: string;
    }
    interface FMakeMoneyEffect {
      nDate?: number;
      SHInfo?: FMakeMoneyIndexInfo;
      SZInfo?: FMakeMoneyIndexInfo;
      SHSZInfo?: FMakeMoneyIndexInfo;
    }
    interface FTrendStrengthIndexInfo {
      dShortTerm?: string;
      dWaveBand?: string;
      dMidTerm?: string;
    }
    interface FTrendStrength {
      nDate?: number;
      SHInfo?: FTrendStrengthIndexInfo;
      SZInfo?: FTrendStrengthIndexInfo;
      SHSZInfo?: FTrendStrengthIndexInfo;
    }
    interface FHotBlockInfo {
      block?: FBlockSimpleInfo;
      dHot?: string;
      iHot?: number;
    }
    interface FHotStockInfo {
      stock?: StockInfo;
      dHot?: string;
    }
    interface FHotSubject {
      vecBlk?: Array<FHotBlockInfo>;
      vecStock?: Array<FHotStockInfo>;
      nDate?: number;
    }
    interface FHotBlockInfoDwsjTs {
      block?: FBlockSimpleInfo;
      dHot?: string;
      iHot?: number;
      nLocationTime?: number;
      dZDRatio?: string;
      dMainMoneyInflow?: string;
      nTop30Index?: number;
      nZTNum?: number;
      iTime?: number;
    }
    interface FHotBlockInfoTop30Ts {
      block?: FBlockSimpleInfo;
      dHot?: string;
      iHot?: number;
      nFirstTop30Time?: number;
      iTime?: number;
    }
    interface FHotSubjectTs {
      vecTop30Blk?: Array<FHotBlockInfoTop30Ts>;
      vecBlkWithDWSJ?: Array<FHotBlockInfoDwsjTs>;
      nDate?: number;
    }
    interface FMDaySubNewStockInfo {
      stock?: StockInfo;
      bUnOpenNewStock?: boolean;
      bIsST?: boolean;
      nMaxConBoard?: number;
      dNowPrice?: string;
      dIncrease?: string;
      dTurnOver?: string;
      dAttackWave?: string;
      dTurnOverWave?: string;
      dOpenChgRatio?: string;
    }
    interface FMDaySubNewStock {
      nDate?: number;
      vecStock?: Array<FMDaySubNewStockInfo>;
    }
    interface FRecommendStockInfo {
      stock?: StockInfo;
      iContinueBoard?: number;
      iMaxZF?: string;
    }
    interface FRecommendStockPool {
      nDate?: number;
      vecStock1?: Array<FRecommendStockInfo>;
      vecStock2?: Array<FRecommendStockInfo>;
      vecStock3?: Array<FRecommendStockInfo>;
    }
    interface FAtkWvIf {
      stk?: StkInfo;
      dWave?: string;
    }
    interface FAttackWave {
      nDate?: number;
      vecAttackWave?: Array<FAtkWvIf>;
      vecTurnRoundWave?: Array<FAtkWvIf>;
    }
    interface FMarketCopyWriter {
      nDate?: number;
      dMarketHot?: string;
      dPositionRate?: string;
      dSHIndexLB?: string;
      dSZIndexLB?: string;
      sLevel?: string;
      sTrend?: string;
      sFund?: string;
      sMakeMoney?: string;
      sShortTerm?: string;
      sPositionRate?: string;
    }
    interface FStkZTNumIf {
      stk?: StkInfo;
      nZTNum?: number;
    }
    interface FStkNatureZTNum {
      nDate?: number;
      vecStk?: Array<FStkZTNumIf>;
    }
    interface FUnuActInfo {
      lStartTime?: string;
      lEndTime?: string;
      iZTStkCount?: number;
      dUpRatio?: string;
    }
    interface FBlkUnuActInfo {
      block?: FBlockSimpleInfo;
      vecUnuActInfo?: Array<FUnuActInfo>;
    }
    interface FBlkUnusualAction {
      nDate?: number;
      mapBlkUnuActInfo?: Record<string, FBlkUnuActInfo>;
      lRefreshTime?: string;
    }
    interface FBlkUnuActTagInfo {
      lUnuActTime?: string;
      stUnuActInfo?: FUnuActInfo;
      block?: FBlockSimpleInfo;
    }
    interface FBlkUnusualActionTag {
      nDate?: number;
      vecBlkUnuActTagInfo?: Array<FBlkUnuActTagInfo>;
    }
    interface FTwiceZTStkIf {
      stk?: StockInfo;
      ztType?: E_NTRADE_DATE_ZT_TYPE;
      iLastZDTime?: number;
      iFirstZDTime?: number;
      lLastZDTVol?: string;
      bIsZt?: boolean;
      bIsST?: boolean;
      bUnOpenNewStock?: boolean;
    }
    interface FTwiceZTStk {
      nDate?: number;
      vecStk?: Array<FTwiceZTStkIf>;
    }
    interface FMarketStockStatistic {
      iMarket?: number;
      iRiseStkCount?: number;
      iFallStkCount?: number;
      iStaticStkCount?: number;
    }
    interface FStockStatistic {
      nDate?: number;
      vecMktStkStat?: Array<FMarketStockStatistic>;
    }
    interface FDragonHeadGeneStkIf {
      stk?: StockInfo;
      dNowPrice?: string;
      dChgRatio?: string;
      iContinueBoard?: number;
      dTurnOver?: string;
      iLastZDTime?: number;
      iNatureDayZTNum?: number;
      dFloatValue?: string;
      dDayMainMoneyInflow?: string;
      dDayMainMoneyRatio?: string;
      dAmount?: string;
      blk?: FBlockSimpleInfo;
      dLiangBi?: string;
      iFirstZDTime?: number;
    }
    interface FDragonHeadGeneStk {
      nDate?: number;
      vecStk?: Array<FDragonHeadGeneStkIf>;
    }
    interface FUltraShorttermStkIf {
      stk?: StockInfo;
      vecOriPoolType?: Array<E_UNITED_STK_POOL_TYPE>;
      dNowPrice?: string;
      dChgRatio?: string;
      iContinueBoard?: number;
      dTurnOver?: string;
      dFloatValue?: string;
      dTotalMarketValue?: string;
      dAttackWave?: string;
      dTurnOverWave?: string;
      stBoard?: FBoardPeriod;
      vecBlk?: Array<FBlockSimpleInfo>;
      bUnOpenNewStock?: boolean;
      vecDetail?: Array<FOpenBoardDetail>;
      iIPODate?: number;
      iMaxConBoard?: number;
      eType?: E_STOCK_ZT_TYPE;
      dOpenChgRatio?: string;
    }
    interface FUltraShorttermStkPool {
      nDate?: number;
      vecStk?: Array<FUltraShorttermStkIf>;
    }
    interface FDaRouDaMianStkIf {
      stk?: StockInfo;
      iContinueBoard?: number;
      stBoard?: FBoardPeriod;
      dAttackWave?: string;
      dTurnOverWave?: string;
      dOpenChgRatio?: string;
      vecBlk?: Array<FBlockSimpleInfo>;
    }
    interface FDaRouDaMianTsIf {
      iTime?: number;
      iStkNum?: number;
    }
    interface FDaRouDaMianStk {
      nDate?: number;
      vecDaRouStk?: Array<FDaRouDaMianStkIf>;
      vecDaMianStk?: Array<FDaRouDaMianStkIf>;
    }
    interface FDaRouDaMianStkTs {
      nDate?: number;
      vecDaRouTs?: Array<FDaRouDaMianTsIf>;
      vecDaMianTs?: Array<FDaRouDaMianTsIf>;
    }
    interface FTermMoodLevelIf {
      vecStk?: Array<StkSimpInfo>;
      iMoodLevel?: number;
      iOriContinueBoardNum?: number;
    }
    interface FTerMoodLevelTsIf {
      iTime?: number;
      iMoodLevel?: number;
    }
    interface FTermMoodLevel {
      nDate?: number;
      stMinorLevel?: FTermMoodLevelIf;
      stMajorLevel?: FTermMoodLevelIf;
    }
    interface FTermMoodLevelTs {
      nDate?: number;
      vecMinorTs?: Array<FTerMoodLevelTsIf>;
      vecMajorTs?: Array<FTerMoodLevelTsIf>;
    }
    interface FMarketTerm {
      eMarketTermType?: E_MARKET_TERM_TYPE;
      sMarketTermCopy?: string;
      vecRecommendStkPool?: Array<E_UNITED_STK_POOL_TYPE>;
    }
    interface FDaRouMianStkNum {
      iDaRouStkNum?: number;
      iDaMianStkNum?: number;
      sUltraShortMoodCopy?: string;
    }
    interface FUltraShortTermStkNum {
      iRiseStkNum?: number;
      iFallStkNum?: number;
      mapOriStkNum?: Record<E_UNITED_STK_POOL_TYPE, number>;
      sUltraShortMoodCopy?: string;
    }
    interface FPositionRateCopy {
      stPositionRate?: FPositionRateCurrent;
      sPositionCopy?: string;
      sPositionCat?: string;
    }
    interface FZTStockAnalyse {
      vecContinueBoardNum?: Array<number>;
    }
    interface FDataAnalyse {
      nDate?: number;
      stTopMoodStk?: FTermMoodLevelIf;
      stMarketTerm?: FMarketTerm;
      stUltraShorttermStkNum?: FUltraShortTermStkNum;
      stDaRouMianStkNum?: FDaRouMianStkNum;
      stZDStkAnalyse?: FZTStockAnalyse;
      stPosRateCopy?: FPositionRateCopy;
      stHitBoardRate?: FHitBoardCurrent;
      stZTProfitRate?: FZTProfitCurrent;
      stOpenBoardRate?: FOpenBoardCurrent;
      stZDFenBu?: FZDFenBuCurrent;
    }
    interface FBlkDragonHeadStkInfo {
      hotBlk?: FHotBlockInfo;
      vecStk?: Array<StockInfo>;
    }
    interface FBlkDragonHeadStk {
      nDate?: number;
      mapBlkStk?: Record<string, FBlkDragonHeadStkInfo>;
    }
    enum E_LB_PREDICT_STK_TYPE {
      E_LB_PREDICT_NONE = 0,
      E_LB_PREDICT_MARKET_LEADER,
      E_LB_PREDICT_PLATE_DRIVEN,
      E_LB_PREDICT_PLATE_DRIVEN2,
      E_LB_PREDICT_MAIN_PURSUIT,
      E_LB_PREDICT_2_BOARD_PIONEER,
      E_LB_PREDICT_REVERSE_LEADER,
    }
    interface FLBPredictStkInfo {
      stk?: StkInfo;
      dIncrease?: string;
      lVolume?: string;
      iContinueBoard?: number;
      strStockZTReason?: string;
      emPredictType?: E_LB_PREDICT_STK_TYPE;
      sDesc?: string;
      dZTProbability?: string;
      iFirstZDTime?: number;
      dVolRatio?: string;
      nBlkOverlap?: number;
      dPreIncrease?: string;
      lPreVolume?: string;
    }
    interface FLBPredictPool {
      nDate?: number;
      mapStk?: Record<number, Array<FLBPredictStkInfo>>;
    }
    enum E_TAG_DATA_TYPE {
      E_TAG_DATA_PANMIAN_LIGHT,
      E_TAG_DATA_MAKE_MONEY_EFFECT,
      E_TAG_DATA_LOSE_MONEY_EFFECT,
      E_TAG_DATA_ZT_ANALYZE,
    }
    interface FZTAnalyzeInfo {
      strStockName?: string;
      iContinueBoard?: number;
      iLastZTTime?: number;
      vecBlock?: Array<FBlockSimpleInfo>;
      dLastPrice?: string;
      dChgRatio?: string;
      dAmount?: string;
      dLTValue?: string;
      dTurnOverRatio?: string;
      lLastZDTVol?: string;
      dMainMoneyInflow?: string;
      dAttackWave?: string;
      vecTag?: Array<E_ZT_TAG_TYPE>;
      strStockZTReason?: string;
      iTagTime?: number;
      iMarket?: number;
      strCode?: string;
    }
    interface FZTAnalyze {
      mapZTAnalyze?: Record<E_ZT_TAG_TYPE, Array<FZTAnalyzeInfo>>;
    }
    interface FPanMianLDInfo {
      strStockName?: string;
      iTagTime?: number;
      vecTag?: Array<E_ZT_TAG_TYPE>;
      strStockZTReason?: string;
      vecBlock?: Array<FBlockSimpleInfo>;
      iMarket?: number;
      strCode?: string;
    }
    interface FPanMianLD {
      mapPanMianLD?: Record<E_ZT_TAG_TYPE, Array<FPanMianLDInfo>>;
    }
    interface FEarnMoneyEffectInfo {
      strStockName?: string;
      vecTag?: Array<E_ZT_TAG_TYPE>;
      iMarket?: number;
      strCode?: string;
    }
    interface FEarnMoneyEffect {
      mapMakeMoney?: Record<number, Array<FEarnMoneyEffectInfo>>;
    }
    interface FStockZTTag {
      nDate?: number;
      stEarnMoneyEffect?: FEarnMoneyEffect;
      stZTAnalyze?: FZTAnalyze;
      stPanMianLD?: FPanMianLD;
    }
    interface FHisFactorData {
      stMakeMoneyEffect?: FMakeMoneyEffect;
      stTrendStrength?: FTrendStrength;
      nDate?: number;
      stHotSubject?: FHotSubject;
      stMDaySubNewStock?: FMDaySubNewStock;
      stRecommendStockPool?: FRecommendStockPool;
      stAttackWave?: FAttackWave;
      stMarketCopyWriter?: FMarketCopyWriter;
      stStkNatureZTNum?: FStkNatureZTNum;
      stBlkUnusualAction?: FBlkUnusualAction;
      stBlkUnusualActTag?: FBlkUnusualActionTag;
      stTwiceZTStk?: FTwiceZTStk;
      stStockStatistic?: FStockStatistic;
      stDragonHeadGeneStk?: FDragonHeadGeneStk;
      stTsTwiceZTStk?: FTwiceZTStk;
      stUltraShorttermStkPool?: FUltraShorttermStkPool;
      stDaRouMianStk?: FDaRouDaMianStk;
      stDaRouMianStkTs?: FDaRouDaMianStkTs;
      stTermMoodLevel?: FTermMoodLevel;
      stTermMoodLevelTs?: FTermMoodLevelTs;
      stDataAnalyse?: FDataAnalyse;
      stBlkDragonHeadStk?: FBlkDragonHeadStk;
      stLBPredictPool?: FLBPredictPool;
      stHotSubjectTs?: FHotSubjectTs;
      stHotSubjectDL?: FHotSubjectTs;
      stStockZTTag?: FStockZTTag;
    }
  }
}
export {};