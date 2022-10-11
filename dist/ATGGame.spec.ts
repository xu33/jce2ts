declare global {
  namespace ATG {
    interface WinRateInfo {
      win?: string;
      loss?: string;
      draw?: string;
      totalwin?: string;
      totalloss?: string;
      totaldraw?: string;
      winRate?: string;
      lossRate?: string;
      drawRate?: string;
    }
    interface RankItem {
      userCode?: string;
      profitrate?: string;
      rank?: string;
      rankrise?: number;
      type?: number;
    }
    interface RankDetail {
      mRankDetail: Record<number, RankItem>;
    }
    enum RankType {
      ERT_DAY_PROFITRATE = 0,
      ERT_WEEK_PROFITRATE = 1,
      ERT_MONTH_PROFITRATE = 2,
      ERT_TOTAL_PROFITRATE = 3,
      ERT_UP_LIMIT = 4,
      ERT_WIN_RATE = 5,
      ERT_SEASON_PROFITRATE = 6,
      ERT_YEAR_PROFITRATE = 7,
    }
    interface ProfitInfo {
      totalValue?: string;
      totalMktValue?: string;
      todayProfitValue?: string;
      avalValue?: string;
      floatProfitValue?: string;
      totalProfit?: string;
      beginFund?: string;
      lastDaySumValue?: string;
      lastWeekSumValue?: string;
      lastMonthSumValue?: string;
      lastSeasonSumValue?: string;
      lastYearSumValue?: string;
      lastNatureYearSumValue?: string;
    }
    interface ProfitRateRankInfo {
      userInfo?: DataBaseInfo;
      updateTime?: string;
      totalValue?: string;
      totalMktValue?: string;
      dayProfitRate?: string;
      weekProfitRate?: string;
      monthProfitRate?: string;
      avalValue?: string;
      floatProfitValue?: string;
      floatProfitRate?: string;
      totalProfitRate?: string;
      totalProfit?: string;
      currentNetValue?: string;
      maxNetValue?: string;
      holdpos?: string;
      todayProfitValue?: string;
      totalProfitNum?: string;
      winRateInfo?: WinRateInfo;
      rank?: RankDetail;
      totalNum?: string;
      maxRetracement?: string;
      upLimitCount?: number;
      dayRetracement?: string;
      fiveDayAvgHoldpos?: string;
      curDate?: number;
      seasonProfitRate?: string;
      yearProfitRate?: string;
      yearMaxDrawDown?: string;
      yearMaxNetValue?: string;
      dailyHoldAvg?: string;
      currentMonthTrade?: string;
      natureYearProfitRate?: string;
      outperformValue?: string;
      bulkStockName?: string;
      monthTurnoverRate?: string;
      beginFund?: string;
    }
    interface QueryProfitRateQueryReq {
      userInfo?: DataBaseInfo;
      date?: string;
    }
    interface QueryProfitRateQueryRsp {
      error: ErrorInfo;
      stProfitRateRankInfo?: ProfitRateRankInfo;
    }
    interface MarketEndInfo {
      userInfo?: DataBaseInfo;
      date?: string;
      entrustType?: string;
      changeFundAvl?: string;
      changeShareAvl?: string;
      stockCode?: string;
    }
    interface QueryMarketEndReq {
      userInfo?: DataBaseInfo;
    }
    interface QueryMarketEndRsp {
      error: ErrorInfo;
      vList?: Array<MarketEndInfo>;
    }
    interface QueryUsersInfoReq {
      iUserCode?: number;
    }
    interface QueryUsersInfoRsp {
      error: ErrorInfo;
      vList?: Array<ProfitRateRankInfo>;
    }
    interface QueryHistoryProfitRateReq {
      userInfo?: DataBaseInfo;
      beginDate?: string;
      endDate?: string;
      len?: string;
      type?: string;
      format?: string;
    }
    interface HistoryProfitRateInfo {
      date?: string;
      profitRate?: string;
    }
    interface QueryHistoryProfitRateRsp {
      error?: ErrorInfo;
      vList?: Array<HistoryProfitRateInfo>;
    }
    interface QueryWinRateReq {
      userInfo?: DataBaseInfo;
      date?: string;
    }
    interface QueryWinRateRsp {
      error?: ErrorInfo;
      winRateInfo?: WinRateInfo;
    }
    interface QueryHoldCountReq {
      userInfo?: DataBaseInfo;
      secuCode?: string;
      date?: string;
    }
    interface QueryHoldCountRsp {
      error?: ErrorInfo;
      count?: number;
    }
    interface QueryTradeDateReq {
      userInfo?: DataBaseInfo;
      format?: number;
    }
    interface QueryTradeDateRsp {
      error?: ErrorInfo;
      beginDate?: string;
      maxDate?: string;
    }
    interface QueryHoldUserCountReq {
      userInfo?: DataBaseInfo;
      date?: string;
      topLen?: number;
      type?: number;
    }
    interface HoldUserCountInfo {
      market?: string;
      secuName?: string;
      secuCode?: string;
      count?: number;
    }
    interface QueryHoldUserCountRsp {
      error?: ErrorInfo;
      vList?: Array<HoldUserCountInfo>;
    }
    interface QueryStockBuySellTimesReq {
      userInfo?: DataBaseInfo;
      trdId?: string;
      date?: string;
      topLen?: number;
    }
    interface StockBuySellTimesInfo {
      market?: string;
      secuName?: string;
      secuCode?: string;
      count?: number;
    }
    interface QueryStockBuySellTimesRsp {
      error?: ErrorInfo;
      vList?: Array<StockBuySellTimesInfo>;
    }
    interface BatchQueryProfitRateReq {
      vDataBases?: Array<DataBaseInfo>;
      date?: string;
    }
    interface BatchQueryProfitRateRsp {
      error?: ErrorInfo;
      vList?: Array<ProfitRateRankInfo>;
    }
    interface QueryStockTradeReq {
      userInfo?: DataBaseInfo;
      market?: string;
      secuCode?: string;
      vDate?: Array<string>;
    }
    interface StockTradeInfo {
      trdId?: string;
      matchPrice?: string;
      matchQty?: number;
      Date?: string;
      matchTime?: string;
    }
    interface QueryStockTradeRsp {
      error?: ErrorInfo;
      vList?: Array<StockTradeInfo>;
    }
    interface QueryProfitRateRankReq {
      userInfo?: DataBaseInfo;
      eType?: RankType;
      topLen?: number;
      onlineType?: number;
    }
    interface QueryProfitRateRankRsp {
      error?: ErrorInfo;
      vList?: Array<ProfitRateRankInfo>;
    }
    interface BatchQueryProfitRankRateReq {
      userInfo?: DataBaseInfo;
      vUserCodes?: Array<string>;
      eType?: RankType;
    }
    interface BatchQueryProfitRankRateRsp {
      error?: ErrorInfo;
      mapRanks?: Record<number, Record<string, ProfitRateRankInfo>>;
    }
    interface QueryUserGameTimesReq {
      userInfo?: DataBaseInfo;
      week?: number;
      month?: number;
      seasonMonths?: Array<number>;
      halfYearMonths?: Array<number>;
    }
    interface QueryUserGameTimesRsp {
      error?: ErrorInfo;
      weekTimes?: number;
      monthTimes?: number;
      seasonTimes?: number;
      halfYearTimes?: number;
    }
    interface QueryHistoryDrawDownQueryReq {
      userInfo?: DataBaseInfo;
      beginDate?: string;
      endDate?: string;
      len?: string;
      type?: string;
    }
    interface HistoryDrawDownInfo {
      date?: string;
      drawdown?: string;
      netValue?: string;
      win?: number;
      loss?: number;
      draw?: number;
      profitRate?: string;
    }
    interface QueryHistoryDrawDownQueryRsp {
      error: ErrorInfo;
      vList?: Array<HistoryDrawDownInfo>;
    }
    interface QueryHistoryHoldPosQueryReq {
      userInfo?: DataBaseInfo;
      beginDate?: string;
      endDate?: string;
      len?: string;
      type?: string;
    }
    interface HistoryHoldPosInfo {
      date?: string;
      holdPos?: string;
      fiveDayAvgHoldPos?: string;
    }
    interface QueryHistoryHoldPosQueryRsp {
      error: ErrorInfo;
      vList?: Array<HistoryHoldPosInfo>;
    }
    interface QuerySpecialRateReq {
      userInfo?: DataBaseInfo;
      beginDate: string;
    }
    interface QuerySpecialRateRsp {
      error: ErrorInfo;
      nRates: string;
    }
    interface UserTmpKey {
      assertId?: string;
    }
    interface UserTmpData {
      maxnetvalue?: string;
      minnetvalue?: string;
      updatetime?: string;
      maxdrawdown?: string;
      yearMaxNetValue?: string;
      yearMinnetvalue?: string;
      yearMaxDraw?: string;
      natureYearMaxNetValue?: string;
      natureYearMinnetvalue?: string;
      natureYearMaxDraw?: string;
    }
    interface SqlTaskItemKey {
      assertId?: string;
      updatetime?: string;
      fun?: string;
    }
    interface SqlTaskItem {
      sql?: string;
      fun?: string;
      assertId?: string;
      iDate?: string;
      countType?: string;
      updatetime?: string;
      updateTotal?: boolean;
    }
    interface RankKey {
      sKey?: string;
    }
    interface RankInfo {
      mProfitRank?: Record<string, ProfitRateRankInfo>;
      updatetime?: string;
    }
    interface IntervalDerivedDataQueryReq {
      userCode: string;
      userIDCls?: string;
      beginDate: string;
      endDate: string;
    }
    interface IntervalDerivedDataQueryRsp {
      error: ErrorInfo;
      nRates: string;
      maxDrawdown: string;
      SuccessfulRate: string;
    }
    interface getUserMaxDrawDownReq {
      vUserCodeList?: Array<string>;
    }
    interface getUserMaxDrawDownRsp {
      error: ErrorInfo;
      mpMaxDraw?: Record<string, string>;
    }
    interface ATGGame {
      copyNewUser: (req: CopyNewAssertReq) => CopyNewAssertRsp;
      getUserMaxDrawDown: (req: getUserMaxDrawDownReq) => getUserMaxDrawDownRsp;
      doClearAmnds: (iAmnid: number) => void;
      notifyWinUpdate: (userInfo: DataBaseInfo, type: number) => void;
      queryIntervalDerivedData: (req: IntervalDerivedDataQueryReq) => IntervalDerivedDataQueryRsp;
      batchQueryProfitRate: (req: BatchQueryProfitRateReq) => BatchQueryProfitRateRsp;
      querySpecifiedTimesProfitrate: (req: QuerySpecialRateReq) => QuerySpecialRateRsp;
      queryHistoryHoldPos: (req: QueryHistoryHoldPosQueryReq) => QueryHistoryHoldPosQueryRsp;
      queryHistoryDrawDown: (req: QueryHistoryDrawDownQueryReq) => QueryHistoryDrawDownQueryRsp;
      queryProfitRateRank: (req: QueryProfitRateRankReq) => QueryProfitRateRankRsp;
      queryMarketEndInfo: (req: QueryMarketEndReq) => QueryMarketEndRsp;
      queryUsersInfo: (req: QueryUsersInfoReq) => QueryUsersInfoRsp;
      queryHistoryProfitRate: (req: QueryHistoryProfitRateReq) => QueryHistoryProfitRateRsp;
      queryDerivedProfitRate: (req: QueryProfitRateQueryReq) => QueryProfitRateQueryRsp;
    }
  }
}
export {};