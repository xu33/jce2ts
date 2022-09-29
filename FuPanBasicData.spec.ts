declare global {
  namespace FuPan {
    //股票信息
    interface StockInfo {
      shtSetcode?: string; //市场

      sCode?: string; //股票代码

    }
    //股票信息 精简版
    interface StkSimpInfo {
      iMarket?: string;
      sCode?: string;
      sName?: string;
    }
    enum E_STOCK_FILTER_TYPE {
      E_STOCK_ALL, //全部

      E_STOCK_FILTER_ST, //过滤ST

      E_STOCK_FILTER_NEWSTOCK, //过滤未开板新股

      E_STOCK_FILTER_ST_NEWSTOCK, //过滤ST跟未开板新股

    }
    enum E_STOCK_POOL_TYPE {
      E_STOCK_ZT_POOL, //涨停池

      E_STOCK_ONE_POOL, //一字板池

      E_STOCK_T_POOL, //T字板池

      E_STOCK_CHANGE_POOL, //换手板池

      E_STOCK_OPEN_POOL, //开板池 4

      E_STOCK_STRONG_POOL, //强势股池 5

      E_STOCK_COMP_POOL, //竞价试盘池 6

      E_STOCK_LASTZT_POOL, //昨日涨停池 7

      E_STOCK_DT_POOL, //跌停池 8

      E_STOCK_DT_OPEN_POOL, //跌停破板池 9

      E_STOCK_FANBAO_ZT_POOL, //反包涨停池 10

      E_STOCK_HIT_BOARD_POOL, //打板池 11

      E_STOCK_BARGAIN_HUNTING_POOL, //低吸池 12

      E_STOCK_POOL_TYPE_END, //结束符 无意义,用来遍历涨停类型

    }
    //涨停类型
    enum E_STOCK_ZT_TYPE {
      E_STOCK_ZT_UNKNOWN, //未知类型

      E_STOCK_COMP_ZT, //集合竞价涨停

      E_STOCK_ONE_BOARD, //一字板

      E_STOCK_T_BOARD, //T字板

      E_STOCK_CHANGE_BOARD, //换手板

      E_STOCK_OPEN_BOARD, //开板池

    }
    //板块类别
    enum E_BLOCK_CLASS_TYPE {
      E_BLOCK_INDUSTRY, //行业

      E_BLOCK_AREA, //地域

      E_BLOCK_CONCEPT, //概念

      E_BLOCK_OTHER, //其他

    }
    //板块信息
    interface FBlockSimpleInfo {
      iMarket?: string; //市场

      sCode?: string; //板块代码

      eType?: E_BLOCK_CLASS_TYPE; //类别

      sName?: string; //名字，会落地，避免改名 退市，等各种历史问题显示不了

    }
    // 开板明细（不是涨停封板的期间，而是两个涨停之间）===》》产品需求变更为 封板明细 涨跌停封板期间信息
    interface FOpenBoardDetail {
      iZDTTime?: string; //涨跌停时间

      iZDTOpenTime?: string; //涨跌停打开时间

      dLowRatio?: string; //持续时间内最低涨幅 ==》》改为封板明细后 该字段实际上没意义了

      lFirstZDTVol?: string; //首次封单量

      dFirstZDTRatio?: string; //首次封成比

      lLastZDTVol?: string; //最后封单量

      dLastZDTRatio?: string; //最后封成比

      lHighZDTVol?: string; //最高封单量  从涨跌停到打开期间最高的买1量

      dHighZDTRatio?: string; //最高封成比  最高封单量/封单量最高时刻成交量

    }
    interface FBoardPeriod {
      iStrongWeakNum?: string; //强势天数（参考强势股逻辑，原来逻辑为：涨幅大于5%的连续天数，已废弃)

      iZDTNum?: string; //收盘涨停天数

      iOneNum?: string; //一字板天数

    }
    //历史涨停信息
    interface StockZDTHisDate {
      market?: string;
      sCode?: string;
      setZtDays?: Array<string>; //近31天里涨停的日期

      setOneZtDays?: Array<string>; //近31天里一字涨停的日期

      setDtDays?: Array<string>; //近31天里跌停的日期

      setOneDtDays?: Array<string>; //近31天里一字跌停的日期

    }
    interface FZDStockInfo {
      iMarket?: string; //市场

      sCode?: string; //代码

      dNowPrice?: string; //最新价

      dChgRatio?: string; //涨跌幅

      dTurnOver?: string; //换手率

      dAvgTurnOver?: string; //日均换手率

      iLastZDTime?: string; //最后涨跌停时间

      iFirstZDTime?: string; //首次涨跌停时间

      lLastZDTVol?: string; //封板期间 最后封单量，当日最新涨停时刻的买一(跌停 就是卖一)档委托量

      dLastZDTRatio?: string; //封板期间 最后封成比,最后封单量/成交量

      dFloatValue?: string; //流通市值

      iContinueBoard?: string; //连板数

      iDetailNum?: string; //开板数

      vecDetail?: Array<FOpenBoardDetail>; //当天开板明细

      stBoard?: FBoardPeriod; //几天几板

      eType?: E_STOCK_ZT_TYPE; //涨停类型 

      iDate?: string; //当前行情交易日

      dPrevRatio?: string; //昨日涨跌幅，目前只有竞价股用到

      bIsZt?: boolean; //是否涨停，用买一价和涨停价比较

      bUnOpenNewStock?: boolean; //未开盘新股

      bIsST?: boolean; //是否为ST

      bSubNewStock?: boolean; //是否为次新股

      strStockZTReason?: string; //涨停原因

      vecBlk?: Array<FBlockSimpleInfo>; //对应板块信息 全部,包括行业 地域 概念，带标识区分

      dTotalMarketValue?: string; //总市值

      bIsDt?: boolean; //是否跌停

      nStockZTReasonUpdateTime?: string; //涨停原因更新时间戳 透传

      vRelatedPlates?: Array<string>; //涨停原因 关联板块(爬虫)

      dHighPrice?: string; //当天最高价

      dLowPrice?: string; //当天最低价

    }
    interface FPoolMapInfo {
      stockMap?: Record<string, FZDStockInfo>;
      lRefreshTime?: string;
    }
    interface FStockZTData {
      dZTPrice?: string; //涨停价

      dDTPrice?: string; //跌停价

      dTurnover?: string; //换手率

      dZdf?: string; //涨跌幅

    }
    interface FupanZTStockLabelInfo {
      iMarket?: string; //市场

      sCode?: string; //代码

      iContinueBoard?: string; //连板数

      stBoard?: FBoardPeriod; //几天几板

      iDate?: string; //当前行情交易日

      bIsZt?: boolean; //是否涨停，用买一价和涨停价比较

      bUnOpenNewStock?: boolean; //未开盘新股

      bIsDt?: boolean; //是否跌停

      iFirstZDTime?: string; //首次涨跌停时间     

      eType?: E_STOCK_ZT_TYPE; //涨停类型   

    }
    interface FZTLabelPoolMapInfo {
      stockMap?: Record<string, FupanZTStockLabelInfo>;
      lRefreshTime?: string;
    }
    interface FupanZTLabelHisData {
      iLastDate?: string; //上个交易日   

      mapZDtHisDate?: Record<string, StockZDTHisDate>; //历史涨停日期集合 不包含当天

      vecPreZTStock?: Array<FupanZTStockLabelInfo>; //昨日涨停个股集合 

      mapHisStockInfo?: Record<string, Record<string, FStockZTData>>; //个股历史信息，包括交易日，换手率等

    }
  }
}
export {};