declare global {
  namespace ATG {
    interface UserBaseInfo {
      userCode: string;
      userName?: string;
      secuAccSHA?: string;
      secuAccSZA?: string;
      createDate?: string;
      lastLoginDate?: string;
      lastLoginTime?: string;
      lastLoginMac?: string;
      lastLoginIp?: string;
      beginDateTime?: string;
      endDateTime?: string;
      stopProfitRate?: string;
      stopLossRate?: string;
      beginFund?: string;
      tmpEndDate?: string;
      userIDCls?: number;
      bussId?: number;
      accountType?: number;
      kind?: string;
      riskUserType?: number;
      tempId?: number;
      stcID?: string;
      masterId?: string;
      secuAcc?: string;
    }
    interface DataBaseInfo {
      sUserId?: string;
      iUserCode?: number;
      iBussId?: number;
      iUserType?: number;
      sClientType?: string;
    }
    interface FundInfo {
      available: string;
      trdFrz: string;
      balance: string;
      stkValue?: string;
      sumAsset?: string;
      currency?: string;
      isCloseOut?: string;
      yestdaySumAsset?: string;
      initAsset?: string;
      usedBailBalance?: string;
      todayCloseBalance?: string;
      openingBalance?: string;
      risk?: string;
      dayProfit?: string;
      hisCloseBalance?: string;
    }
    enum EStockType {
      E_ST_STOCK = 0,
      E_ST_FUND = 1,
      E_ST_QZ = 2,
      E_ST_GZ = 3,
      E_ST_ZQ = 4,
      E_ST_ZZ = 5,
      E_ST_HG = 6,
      E_ST_B = 7,
      E_ST_OTHER = 8,
      E_ST_KCB = 9,
      E_ST_QQ = 10,
      E_ST_GGT = 11,
      E_ST_QH = 12,
    }
    enum EAccountType {
      E_DEFAULT_ACCOUNT = 0,
      E_CREDIT_ACCOUNT = 1,
      E_OPTION_ACCOUNT = 2,
      E_FUTURE_ACCOUNT = 3,
      E_HS_ACCOUNT = 4,
      E_HK_ACCOUNT = 5,
      E_US_ACCOUNT = 6,
    }
    interface HoldInfo {
      market: string;
      secuCode: string;
      secuName: string;
      shareAvl: string;
      shareTrdFrz: string;
      shareBln: string;
      costPrice?: string;
      currentPrice?: string;
      currentCost?: string;
      floatProfit?: string;
      mktVal?: string;
      secuAcc?: string;
      isShow?: string;
      stockType?: EStockType;
      YestPrice?: string;
      ShareOtd?: number;
      RealHoldMargin?: string;
      OptHoldType?: string;
      InitHoldMargin?: string;
      dayProfit?: string;
      yesProfit?: string;
      shareDay?: string;
      shareAvlDay?: string;
      expirMonth?: string;
      subType?: string;
      createDate?: string;
      vecTradeData?: Array<string>;
      settlePriceLowerCount?: string;
      buySumCount?: string;
    }
    interface OrderInfo {
      market: string;
      secuCode: string;
      secuName: string;
      trdID: string;
      price: string;
      qty: string;
      isWithdraw?: string;
      orderDate?: string;
      orderFrzAmt?: string;
      matchedQty?: string;
      matchedAmt?: string;
      withDrawn?: string;
      orderID?: string;
      secuAcc?: string;
      trdDate?: string;
      stockType?: EStockType;
      way?: number;
      OrderAmount?: string;
      opRemark?: string;
      iBussId?: number;
      OptionOC?: string;
      OrderProp?: string;
      ContractMutiplierUnit?: number;
      subType?: string;
      property?: string;
    }
    interface TradeInfo {
      market: string;
      secuName: string;
      secuCode: string;
      trdID: string;
      matchedPrice: string;
      matchedQty: string;
      matchedAmt: string;
      matchedSn: string;
      matchedTime?: string;
      orderID?: string;
      trdDate?: string;
      secuAcc?: string;
      orderDate?: string;
      stockType?: EStockType;
      beforeHoldValue?: string;
      beforeFund?: string;
      afterHoldValue?: string;
      afterFund?: string;
      opRemark?: string;
      OptMargin?: string;
      OptionOC?: string;
      HandlingFee?: string;
      winOrLose?: string;
      subType?: string;
      property?: string;
    }
    interface FlowInfo {
      secuName: string;
      secuCode: string;
      serialNo: string;
      balance: string;
      matchedPrice: string;
      matchedQty: string;
      cptlAmt: string;
      occurDate: string;
      secuAcc?: string;
      bizCode?: string;
      way?: number;
      flowType?: string;
    }
    interface User_Cache_Key {
      userCode: string;
    }
    interface UserIndex_DCache_Value {
      dateList: Array<string>;
    }
    interface DataOnTheWay {
      date?: number;
      market?: string;
      stockCode?: string;
      buyAmount?: string;
      buyBalance?: string;
      sellAmount?: string;
      sellBalance?: string;
      orderId?: string;
      trdId?: string;
      secuAcc?: string;
      orderDate?: string;
      way?: number;
      matchFlag?: number;
      settleFlag?: number;
    }
    interface UserCore_DCache_Value {
      base: UserBaseInfo;
      fund: FundInfo;
      holds?: Array<HoldInfo>;
      orders?: Record<string, OrderInfo>;
      trades?: Array<TradeInfo>;
      flows?: Array<FlowInfo>;
      isSettled?: string;
      isDividend?: string;
      holding?: Record<string, Array<DataOnTheWay>>;
      limit?: string;
      curAction?: string;
      holdCountSum?: number;
      holdDaySum?: number;
      monthTradeSum?: number;
    }
    interface entrustRBTreeKey {
      stockCode: string;
      trdID: string;
      orderPrice: string;
      orderID: string;
    }
    interface entrustRBTreeValue {
      userCode: string;
      iBusid?: number;
      entNo?: string;
      trdID?: string;
      orderPrice: string;
      stockCode: string;
    }
    interface ErrorInfo {
      errorCode: number;
      errorInfo?: string;
    }
    interface QuoteInfo {
      market?: string;
      stockCode?: string;
      bipPrice1?: string;
      askPrice1?: string;
      lastPrice?: string;
      volume?: string;
      ztPrice?: string;
      dtPrice?: string;
      hqTime?: string;
      stockName?: string;
      yestPrice?: string;
    }
    interface QuoteHKInfo {
      market?: string;
      stockCode?: string;
      bidPice1?: string;
      askPrice1?: string;
      lastPrice?: string;
      volume?: string;
      ztPrice?: string;
      dtPrice?: string;
      hqDate?: string;
      hqTime?: string;
      stockName?: string;
      lastClosePrice?: string;
      bidPice10?: string;
      unit?: number;
    }
    interface optionInfo {
      sName?: string;
      sUnderlyingCode?: string;
      sUnerlyingName?: string;
      sContractID?: string;
      eUnderlingType?: number;
      cOptionType?: string;
      cCallOrPut?: string;
      iContractMutiplierUnit?: number;
      dExercisePrice?: string;
      dPreClose?: string;
      dPreSettlPrice?: string;
      dUnderlyingPreClose?: string;
      dMarginUnit?: string;
      fMarginRatioParam1?: string;
      fMarginRatioParam2?: string;
    }
    interface JceQuote {
      quotes: Array<QuoteInfo>;
    }
    interface BatchQuoteReq {
      quoteReq: Array<string>;
    }
    interface BatchQuoteRsp {
      error: ErrorInfo;
      quoteRsp: Record<string, QuoteInfo>;
    }
    interface OrderSubmitReq {
      userCode?: number;
      userIDCls?: number;
      market?: string;
      secuAcc?: string;
      account?: string;
      seat?: string;
      secuCode?: string;
      trdID?: string;
      price?: string;
      qty?: number;
      bizNo?: string;
      extInst?: number;
      extRecNum?: number;
      opRemark?: string;
      matchSeat?: string;
      matchNum?: number;
      secuName?: string;
      property?: string;
      entrustType?: string;
      clientType?: number;
      OrderAmount?: string;
      OptionOC?: string;
      OrderProp?: string;
      bussId?: number;
    }
    interface OrderSubmitRsp {
      error: ErrorInfo;
      bizNo?: string;
      orderID?: string;
      account?: string;
      price?: string;
      qty?: number;
      orderAmt?: string;
      orderFrzAmt?: string;
      seat?: string;
      extInst?: number;
      extAcc?: string;
      extSubAcc?: string;
      extFrzAmt?: string;
      assertId?: number;
      secuCode?: string;
      secuName?: string;
      trdID?: string;
      matchDateTime?: string;
      matchedPrice?: string;
      matchedQty?: string;
      matchedSn?: string;
    }
    interface OrderCancelReq {
      userCode?: number;
      userIDCls?: number;
      recordNo?: number;
      market?: string;
      secuAcc?: string;
      account?: string;
      seat?: string;
      secuCode?: string;
      trdID?: string;
      price?: string;
      qty?: number;
      expiryDateTime?: string;
      bussId?: number;
    }
    interface OrderCancelRsp {
      error: ErrorInfo;
      recordNo?: number;
    }
    interface TradeBaseParamKey {
      iBusId: string;
      iUserType?: string;
    }
    interface TradeBaseParamValue {
      iInitAssert: string;
      nHoldPosition: string;
      iLimited: string;
      mapKind: Record<string, boolean>;
    }
    interface TradeBaseParamInfo {
      mapTradeBaseParamInfo: Map<TradeBaseParamKey, TradeBaseParamValue>;
    }
    interface TradeRateParamKey {
      iKind?: string;
      iType?: string;
      iBussId?: number;
    }
    interface TradeRateParamValue {
      nMoneyRate?: string;
      nQtyRate?: string;
      nFixedFee?: string;
      nMinFee?: string;
    }
    interface TradeRateParamInfo {
      mapTradeRateParamInfo: Map<TradeRateParamKey, TradeRateParamValue>;
    }
    interface PubInfo {
      opStation?: string;
      clientType?: number;
      aesPwd?: string;
    }
    interface CustNode {
      userID: string;
      userIDCls?: number;
      mUserNode: Record<string, Array<number>>;
    }
    interface BussList {
      vList: Array<number>;
    }
    interface UserLoginReq {
      userID: string;
      userIDCls?: number;
      userCode?: number;
      beginDateTime?: string;
      beginFund?: string;
      endDateTime?: string;
      stopProfitRate?: string;
      stopLossRate?: string;
      accountType?: number;
      mac?: string;
      clientVersion?: string;
      sGuid?: string;
      mExt?: Record<string, string>;
      bussId?: number;
      loginType?: number;
      riskUserType?: number;
      tempId?: number;
    }
    interface UserLoginReqEx {
      data?: UserLoginReq;
      aeskey?: PubInfo;
    }
    interface UserLoginInfo {
      market?: string;
      secuAcc?: string;
      secuAccName?: string;
      account?: string;
      userCode?: number;
      userName?: string;
      branch?: number;
      masterId?: string;
    }
    interface UserLoginRsp {
      error: ErrorInfo;
      session?: string;
      userList?: Array<UserLoginInfo>;
      lastLoginDate?: string;
      lastLoginTime?: string;
      lastLoginMac?: string;
      lastLoginIp?: string;
      mExt?: Record<string, string>;
    }
    interface MoneyQueryReq {
      userCode?: number;
      userIDCls?: number;
      account?: string;
      currency?: string;
    }
    interface AllMoneyQueryReq {
      userList?: Array<UserLoginInfo>;
      currency?: string;
    }
    interface MoneyQueryRsp {
      error: ErrorInfo;
      userCode?: number;
      account?: string;
      branch?: number;
      currency?: string;
      balance?: string;
      available?: string;
      frozen?: string;
      trdFrz?: string;
      drawAvlCash?: string;
      drawAvlCheque?: string;
      transferAvl?: string;
      outStanding?: string;
      otdAul?: string;
      crAmt?: string;
      drAmt?: string;
      interest?: string;
      intMax?: string;
      stkVal?: string;
      sumAst?: string;
      todayFlowProfit?: string;
      RiskDegree?: string;
    }
    interface TradeMaxNumReq {
      userCode?: number;
      userIDCls?: number;
      market?: string;
      secuAcc?: string;
      account?: string;
      secuCode?: string;
      trdID?: string;
      price?: string;
      extInst?: number;
      bussId?: number;
      OptionOC?: string;
      OrderProp?: string;
    }
    interface TradeMaxNumRsp {
      error: ErrorInfo;
      maxQty?: number;
    }
    interface MoneyFlowQueryReq {
      userCode?: number;
      userIDCls?: number;
      beginDate?: string;
      endDate?: string;
      account?: string;
      currency?: string;
      requestNum?: number;
      positionStr?: string;
    }
    interface MoneyFlowQueryInfo {
      settDate: string;
      occurDate?: string;
      bizNo?: string;
      serialNo?: string;
      userCode?: number;
      userName?: string;
      account?: string;
      currency?: string;
      branch?: number;
      extInst?: number;
      bizCode?: number;
      cptlAmt?: string;
      balance?: string;
      isCheck?: boolean;
      agent?: number;
      agentName?: string;
      cancelFlag?: number;
      remark?: string;
      bizCodeName?: string;
      secuAcc?: string;
      secuName?: string;
      secuCode?: string;
      matchedPrice?: string;
      matchedQty?: number;
      positionStr?: string;
    }
    interface MoneyFlowQueryRsp {
      error: ErrorInfo;
      vList?: Array<MoneyFlowQueryInfo>;
    }
    interface HoldingQueryReq {
      userCode?: number;
      userIDCls?: number;
      account?: string;
      market?: string;
      secuAcc?: string;
      secuCode?: string;
      extInst?: number;
    }
    interface AllHoldingQueryReq {
      userList?: Array<UserLoginInfo>;
    }
    interface HoldingQueryInfo {
      userCode: number;
      account?: string;
      market?: string;
      secuName?: string;
      secuCode?: string;
      SecuIntl?: number;
      seat?: string;
      branch?: number;
      extInst?: number;
      currency?: string;
      shareBln?: number;
      shareAvl?: number;
      shareTrdFrz?: number;
      shareOtd?: number;
      shareFrz?: number;
      shareUntradeqty?: number;
      currentCost?: string;
      mktVal?: string;
      costPrice?: string;
      shareOtdAvl?: number;
      currentPrice?: string;
      cost2Price?: string;
      mktQty?: number;
      floatProfit?: string;
      secuAcc?: string;
      stockType?: EStockType;
      subType?: string;
    }
    interface HoldingQueryRsp {
      error: ErrorInfo;
      vList?: Array<HoldingQueryInfo>;
    }
    interface OrderQueryReq {
      userCode?: number;
      userIDCls?: number;
      beginDate?: string;
      endDate?: string;
      getOrdersMode?: string;
      market?: string;
      secuAcc?: string;
      secuCode?: string;
      trdID?: string;
      bizNo?: string;
      orderID?: string;
      branch?: number;
      account?: string;
      extInst?: number;
      actionIn?: number;
      requestNum?: number;
      positionStr?: string;
    }
    interface OrderQueryInfo {
      orderDate: string;
      trdDate?: string;
      userCode?: number;
      userName?: string;
      account?: string;
      currency?: string;
      branch?: number;
      secuAcc?: string;
      secuAccName?: string;
      trdID?: string;
      bizNo?: string;
      orderID?: string;
      market?: string;
      secuName?: string;
      secuCode?: string;
      seat?: string;
      price?: string;
      qty?: number;
      orderAmt?: string;
      orderFrzAmt?: string;
      available?: string;
      shareAvl?: number;
      isWithdraw?: string;
      isWithdrawn?: string;
      canWithdraw?: string;
      dclFlag?: string;
      dclTime?: string;
      validFlag?: string;
      matchedQty?: number;
      withDrawn?: number;
      matchedAmt?: string;
      rltSettAmt?: string;
      opRemark?: string;
      initiator?: string;
      extInst?: number;
      extAcc?: string;
      extSubAcc?: string;
      extFrzAmt?: string;
      extRecNum?: number;
      extSettAmt?: string;
      extBizNo?: string;
      extorderID?: string;
      matchedPrice?: string;
      positionStr?: string;
      stockType?: EStockType;
      subType?: string;
      property?: string;
    }
    interface OrderQueryRsp {
      error: ErrorInfo;
      vList?: Array<OrderQueryInfo>;
    }
    interface TradeQueryReq {
      userCode?: number;
      userIDCls?: number;
      beginDate?: string;
      endDate?: string;
      market?: string;
      secuAcc?: string;
      secuCode?: string;
      trdID?: string;
      orderID?: string;
      branch?: number;
      account?: string;
      extInst?: number;
      requestNum?: number;
      positionStr?: string;
    }
    interface TradeQueryInfo {
      orderDate: string;
      trdDate?: string;
      userCode?: number;
      userName?: string;
      account?: string;
      currency?: string;
      branch?: number;
      secuAcc?: string;
      secuAccName?: string;
      trdID?: string;
      orderID?: string;
      market?: string;
      secuName?: string;
      secuCode?: string;
      seat?: string;
      price?: string;
      qty?: number;
      orderAmt?: string;
      orderFrzAmt?: string;
      available?: string;
      shareAvl?: number;
      isWithdraw?: string;
      dclTime?: string;
      matchedTime?: string;
      matchedSn?: string;
      matchedPrice?: string;
      matchedQty?: number;
      matchedAmt?: string;
      rltSettAmt?: string;
      opRemark?: string;
      initiator?: string;
      extInst?: number;
      extAcc?: string;
      extSubAcc?: string;
      extFrzAmt?: string;
      extRecNum?: number;
      extSettAmt?: string;
      positionStr?: string;
      stockType?: EStockType;
      beforeFund?: string;
      beforeHoldValue?: string;
      afterFund?: string;
      afterHoldValue?: string;
      HandlingFee?: string;
      winOrLose?: string;
      subType?: string;
      property?: string;
    }
    interface TradeQueryRsp {
      error: ErrorInfo;
      vList?: Array<TradeQueryInfo>;
    }
    interface AllTradeQueryReq {
      vUserCode?: Array<number>;
      beginDate: string;
      endDate: string;
      secuCode?: string;
      trdID?: string;
      requestNum?: number;
      position?: number;
    }
    interface AllTradeQueryRsp {
      error: ErrorInfo;
      vList?: Array<TradeQueryInfo>;
      position?: number;
      totalNum?: number;
    }
    interface SecAccountQueryReq {
      userCode: number;
      userIDCls?: number;
      userName?: string;
    }
    interface SecAccountQueryInfo {
      error: ErrorInfo;
      secuAccSHA?: string;
      secuAccSZA?: string;
      secuAccName?: string;
    }
    interface SecAccountQueryRsp {
      error: ErrorInfo;
      vList?: Array<SecAccountQueryInfo>;
    }
    interface QueryUserTradeInfoReq {
      userCode?: string;
    }
    interface QueryUserTradeInfoRsp {
      error?: ErrorInfo;
      createDate?: string;
      lastLoginDate?: string;
      lastTradeDate?: string;
      firstTradeDate?: string;
    }
    interface HqData {
      shMarketNo?: string;
      sStockCode?: string;
      fOpen?: string;
      fHigh?: string;
      fLow?: string;
      fClose?: string;
      fAmount?: string;
      lVolume?: string;
      dSettlementPrice?: string;
    }
    interface HqDataPackage {
      vHqData?: Array<HqData>;
    }
    interface TradeTime {
      iTradeBeginTime: number;
      iTradeEndTime: number;
    }
    interface FutureAttr {
      iMarket?: number;
      iSxfType?: number;
      sFutureName?: string;
      nDeposit?: string;
      nOpenSxf?: string;
      nCloseSxf?: string;
      nCloseTodaySxf?: string;
      nOpenSxfRate?: string;
      nClostSxfRate?: string;
      nClostTodaySxfRate?: string;
      nUnit?: string;
      vTradeTime?: Array<TradeTime>;
    }
    interface FutureMap {
      mapFutureConfig?: Record<string, FutureAttr>;
    }
    interface AllotmentInfo {
      userInfo?: DataBaseInfo;
      stockCode?: string;
      curDate?: string;
      price?: string;
      shareAmounts?: string;
      isSucess?: string;
      tradeAmounts?: string;
      market?: string;
      secuName?: string;
      endDate?: string;
    }
    interface Allotment_DCache_Value {
      vecAllotments?: Array<AllotmentInfo>;
    }
    interface OrderAllotmentStockReq {
      userCode: number;
      secuCode?: string;
      curDate?: string;
      bussId: number;
      market?: string;
    }
    interface OrderAllotmentStockRsp {
      error: ErrorInfo;
    }
    interface QueryAllotmentInfoReq {
      userCode: number;
    }
    interface QueryAllotmentInfoRsp {
      error: ErrorInfo;
      vList?: Array<AllotmentInfo>;
    }
    interface HoldClean {
      stockType: string;
      createCostPrice?: string;
      createDate?: string;
      cleanCostPrice?: string;
      cleanDate?: string;
      profitRate?: string;
      qty?: string;
      vecTradeData?: Array<string>;
    }
    interface HoldCleanInfo {
      mapHoldClean?: Record<string, HoldClean>;
    }
    interface QueryHoldCleanReq {
      userCode: number;
    }
    interface QueryHoldCleanRsp {
      error: ErrorInfo;
      vList?: Record<string, HoldClean>;
    }
    interface QueryHoldCleanDetailReq {
      userCode: number;
      vecTradeIndex?: Array<string>;
    }
    interface QueryHoldCleanDetailRsp {
      error: ErrorInfo;
      vList?: Array<TradeQueryInfo>;
    }
    interface DividendInfo {
      uid?: string;
      stockCode?: string;
      stockName?: string;
      ChagShares?: number;
      ChgMoney?: string;
      CorreTax?: string;
      beforeFundAvl?: string;
      afterFundAvl?: string;
      beforShareAvl?: string;
      afterShareAvl?: string;
      beforCostPrice?: string;
      afterCostPrice?: string;
      divedendDate?: string;
      stockType?: EStockType;
    }
    interface QueryDividendHisInfoReq {
      userCode: number;
      date?: string;
      ext?: string;
    }
    interface QueryDividendHisInfoRsp {
      error: ErrorInfo;
      vList?: Array<DividendInfo>;
    }
    interface RiskCalcEventInfo {
      userId?: string;
      userCode?: string;
      accountType?: number;
      bussId?: number;
    }
    interface RiskSettingBaseInfo {
      desc: string;
      range: number;
      direction: number;
      dim: number;
    }
    interface RiskThresholdInfo {
      threshold: string;
      action: number;
    }
    interface RiskSettingInfo {
      id: string;
      userId?: string;
      base: RiskSettingBaseInfo;
      threshold: Array<RiskThresholdInfo>;
      isActive: boolean;
      createTime?: string;
      updateTime?: string;
    }
    interface UserRiskEventInfo {
      id?: string;
      clientId?: string;
      threshold?: string;
      deposit?: string;
      mktVal?: string;
      availableFund?: string;
      frozenAmt?: string;
      interestWithheld?: string;
      netAsset?: string;
      riskType?: number;
      riskId?: string;
      curValue?: string;
      riskStatus?: number;
      clientName?: string;
      limitStatus?: number;
    }
    enum EAmndsStatus {
      E_AMN_UNOPEN = 0,
      E_AMN_SIGNUP = 1,
      E_AMN_GAMING = 2,
      E_AMN_GAMEENDS = 3,
      E_AMN_GAMECLEAR = 4,
    }
    enum EFutureRiskType {
      E_FMT_FXD = 0,
      E_FMT_DQ = 1,
    }
    interface FutureRiskInfo {
      iUserCode?: number;
      eRiskType?: EFutureRiskType;
      sCode?: string;
    }
    interface FutureRisk {
      vFutureRiskInfo?: Record<number, Array<FutureRiskInfo>>;
    }
    interface GGTMarketRate_Comm {
      dSettlementBuy?: string;
      dSettlementSell?: string;
      dReferenceBuy?: string;
      dReferenceSell?: string;
    }
    interface GGTRate_Comm {
      shRate?: GGTMarketRate_Comm;
      szRate?: GGTMarketRate_Comm;
    }
    interface SGGTRateInfo {
      mapRate?: Record<number, GGTRate_Comm>;
    }
    interface AutoOrder_DCache_Value {
      vOrderReq: Array<OrderSubmitReq>;
    }
    interface MaxDrawUserData {
      curDate?: number;
      drawDown?: string;
    }
    interface MaxDrawUserInfo {
      mapMaxDraw?: Record<number, MaxDrawUserData>;
    }
    interface UserLossInfo {
      mapLossRate?: Record<number, string>;
    }
    interface CheckAssertIsHasDataReq {
      userCode?: string;
    }
    interface CheckAssertIsHasDataRsp {
      error: ErrorInfo;
    }
    interface CopyNewAssertReq {
      oldUserCode?: string;
      oldBussId?: number;
      newUserCode?: string;
      newBussId?: number;
    }
    interface CopyNewAssertRsp {
      error: ErrorInfo;
    }
    interface AccountBaseInfo {
      type: EAccountType;
      beginFund?: string;
      beginDate?: string;
      endDate?: string;
    }
    enum EAuthType {
      E_DEFALUT_USER_REG = 0,
      E_DEFAULT_USER_LOGIN = 1,
      E_GAME_USER_REG = 2,
      E_GAME_USER_LOGIN = 3,
    }
    interface doUserAuthReq {
      userId: string;
      loginType: EAuthType;
      vAccount?: Array<AccountBaseInfo>;
      stcId?: string;
      bussId?: number;
      clientVersion?: string;
      guid?: string;
      phoneNum?: string;
      mac?: string;
      sip?: string;
      ext?: string;
    }
    interface doUserAuthRsp {
      error: ErrorInfo;
      userList?: Array<UserLoginInfo>;
      ext?: string;
    }
    interface TradeFeeDetailInfo {
      stockType: EStockType;
      commissionRate?: string;
      stampDutyRate?: string;
      tradeRegulaRate?: string;
      TransferRate?: string;
      minFee?: string;
    }
    enum E_FEE_OPREATE_TYPE {
      E_FEE_ADD = 0,
      E_FEE_MODIFY = 1,
      E_FEE_QUERY = 2,
      E_FEE_DEL = 3,
    }
    interface TradeFeeOperateReq {
      type: E_FEE_OPREATE_TYPE;
      vInfo?: Array<TradeFeeDetailInfo>;
      bussId?: number;
      ext?: string;
    }
    interface TradeFeeOperateRsp {
      error: ErrorInfo;
      vInfo?: Array<TradeFeeDetailInfo>;
    }
    enum E_TRADE_MATCH_TYPE {
      E_GENERAL_MATCH = 0,
      E_VWAP_MATCH = 1,
      E_TWAP_MATCH = 2,
    }
    interface SimluatedTradeCompetInfo {
      /** 标识 */
      ID: string;
      startDate?: string;
      endDate?: string;
      matchType?: E_TRADE_MATCH_TYPE;
      createTime?: string;
    }
    enum E_STC_OPREATE_TYPE {
      E_STC_CREATE = 0,
      E_STC_STOP = 1,
      E_STC_CLEAR = 2,
    }
    interface STCInfoOperateReq {
      type: E_STC_OPREATE_TYPE;
      info?: SimluatedTradeCompetInfo;
      ext?: string;
    }
    interface STCInfoOperateRsp {
      error: ErrorInfo;
    }
  }
}
export { };