declare global {
  namespace HQSys {
    interface HTolMoneyFlow {
      iTime?: string;
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
      iBoardDays?: string;
      iStrongDays?: string;
      iZDTDays?: string;
    }
    interface BlockBasicInfo {
      sCode?: string;
      sName?: string;
    }
    interface HDateTime {
      iDate?: string;
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
      iTime?: string;
      iTradeNum?: string;
      dAvgPrice?: string;
      uiFrontTrans?: string;
      iVolInStockDif?: string;
    }
    interface HMarketTradePeriod {
      vTradePeriod?: Array<short>;
    }
    interface HStock {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
    }
    interface HStockDatePeriod {
      stStock?: HStockUnique;
      iStartDate?: string;
      iEndDate?: string;
      iNum?: string;
      iStartDateTime?: string;
      iEndDateTime?: string;
    }
    interface HStockAnalyData {
      stStock?: HStockUnique;
      vAnalayData?: Array<HAnalyData>;
      iSumCount?: string;
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
      iType?: string;
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
      iOrderTime?: string;
      iShtType?: string;
      dOrderVol?: string;
      fNowPrice?: string;
      iNum?: string;
    }
    interface HOrderUnit {
      dPadOrderPrice?: string;
      iPadOrderNum?: string;
      dPressOrderPrice?: string;
      iPressOrderNum?: string;
      dNowPrice?: string;
      iVolume?: string;
      dBuyAmt?: string;
      dSellAmt?: string;
    }
    interface HOrderClassify {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      iOrderTime?: string;
      iShtType?: string;
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
      iType?: string;
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
      E_FLAG_TYPE_UNKNOWN,
      E_FLAG_TYPE_ZTG,
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
      iEveryHand?: string;
      dDayIncrease?: string;
    }
    interface HStockZQHq {
      fRoRPerYear?: string;
      dRatePer10w?: string;
      dRatePer1k?: string;
      shtDays?: string;
      shtZkDays?: string;
      iJxFrom?: string;
      iJxTo?: string;
      iTodayBuy?: string;
      iZjUserDay?: string;
      iZjFetchDay?: string;
    }
    interface HStockExHq {
      lNowVol?: string;
      lInside?: string;
      lOutside?: string;
      vBuyp?: Array<double>;
      vBuyv?: Array<long>;
      vSellp?: Array<double>;
      vSellv?: Array<long>;
      fAveragePrice?: string;
      fZTPrice?: string;
      fDTPrice?: string;
      fTurnoverRate?: string;
      iTradeMin?: string;
      iTradeDate?: string;
      iTradeTime?: string;
      bZDMark?: string;
      bTransactionStatus?: string;
      vBuyNum?: Array<int>;
      vSellNum?: Array<int>;
      iBSFlag?: string;
      dPeRatio?: string;
      dPriceRatio?: string;
      dZSZ?: string;
      dLTZS?: string;
    }
    enum E_STOCK_TRADE_STATUS {
      E_STATUS_UNKOWN,
      E_STATUS_CLOSED,
      E_STATUS_NOT_OPEN,
      E_STATUS_AUTION,
      E_STATUS_UPCOMING,
      E_STATUS_TRADE,
      E_STATUS_AM_TRADE,
      E_STATUS_NOONTIME,
      E_STATUS_PM_TRADE,
      E_STATUS_STOPPED,
      E_STATUS_TEMP_STOPPED,
      E_STATUS_AFTER_TRADE,
      E_STATUS_VOLATILITY_STOPPED,
      E_STATUS_RECOVERABLE_FUSING,
      E_STATUS_NON_RECOVERABLE_FUSING,
    }
    enum E_MARKET_TRADE_STATUS {
      E_MARKET_STATUS_UNKOWN,
      E_MARKET_STATUS_CLOSED,
      E_MARKET_STATUS_NOT_OPEN,
      E_MARKET_STATUS_AUCTION,
      E_MARKET_STATUS_UPCOMING,
      E_MARKET_STATUS_TRADE,
      E_MARKET_STATUS_AM_TRADE,
      E_MARKET_STATUS_NOONTIME,
      E_MARKET_STATUS_PM_TRADE,
      E_MARKET_STATUS_PM_AUCTION,
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
      iStockNum?: string;
      iEqualNum?: string;
      iZTNum?: string;
      iUpNum?: string;
      iDownNum?: string;
      dTotalMarketValue?: string;
      dCirculationMarketValue?: string;
      iUpNDay?: string;
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
      E_SHD_NONE,
      E_SHD_SIMPLE,
      E_SHD_ORDER,
      E_SHD_BLOCK,
      E_SHD_DERIVE,
      E_SHD_1DAY_ZJ,
      E_SHD_3DAY_ZJ,
      E_SHD_5DAY_ZJ,
      E_SHD_10DAY_ZJ,
      E_SHD_DDE,
      E_SHD_CW,
      E_SHD_3MIN_ZJ,
      E_SHD_5MIN_ZJ,
      E_SHD_10MIN_ZJ,
      E_SHD_30MIN_ZJ,
      E_SHD_60MIN_ZJ,
    }
    enum E_STOCK_DATA_ENV {
      E_SHDE_NORMAL,
      E_SHDE_PRICE,
      E_SHDE_LIST_QT,
      E_SHDE_LIST_1DAYZJ,
      E_SHDE_LIST_3DAYZJ,
      E_SHDE_LIST_5DAYZJ,
      E_SHDE_LIST_10DAYZJ,
      E_SHDE_SIMPLE_STATUS,
      E_SHDE_LIST_3MINZJ,
      E_SHDE_LIST_5MINZJ,
      E_SHDE_LIST_10MINZJ,
      E_SHDE_LIST_30MINZJ,
      E_SHDE_LIST_60MINZJ,
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
      iType?: string;
      iDate?: string;
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
      iTotalHand?: string;
      shtOwnIndustry?: string;
      dChangeValue?: string;
    }
    interface HAHStock {
      fPremiumRate?: string;
      stAItem?: HAHItem;
      stHItem?: HAHItem;
    }
    interface HTradePeriod {
      vTradePeriod?: Array<short>;
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
      iTime?: string;
      iType?: string;
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
      fzt?: string;
      dkzt?: string;
      fdt?: string;
      dkdt?: string;
      ydb?: string;
      yds?: string;
      hjfs?: string;
      jsxd?: string;
      ksft?: string;
      gtts?: string;
    }
    interface HSZDetail {
      iTime?: string;
      iNum?: string;
      dPrice?: string;
      dVol?: string;
    }
    interface HSZFY {
      shtSetcode?: string;
      sCode?: string;
      sName?: string;
      fPrice?: string;
      fChg?: string;
      iNum?: string;
      vol?: string;
      value?: string;
      vDetail?: Array<HSZDetail>;
    }
    interface DxjlUnit {
      iCount?: string;
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
      iTradeDate?: string;
      iBegTime?: string;
      iEndTime?: string;
    }
    interface HTradePeriodTime {
      vPeriod?: Array<HTradeTime>;
      mPeriod?: Record<short, Array<HTradeTime>>;
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
      VolBase?: string;
      precise?: string;
      Close?: string;
      Market?: string;
      BaseFreshCount?: string;
      GbbqFreshCount?: string;
      iType?: string;
    }
    enum E_ORDER_ITEM_TYPE {
      E_ORDER_ITEM_NO,
      E_ORDER_ITEM_TRADE,
      E_ORDER_ITEM_CANCEL,
      E_ORDER_ITEM_BIG,
      E_ORDER_ITEM_ADD,
      E_ORDER_ITEM_PARTTRADE,
    }
    enum E_ORDER_OPERATE_TYPE {
      E_BUY_ORDER,
      E_SELL_ORDER,
      E_CANCAL_ORDER,
    }
    enum E_ORDER_TRADE_KINDE {
      E_ORDER_MARKET_PRICE,
      E_ORDER_FIXED_PRICE,
      E_ORDER_BEST_SCHEME,
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
      E_ZH_RANK_UP,
      E_ZH_RANK_DROP,
      E_ZH_RANK_SPEED_TOP,
      E_ZH_RANK_SPEED_LAST,
      E_ZH_RANK_WEIBI_TOP,
      E_ZH_RANK_WEIBI_LAST,
      E_ZH_RANK_LIANGBI,
      E_ZH_RANK_AMOUNT,
      E_ZH_RANK_ZHENFU,
      E_ZH_RANK_ALL,
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
      iUpNum?: string;
      iEqualNum?: string;
      iDownNum?: string;
      vStock?: Array<HStockRankData>;
    }
    interface HDDZData {
      stMfAmt?: HTolMoneyFlow;
      stMfVol?: HTolMoneyFlow;
      stMfNum?: HTolMoneyFlow;
      iTime?: string;
    }
    enum E_MARKET_TYPE {
      E_TYPE_SZ_AB,
      E_TYPE_SH_AB,
      E_TYPE_BK_ZS,
      E_TYPE_NONE,
    }
    interface HTypeStatusData {
      eType?: E_MARKET_TYPE;
      iStatus?: string;
    }
    interface HFileInfo {
      sFileName?: string;
      iPos?: string;
      sCheckSum?: string;
      iLen?: string;
      bCompress?: string;
    }
    interface HFileData {
      sFileName: string;
      bCompress?: string;
      bChg: string;
      vBuf?: Array<byte>;
      bRemain: string;
      sCheckSum?: string;
    }
    enum E_LOGIN_CLIENT_TYPE {
      EPC_LOGIN,
      EMOBILE_LOGIN,
      EWEB_LOGIN,
    }
    enum E_KICK_OUT_STATUS {
      E_NOT_KICK_OUT,
      E_DO_KICK_OUT,
    }
    enum E_KICK_OUT_REASON {
      E_KICK_REPEAT,
      E_KICK_OVERDUE,
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
      bAllowRepeatLogin?: string;
    }
    enum E_LOGIN_AUTH_TYPE {
      E_LOGIN_AUTH_SZ_SH,
      E_LOGIN_AUTH_HK_US,
      E_LOGIN_AUTH_LST,
      E_LOGIN_AUTH_XW,
      E_LOGIN_AUTH_AC,
      E_LOGIN_AUTH_CLS,
      E_LOGIN_AUTH_GNN,
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
      iZtNDay?: string;
      bBreakPlate?: string;
      sListDate?: string;
    }
    interface HRadarQt {
      iMarket?: string;
      sCode?: string;
      stQt?: RadarData.RadarQt;
    }
    interface HRadarChg {
      iMarket?: string;
      sCode?: string;
      stChg?: RadarData.RadarChg;
    }
    interface HSyntInfo {
      iMarket?: string;
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
      intVol500?: string;
      intVol1000?: string;
      intVol5000?: string;
      intVol9999?: string;
      intAmt100?: string;
      intAmt200?: string;
      intAmt500?: string;
      dMainBuy3?: string;
      dMainBuy5?: string;
      dMainBuy10?: string;
      iMainBuyRedDay?: string;
      iMainBuyRedDay5?: string;
      iMainBuyRedDay10?: string;
      fDDX3?: string;
      fDDX5?: string;
      fDDX10?: string;
      iDDXRedDay?: string;
      iDDXRedDay5?: string;
      iDDXRedDay10?: string;
      fMainFlowTrend?: string;
    }
    interface HPankouRadio {
      iOrderLevel?: string;
      dPrice?: string;
      dVolume?: string;
    }
    enum E_HK_WARRANT_TYPE {
      E_HWT_NONE,
      E_HWT_WL,
      E_HWT_NX,
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