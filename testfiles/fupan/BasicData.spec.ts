declare global {
  namespace HQSys {
    interface HTolMoneyFlow {
      iTime?: number;
      shtsetcode?: string;
      sCode?: string;
      fSuperIn?: string;
      fSuperOut?: string;
      fBigIn?: string;
      fBigOut?: string;
      fMidIn?: string;
      fMidOut?: string;
      fSmallIn?: string;
      fSmallOut?: string;
      dPrevClose?: string;
    }
    interface HRTMinData {
      shtMinute?: string;
      fNow?: string;
      fAverage?: string;
      uiNowVol?: string;
      uiBuyv?: string;
      uiSellv?: string;
      dAmount?: string;
      uiVolInStock?: string;
      fLead?: string;
    }
    interface SZTData {
      bZT?: string;
      bPreZT?: string;
      iBoardDays?: number;
      iStrongDays?: number;
      iZDTDays?: number;
    }
    interface BlockBasicInfo {
      sCode?: string;
      sName?: string;
    }
    interface HDateTime {
      iDate?: number;
      shtDay?: string;
      shtTime?: string;
    }
    interface HTogetherZhiShu {
      uiVolInStock?: string;
      fYClose?: string;
      usUp?: string;
      usDown?: string;
    }
    interface HAnalyData {
      sttDateTime?: HDateTime;
      fOpen?: string;
      fHigh?: string;
      fLow?: string;
      fClose?: string;
      fAmount?: string;
      lVolume?: string;
      dSettlementPrice?: string;
      sttZhiShu?: HTogetherZhiShu;
    }
    interface HCQAnalyData {
      stLine?: HAnalyData;
      lOpenDate?: string;
      lCloseDate?: string;
      lHighDate?: string;
      lLowDate?: string;
      dHigh?: string;
      dLow?: string;
    }
    interface HTickData {
      shtMinute?: string;
      fNowPrice?: string;
      uiNowVol?: string;
      shtInOutFlag?: string;
      iTime?: number;
      iTradeNum?: number;
      dAvgPrice?: string;
      uiFrontTrans?: string;
      iVolInStockDif?: number;
    }
    interface HMarketTradePeriod {
      vTradePeriod?: Array<string>;
    }
    interface HStock {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
    }
    interface HStockDatePeriod {
      stStock?: HStockUnique;
      iStartDate?: number;
      iEndDate?: number;
      iNum?: number;
      iStartDateTime?: string;
      iEndDateTime?: string;
    }
    interface HStockAnalyData {
      stStock?: HStockUnique;
      vAnalayData?: Array<HAnalyData>;
      iSumCount?: number;
    }
    interface HMFlowTrend {
      fMainMoneyInflow?: string;
      fMainMoneyRatio?: string;
      fRetailMoneyInflow?: string;
      fRetailMoneyRatio?: string;
      fSuperLargeInflow?: string;
      fSuperLargeRatio?: string;
      fLargeInflow?: string;
      fLargeRatio?: string;
      fMiddleInflow?: string;
      fMiddleRatio?: string;
      fSmallInflow?: string;
      fSmallRatio?: string;
    }
    interface HMFlowRank {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      iType?: number;
      fNowPrice?: string;
      fChg?: string;
      fChange?: string;
      fDayMFlowTrend?: HMFlowTrend;
      f3DayMFlowTrend?: HMFlowTrend;
      f5DayMFlowTrend?: HMFlowTrend;
      f10DayMFlowTrend?: HMFlowTrend;
      bTransactionStatus?: string;
      f3MinMFlowTrend?: HMFlowTrend;
      f5MinMFlowTrend?: HMFlowTrend;
      ztData?: SZTData;
      leadBlock?: BlockBasicInfo;
      f10MinMFlowTrend?: HMFlowTrend;
      f30MinMFlowTrend?: HMFlowTrend;
      f60MinMFlowTrend?: HMFlowTrend;
    }
    interface HDDERank {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      fNowPrice?: string;
      fChg?: string;
      fTurnoverRate?: string;
      fDDX?: string;
      fDDY?: string;
      fDDZ?: string;
      fDDF?: string;
      fDDX5?: string;
      fDDY5?: string;
      fDDX60?: string;
      fDDY60?: string;
    }
    interface HDxjl {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      iOrderTime?: number;
      iShtType?: number;
      dOrderVol?: string;
      fNowPrice?: string;
      iNum?: number;
    }
    interface HOrderUnit {
      dPadOrderPrice?: string;
      iPadOrderNum?: number;
      dPressOrderPrice?: string;
      iPressOrderNum?: number;
      dNowPrice?: string;
      iVolume?: number;
      dBuyAmt?: string;
      dSellAmt?: string;
    }
    interface HOrderClassify {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      iOrderTime?: number;
      iShtType?: number;
      stOrderUnit?: HOrderUnit;
    }
    enum E_FINANCING_TARGET {
      E_FT_NULL,
      E_FT_FINANCING,
    }
    interface TagInfo {
      shtType?: string;
      sDesc?: string;
    }
    interface HStockBaseInfo {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      fPeRatio?: string;
      cCoinType?: string;
      fCirculationStocks?: string;
      fTotalMarketValue?: string;
      fCirculationMarketValue?: string;
      bMarginMark?: string;
      bSecuritiesMark?: string;
      fPriceRatio?: string;
      iType?: number;
      dNetValue?: string;
      dZGB?: string;
      dDTSY?: string;
      eTarget?: E_FINANCING_TARGET;
      vTags?: Array<TagInfo>;
      dPreClose?: string;
      dZTPrice?: string;
      dDTPrice?: string;
    }
    interface StockStaticData {
      shtMarket?: string;
      sCode?: string;
      sName?: string;
      shtType?: string;
      dLtg?: string;
      dZgb?: string;
      dJzc?: string;
      dNetValue?: string;
      dDTSY?: string;
      d5SumVol?: string;
      dZTPrice?: string;
      dDTPrice?: string;
      dPreClose?: string;
      bMarginMark?: string;
      bSecuritiesMark?: string;
      cCoinType?: string;
      eTarget?: E_FINANCING_TARGET;
      vTags?: Array<TagInfo>;
    }
    enum E_STOCK_FLAG_TYPE {
      E_FLAG_TYPE_UNKNOWN = 0,
      E_FLAG_TYPE_ZTG = 1,
    }
    interface HStockSimHq {
      fNowPrice?: string;
      fOpen?: string;
      fHigh?: string;
      fLow?: string;
      fClose?: string;
      lVolume?: string;
      fAmount?: string;
      fChgValue?: string;
      fChgRatio?: string;
      fZhenfu?: string;
      ztData?: SZTData;
      leadBlock?: BlockBasicInfo;
    }
    interface HStockQhHq {
      dSettlementPrice?: string;
      dPreSettlementPrice?: string;
      dOpenInterest?: string;
      dPreOpenInterest?: string;
      iEveryHand?: number;
      dDayIncrease?: string;
    }
    interface HStockZQHq {
      fRoRPerYear?: string;
      dRatePer10w?: string;
      dRatePer1k?: string;
      shtDays?: string;
      shtZkDays?: string;
      iJxFrom?: number;
      iJxTo?: number;
      iTodayBuy?: number;
      iZjUserDay?: number;
      iZjFetchDay?: number;
    }
    interface HStockExHq {
      lNowVol?: string;
      lInside?: string;
      lOutside?: string;
      vBuyp?: Array<string>;
      vBuyv?: Array<string>;
      vSellp?: Array<string>;
      vSellv?: Array<string>;
      fAveragePrice?: string;
      fZTPrice?: string;
      fDTPrice?: string;
      fTurnoverRate?: string;
      iTradeMin?: number;
      iTradeDate?: number;
      iTradeTime?: number;
      bZDMark?: string;
      bTransactionStatus?: string;
      vBuyNum?: Array<number>;
      vSellNum?: Array<number>;
      iBSFlag?: number;
      dPeRatio?: string;
      dPriceRatio?: string;
      dZSZ?: string;
      dLTZS?: string;
    }
    enum E_STOCK_TRADE_STATUS {
      E_STATUS_UNKOWN = 0,
      E_STATUS_CLOSED = 1,
      E_STATUS_NOT_OPEN = 2,
      E_STATUS_AUTION = 3,
      E_STATUS_UPCOMING = 4,
      E_STATUS_TRADE = 5,
      E_STATUS_AM_TRADE = 6,
      E_STATUS_NOONTIME = 7,
      E_STATUS_PM_TRADE = 8,
      E_STATUS_STOPPED = 9,
      E_STATUS_TEMP_STOPPED = 10,
      E_STATUS_AFTER_TRADE = 11,
      E_STATUS_VOLATILITY_STOPPED = 12,
      E_STATUS_RECOVERABLE_FUSING = 13,
      E_STATUS_NON_RECOVERABLE_FUSING = 14,
    }
    enum E_MARKET_TRADE_STATUS {
      E_MARKET_STATUS_UNKOWN = 0,
      E_MARKET_STATUS_CLOSED = 1,
      E_MARKET_STATUS_NOT_OPEN = 2,
      E_MARKET_STATUS_AUCTION = 3,
      E_MARKET_STATUS_UPCOMING = 4,
      E_MARKET_STATUS_TRADE = 5,
      E_MARKET_STATUS_AM_TRADE = 6,
      E_MARKET_STATUS_NOONTIME = 7,
      E_MARKET_STATUS_PM_TRADE = 8,
      E_MARKET_STATUS_PM_AUCTION = 20,
    }
    interface HStockDeriveHq {
      dLiangBi?: string;
      dUpSpeed?: string;
      lTradeNum?: string;
      dBuyAvg?: string;
      dSellAvg?: string;
      lBuyPriceNum?: string;
      lSellPriceNum?: string;
      lBuyVol?: string;
      lSellVol?: string;
      eStatus?: E_STOCK_TRADE_STATUS;
      dMainMoneyInflow5Min?: string;
      uiItemNum?: string;
    }
    interface HBlockIndexHq {
      sHeadMarket?: string;
      sHeadCode?: string;
      sHeadName?: string;
      fHeadNow?: string;
      fHeadClose?: string;
      iStockNum?: number;
      iEqualNum?: number;
      iZTNum?: number;
      iUpNum?: number;
      iDownNum?: number;
      dTotalMarketValue?: string;
      dCirculationMarketValue?: string;
      iUpNDay?: number;
      d3DayChg?: string;
      d5DayChg?: string;
      d10DayChg?: string;
    }
    interface HStockCwHq {
      dMGSY?: string;
      dMGJZC?: string;
      dJZCSYL?: string;
      dYSZZL3Y?: string;
      dJLSZZL3Y?: string;
    }
    enum E_STOCK_HQ_DATA {
      E_SHD_NONE = 0,
      E_SHD_SIMPLE = 1,
      E_SHD_ORDER = 2,
      E_SHD_BLOCK = 4,
      E_SHD_DERIVE = 8,
      E_SHD_1DAY_ZJ = 32,
      E_SHD_3DAY_ZJ = 64,
      E_SHD_5DAY_ZJ = 128,
      E_SHD_10DAY_ZJ = 256,
      E_SHD_DDE = 512,
      E_SHD_CW = 1024,
      E_SHD_3MIN_ZJ = 2048,
      E_SHD_5MIN_ZJ = 4096,
      E_SHD_10MIN_ZJ = 8192,
      E_SHD_30MIN_ZJ = 16384,
      E_SHD_60MIN_ZJ = 32768,
    }
    enum E_STOCK_DATA_ENV {
      E_SHDE_NORMAL = 0,
      E_SHDE_PRICE = 1,
      E_SHDE_LIST_QT = 2,
      E_SHDE_LIST_1DAYZJ = 3,
      E_SHDE_LIST_3DAYZJ = 4,
      E_SHDE_LIST_5DAYZJ = 5,
      E_SHDE_LIST_10DAYZJ = 6,
      E_SHDE_SIMPLE_STATUS = 7,
      E_SHDE_LIST_3MINZJ = 8,
      E_SHDE_LIST_5MINZJ = 9,
      E_SHDE_LIST_10MINZJ = 10,
      E_SHDE_LIST_30MINZJ = 11,
      E_SHDE_LIST_60MINZJ = 12,
    }
    interface HStockHq {
      shtPrecise?: string;
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      stSimHq?: HStockSimHq;
      stExHq?: HStockExHq;
      stQhHq?: HStockQhHq;
      stMF?: HTolMoneyFlow;
      stDDE?: HDDERank;
      stBlockHq?: HBlockIndexHq;
      stDeriveHq?: HStockDeriveHq;
      stCwHq?: HStockCwHq;
      stZQhq?: HStockZQHq;
      st3MinMF?: HTolMoneyFlow;
      st5MinMF?: HTolMoneyFlow;
      st10MinMF?: HTolMoneyFlow;
      st30MinMF?: HTolMoneyFlow;
      st60MinMF?: HTolMoneyFlow;
    }
    interface OptStockHqEx {
      fNowPrice?: string;
      fChg?: string;
      fChgValue?: string;
      dUpSpeed?: string;
      fTurnoverRate?: string;
      fPeRatio?: string;
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      fDayMainMoneyInflow?: string;
      fDayMainMoneyRatio?: string;
      f3DayMainMoneyInflow?: string;
      f3DayMainMoneyRatio?: string;
      f5DayMainMoneyInflow?: string;
      f5DayMainMoneyRatio?: string;
      bTransactionStatus?: string;
      precise?: string;
      f3MinMainMoneyInflow?: string;
      f3MinMainMoneyRatio?: string;
      f5MinMainMoneyInflow?: string;
      f5MinMainMoneyRatio?: string;
      ztData?: SZTData;
      leadBlock?: BlockBasicInfo;
      f10MinMainMoneyInflow?: string;
      f10MinMainMoneyRatio?: string;
      f30MinMainMoneyInflow?: string;
      f30MinMainMoneyRatio?: string;
      f60MinMainMoneyInflow?: string;
      f60MinMainMoneyRatio?: string;
    }
    interface HCQCX {
      sCode?: string;
      shtSetCode?: string;
      iType?: number;
      iDate?: number;
      fDividend?: string;
      fAllotmentPrice?: string;
      fBonusStock?: string;
      fAllotmentStock?: string;
    }
    interface HAHItem {
      shtMarket?: string;
      sCode?: string;
      sName?: string;
      fNowPrice?: string;
      fChg?: string;
      fCurMarketValue?: string;
      fTurnoverRate?: string;
      iTotalHand?: number;
      shtOwnIndustry?: string;
      dChangeValue?: string;
    }
    interface HAHStock {
      fPremiumRate?: string;
      stAItem?: HAHItem;
      stHItem?: HAHItem;
    }
    interface HTradePeriod {
      vTradePeriod?: Array<string>;
    }
    interface HHotPlateStock {
      shtSetcode?: string;
      sCode?: string;
      fClose?: string;
      fPrice?: string;
      lVolume?: string;
      lAmount?: string;
      fOpen?: string;
      fHigh?: string;
      fLow?: string;
      cDecimal?: string;
    }
    interface HL2Monit {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      fPrice?: string;
      fChg?: string;
      iTime?: number;
      iType?: number;
      djb?: string;
      djs?: string;
      tljb?: string;
      tljs?: string;
      dbcb?: string;
      dbcs?: string;
      cdb?: string;
      cds?: string;
      dbb?: string;
      dbs?: string;
      fzt?: number;
      dkzt?: number;
      fdt?: number;
      dkdt?: number;
      ydb?: string;
      yds?: string;
      hjfs?: number;
      jsxd?: number;
      ksft?: number;
      gtts?: number;
    }
    interface HSZDetail {
      iTime?: number;
      iNum?: number;
      dPrice?: string;
      dVol?: string;
    }
    interface HSZFY {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      fPrice?: string;
      fChg?: string;
      iNum?: number;
      vol?: string;
      value?: string;
      vDetail?: Array<HSZDetail>;
    }
    interface DxjlUnit {
      iCount?: number;
      dVol?: string;
      dAmt?: string;
    }
    interface HSZFYCom {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      fPrice?: string;
      fChg?: string;
      stBuyUnit?: DxjlUnit;
      stSellUnit?: DxjlUnit;
    }
    interface HCPTMin {
      uiTradeSeq?: string;
      uiTradeDate?: string;
      uiTradeTime?: string;
    }
    interface HTradeTime {
      iTradeDate?: number;
      iBegTime?: number;
      iEndTime?: number;
    }
    interface HTradePeriodTime {
      vPeriod?: Array<HTradeTime>;
      mPeriod?: Record<string, Array<HTradeTime>>;
    }
    interface HFinData {
      shtSetCode?: string;
      sCode?: string;
      dFlowStock?: string;
      shtAddr?: string;
      shtHy?: string;
      lNewDate?: string;
      lStartDate?: string;
      dTotalStock?: string;
      dNatinalStock?: string;
      dFounderStock?: string;
      dBStock?: string;
      dHStock?: string;
      dWorkerStock?: string;
      dTotalValue?: string;
      dFixedValue?: string;
      dFlowValue?: string;
      dWxValue?: string;
      dLongValue?: string;
      dFlowLoad?: string;
      dLongLoad?: string;
      dCapitalValue?: string;
      dRightValue?: string;
      dMainValue?: string;
      dMainInterest?: string;
      dOtherInterest?: string;
      dBusInterest?: string;
      dInvestInterest?: string;
      dBuTieValue?: string;
      dOutValue?: string;
      dLoseAdjust?: string;
      dProfitValue?: string;
      dAfterTaxValue?: string;
      dNetValue?: string;
      dUnDistibuteValue?: string;
      dAdjustValue?: string;
      dHalfYearFlag?: string;
    }
    interface HMarketInit {
      shtSetCode?: string;
      uiTradeSeq?: string;
      uiTradeDate?: string;
    }
    interface HStockIndustry {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      dNowPrice?: string;
      dChgValue?: string;
      dChgRatio?: string;
      bTransactionStatus?: string;
      sIndustryName?: string;
    }
    interface HStockDictInfo {
      Code?: string;
      Unit?: string;
      Name?: string;
      VolBase?: number;
      precise?: string;
      Close?: string;
      Market?: string;
      BaseFreshCount?: string;
      GbbqFreshCount?: string;
      iType?: string;
    }
    enum E_ORDER_ITEM_TYPE {
      E_ORDER_ITEM_NO = 0,
      E_ORDER_ITEM_TRADE = 1,
      E_ORDER_ITEM_CANCEL = 2,
      E_ORDER_ITEM_BIG = 4,
      E_ORDER_ITEM_ADD = 8,
      E_ORDER_ITEM_PARTTRADE = 16,
    }
    enum E_ORDER_OPERATE_TYPE {
      E_BUY_ORDER = 0,
      E_SELL_ORDER = 1,
      E_CANCAL_ORDER = 2,
    }
    enum E_ORDER_TRADE_KINDE {
      E_ORDER_MARKET_PRICE = 0,
      E_ORDER_FIXED_PRICE = 1,
      E_ORDER_BEST_SCHEME = 2,
    }
    interface HOrderItem {
      lVolume?: string;
      eStatus?: E_ORDER_ITEM_TYPE;
    }
    interface HOrderQueue {
      lTime?: string;
      dPrice?: string;
      lVolume?: string;
      bBuySell?: string;
      lOrderNum?: string;
      vOrder?: Array<HOrderItem>;
    }
    interface HTransaction {
      lTime?: string;
      lTradeNo?: string;
      bType?: string;
      dPrice?: string;
      lVolume?: string;
      lBuyNo?: string;
      lSellNo?: string;
      lBargainNo?: string;
    }
    interface HOrderRec {
      lTime?: string;
      lTradeNo?: string;
      dPrice?: string;
      lVolume?: string;
      eTradeKind?: E_ORDER_TRADE_KINDE;
      eOPType?: E_ORDER_OPERATE_TYPE;
      lOrderNo?: string;
    }
    interface HOrderSumStat {
      dBuyAvgPrice?: string;
      lBuyVol?: string;
      lBuyOrderCount?: string;
      lBuyNum?: string;
      lBigBuyVol?: string;
      lAllBuyNum?: string;
      lBuyCancelNum?: string;
      lBigBuyCancelNum?: string;
      dSellAvgPrice?: string;
      lSellVol?: string;
      lSellOrderCount?: string;
      lSellNum?: string;
      lBigSellVol?: string;
      lAllSellNum?: string;
      lSellCancelNum?: string;
      lBigSellCancelNum?: string;
    }
    interface HOrderQueuePrice {
      dPrice?: string;
      lSumVol?: string;
      lBigVol?: string;
      lTotalOrder?: string;
      eStatus?: E_ORDER_ITEM_TYPE;
    }
    interface HPriceAmount {
      lOrderNo?: string;
      lVolume?: string;
      eStatus?: E_ORDER_ITEM_TYPE;
    }
    enum H_ZH_RANK_TYPE {
      E_ZH_RANK_UP = 1,
      E_ZH_RANK_DROP = 2,
      E_ZH_RANK_SPEED_TOP = 4,
      E_ZH_RANK_SPEED_LAST = 8,
      E_ZH_RANK_WEIBI_TOP = 16,
      E_ZH_RANK_WEIBI_LAST = 32,
      E_ZH_RANK_LIANGBI = 64,
      E_ZH_RANK_AMOUNT = 128,
      E_ZH_RANK_ZHENFU = 256,
      E_ZH_RANK_ALL = 4095,
    }
    interface HZHRankData {
      eRankType?: H_ZH_RANK_TYPE;
      shtSetcode?: string;
      sCode?: string;
      dNowPrice?: string;
      dRankValue?: string;
    }
    interface HStockRankData {
      shtSetCode?: string;
      sCode?: string;
      dRankValue?: string;
    }
    interface HBKLedData {
      shtSetCode?: string;
      sCode?: string;
      dRankValue?: string;
      iUpNum?: number;
      iEqualNum?: number;
      iDownNum?: number;
      vStock?: Array<HStockRankData>;
    }
    interface HDDZData {
      stMfAmt?: HTolMoneyFlow;
      stMfVol?: HTolMoneyFlow;
      stMfNum?: HTolMoneyFlow;
      iTime?: number;
    }
    enum E_MARKET_TYPE {
      E_TYPE_SZ_AB = 0,
      E_TYPE_SH_AB = 1,
      E_TYPE_BK_ZS = 2,
      E_TYPE_NONE = 99,
    }
    interface HTypeStatusData {
      eType?: E_MARKET_TYPE;
      iStatus?: number;
    }
    interface HFileInfo {
      sFileName?: string;
      iPos?: number;
      sCheckSum?: string;
      iLen?: number;
      bCompress?: boolean;
    }
    interface HFileData {
      sFileName: string;
      bCompress?: boolean;
      bChg: boolean;
      vBuf?: Array<string>;
      bRemain: boolean;
      sCheckSum?: string;
    }
    enum E_LOGIN_CLIENT_TYPE {
      EPC_LOGIN = 0,
      EMOBILE_LOGIN = 1,
      EWEB_LOGIN = 2,
    }
    enum E_KICK_OUT_STATUS {
      E_NOT_KICK_OUT = 0,
      E_DO_KICK_OUT = 1,
    }
    enum E_KICK_OUT_REASON {
      E_KICK_REPEAT = 0,
      E_KICK_OVERDUE = 1,
    }
    interface HRigthUnit {
      sRightId?: string;
      sBeginDate?: string;
      sEndDate?: string;
    }
    interface HUserRight {
      sUserId?: string;
      vRight?: Array<HRigthUnit>;
      sRd?: string;
      sSsoDate?: string;
      bAllowRepeatLogin?: boolean;
    }
    enum E_LOGIN_AUTH_TYPE {
      E_LOGIN_AUTH_SZ_SH = 1,
      E_LOGIN_AUTH_HK_US = 2,
      E_LOGIN_AUTH_LST = 3,
      E_LOGIN_AUTH_XW = 4,
      E_LOGIN_AUTH_AC = 5,
      E_LOGIN_AUTH_CLS = 6,
      E_LOGIN_AUTH_GNN = 7,
    }
    interface HLoginInfo {
      sUserId?: string;
      sRd?: string;
      sPermission?: string;
      sSsoTime?: string;
      sCltTime?: string;
      lCltConId?: string;
      eCltType?: E_LOGIN_CLIENT_TYPE;
      shtDelFlag?: string;
      stUserRight?: HUserRight;
      eAuthType?: E_LOGIN_AUTH_TYPE;
      sSvrId?: string;
      sGuid?: string;
    }
    interface HKickOutInfo {
      stInfo?: HLoginInfo;
      sSvrId?: string;
      eStatus?: E_KICK_OUT_STATUS;
      eReason?: E_KICK_OUT_REASON;
    }
    interface HNewStockPerform {
      stStock?: HStock;
      dSignProfit?: string;
      iZtNDay?: number;
      bBreakPlate?: boolean;
      sListDate?: string;
    }
    interface HRadarQt {
      iMarket?: number;
      sCode?: string;
      stQt?: RadarData.RadarQt;
    }
    interface HRadarChg {
      iMarket?: number;
      sCode?: string;
      stChg?: RadarData.RadarChg;
    }
    interface HSyntInfo {
      iMarket?: number;
      sCode?: string;
      dPrice?: string;
      dZdf?: string;
      dltsz?: string;
      dMainBuy?: string;
      fMainBuyRatio?: string;
      fMainSellRatio?: string;
      fDDX?: string;
      fDDY?: string;
      fDDZ?: string;
      intVol500?: number;
      intVol1000?: number;
      intVol5000?: number;
      intVol9999?: number;
      intAmt100?: number;
      intAmt200?: number;
      intAmt500?: number;
      dMainBuy3?: string;
      dMainBuy5?: string;
      dMainBuy10?: string;
      iMainBuyRedDay?: number;
      iMainBuyRedDay5?: number;
      iMainBuyRedDay10?: number;
      fDDX3?: string;
      fDDX5?: string;
      fDDX10?: string;
      iDDXRedDay?: number;
      iDDXRedDay5?: number;
      iDDXRedDay10?: number;
      fMainFlowTrend?: string;
    }
    interface HPankouRadio {
      iOrderLevel?: number;
      dPrice?: string;
      dVolume?: string;
    }
    enum E_HK_WARRANT_TYPE {
      E_HWT_NONE = 0,
      E_HWT_WL = 1,
      E_HWT_NX = 2,
    }
    interface HWarrantData {
      shtMarket?: string;
      sCode?: string;
      sName?: string;
      dNowPrice?: string;
      dAmount?: string;
    }
    interface HWarrantHkData {
      shtMarket?: string;
      sCode?: string;
      sName?: string;
      dNowPrice?: string;
      dChgValue?: string;
      dChg?: string;
    }
  }
}
export {};