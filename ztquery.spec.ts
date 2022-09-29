declare global {
  namespace FuPan {
    interface FStockPoolReq {
      stHeader?: HQSys.HeaderInfo;
      eStockType?: E_STOCK_POOL_TYPE; //股票池类型

      bGetDetail?: boolean; //是否获取开板明细

      iBeg?: string; //位置偏移

      iWantNum?: string; //-1表示全部

      iDate?: string; //0默认标识当天 表示要最新数据

      lRefreshTime?: string; //数据刷新时间，精确到ms的时间戳

    }
    interface FStockPoolRsp {
      vecStock?: Array<FZDStockInfo>;
      iSize?: string; //股票池股票总数量

      lTime?: string; //数据刷新时间，精确到ms的时间戳

      iDate?: string; //交易日期，解决清盘期间客户端不知道交易日日期问题

    }
    //股票池 批量接口
    interface FBatchStockPoolReq {
      vecStockPoolReq: Array<FStockPoolReq>; //股票池批量请求接口

    }
    interface FBatchStockPoolRsp {
      vecStockPoolRsp?: Array<FStockPoolRsp>; //股票池批量返回接口

    }
    interface FBoardDetailReq {
      stHeader?: HQSys.HeaderInfo;
      iMarket?: string;
      sCode?: string;
      iDate?: string; //请求数据的日期，默认0请求最新的数据

      eType?: E_STOCK_POOL_TYPE; //股票池类型

    }
    interface FBoardDetailRsp {
      vecDetail?: Array<FOpenBoardDetail>;
    }
    interface FTrendDataType {
      eTrend?: E_MARKET_TREND_TYPE; //指标类型

      eDate?: E_TREND_DATE_TYPE; //数据类型：当天或者近30日

      iDate?: string; //获取历史某一天的数据   

      eFilterType?: E_STOCK_FILTER_TYPE; //过滤类型，默认不过滤st股 跟新股          

    }
    interface FMarketTrendReq {
      stHeader?: HQSys.HeaderInfo;
      vecType?: Array<FTrendDataType>;
    }
    interface FMarketTrendRsp {
      stData?: FMarketTrendData; //只返回请求的对应的市场风向指标数据，其它都是空值

    }
    interface FMarketTrendVecRsp {
      vecData?: Array<FMarketTrendData>; //分别返回请求的对应的市场风向指标数据，其它都是空值

    }
    enum E_BLK_CURR_DATA_TYPE {
      E_BLK_CURR_NO_STOCK, //无需股票明细

      E_BLK_CURR_ZT_STOCK, //涨停股票明细

      E_BLK_CURR_UNZT_STOCK, //未涨停股票明细

    }
    interface FBlkCurrentReq {
      stHeader?: HQSys.HeaderInfo;
      iWantNum?: string; //请求个数，默认为0时，后台会强制返回约定好的8条数据

      iPos?: string; //请求起始位置，分页

      eDetail?: E_BLK_CURR_DATA_TYPE; //是否需要股票明细

      iDate?: string; //请求板块数据的日期，默认值0为当日最新数据

      lBlkUpdteTime?: string; //数据更新时间戳

      iMinZTNum?: string; //请求板块的最小涨停成分股个数,涨停家数小于iMinZTNum的直接过滤 不返回

    }
    interface FBlkCurrentRsp {
      vecData?: Array<FBlockZTData>; //题材数据，已经按照涨停家数做好排序

      iDate?: string; //当前日期

      lBlkUpdteTime?: string; //数据更新时间戳

    }
    interface FBlkCurZTReq {
      stHeader?: HQSys.HeaderInfo; //带板块市场

      sCode?: string; //板块code

      iWantNum?: string;
      iPos?: string;
      iDate?: string; //请求板块数据的日期，默认值0为当日最新数据

    }
    interface FBlkCurZTRsp {
      vecStock?: Array<FBlockStockZT>; //默认已经按照涨停时间排序

    }
    interface FBlkCurUnZTReq {
      stHeader?: HQSys.HeaderInfo; //带板块市场

      sCode?: string; //板块code

      iWantNum?: string;
      iPos?: string;
      iDate?: string; //请求板块数据的日期，默认值0为当日最新数据

    }
    interface FBlkCurUnZTRsp {
      vecStock?: Array<FBlockStockUnZT>; //默认已经按照涨幅排序

    }
    interface FStockUnique {
      iMarket?: string;
      sCode?: string;
    }
    interface FBlkLastHisReq {
      stHeader?: HQSys.HeaderInfo;
      vecStock?: Array<FStockUnique>;
      iDayNum?: string; //数据天数 

      iDate?: string; //请求板块数据的日期，默认值0为当日最新数据

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
      iPos?: string; //起始位置

      iStockNum?: string; //每天涨停数据中股票的个数，默认全部

    }
    interface FBlkTimeHisRsp {
      stData?: FBlockTimeTrail;
    }
    interface FBlkStockHisReq {
      stHeader?: HQSys.HeaderInfo;
      sCode?: string;
      iWantNum?: string;
      iPos?: string; //起始位置，逆序

    }
    interface FBlkStockHisRsp {
      stData?: FBlockStockTrail;
    }
    interface FBlkHisTurnReq {
      stHeader?: HQSys.HeaderInfo;
      iWantNum?: string;
    }
    interface FBlkHisTurnRsp {
      vecData?: Array<FBlockZTStatic>; //返回的数据已经是按照涨停天数和累计涨幅排序

    }
    interface FLeadBlkReq {
      stHeader?: HQSys.HeaderInfo;
      iDate?: string;
      iBlockType?: string; //板块所属分类

    }
    interface FLeadBlkRsp {
      vecData?: Array<IC.SLeadBlkInfo>;
    }
    interface FBlkChangesReq {
      stHeader?: HQSys.HeaderInfo;
      iDate?: string; //日期：YYYYMMDD

      eType?: IC.BLOCKCHANGE_TYPE; //异动类型

      iBlkLeadStockNum?: string; // 板块领涨股个数

      iWantNum?: string;
      iPos?: string; //起始位置

      iBlockType?: string; //板块所属分类

    }
    interface FBlkChangesRsp {
      vecData?: Array<IC.SBlockChange>;
    }
    //特定需求，请求股票列表，返回当日几天几板,(要求从当天涨停池里查找,不包含强势股股票池)
    interface FStockPoolFBoardPeriodReq {
      stHeader?: HQSys.HeaderInfo;
      vecStock?: Array<FStockUnique>; //股票列表

    }
    interface FStockPoolFBoardPeriodInfo {
      stock?: FStockUnique; //个股,只返回符合条件的

      stBoard?: FBoardPeriod; //几天几板数据

    }
    interface FStockPoolFBoardPeriodRsp {
      vecStBoardPeriodData?: Array<FStockPoolFBoardPeriodInfo>;
    }
    //***********************历史因子模块
    interface FHisFactorReq {
      stHeader?: HQSys.HeaderInfo;
      eHisFactorType?: E_HIS_FACTOR_TYPE; //类型，目前只支持E_HIS_FACTOR_HOT_SUBJECT，后续可以根据需要放开

      nStartDate?: string; //起始日期

      nEndDate?: string; //结束日期

      nDayNum?: string; //天数这里构成组合，1.起始日期有效，天数>0 ，以起始日期为基准点返回后nDayNum天数据 (不包含基准)2.结束日期有效，天数>0 ，以结束日期为基准点返回前nDayNum天数据 (不包含基准)    这里结束日期为0的话，视同返回最新nDayNum天数据3.天数<=0,起始日期有效（>0），结束日期 >起始日期 或为0时，返回起始日期倒结束日期（结束日期无效的话 视同返回到最新交易日）。（包含基准）     

    }
    //除了结果集vecHisFactorData，其余都是req 原样返回
    interface FHisFactorRsp {
      eHisFactorType?: E_HIS_FACTOR_TYPE;
      nStartDate?: string;
      nEndDate?: string;
      nDayNum?: string;
      vecHisFactorData?: Array<FHisFactorData>;
    }
    //题材龙头请求信息
    interface FSubDragonHeadBlkInfo {
      blk?: StockInfo; //题材信息

    }
    //批量题材龙头股请求信息
    interface FBatchSubDragonHeadStockReq {
      stHeader?: HQSys.HeaderInfo;
      vecSubject?: Array<FSubDragonHeadBlkInfo>; //批量题材信息,传空表示获取所有题材的

      lRefreshTime?: string; //刷新时间

    }
    //題材龙头回包信息
    interface FSimpleStockInfo {
      iMarket?: string; //市场

      sCode?: string; //代码

    }
    interface FSubDragonHeadBlkRspInfo {
      blk?: StockInfo; //题材信息

      vecStk?: Array<FSimpleStockInfo>; //排序后的题材所属龙头股信息

    }
    interface FSubDragonHeadStockRsp {
      vecSubject?: Array<FSubDragonHeadBlkRspInfo>; //题材龙头股信息

      lRefreshTime?: string; //刷新时间

    }
    interface FZTTrendStockReq {
      stHeader?: HQSys.HeaderInfo;
      iCount?: string; //获取涨停风向股的数量

      lRefreshTime?: string; //刷新时间

    }
    //简化涨停股信息
    interface FSimpleZTStockInfo {
      iMarket?: string; //市场

      sCode?: string; //代码

      iContinueBoard?: string; //连板数

      stBoard?: FBoardPeriod; //几天几板

      eType?: E_STOCK_ZT_TYPE; //涨停类型

      iLastZTime?: string; //最后涨停时间

      vecHotBlk?: Array<FHotBlockInfo>; //涨停股所属热门板块集合(已排序)

      dChgRatio?: string; //涨跌幅

      bUnOpenNewStock?: boolean; //是否是未开板新股

    }
    //涨停风向回包
    interface FZTTrendStockRsp {
      vecStock?: Array<FSimpleZTStockInfo>; //涨停风向股信息 

      lRefreshTime?: string; //刷新时间

    }
    //涨停标杆请求
    interface FZTModelStockReq {
      stHeader?: HQSys.HeaderInfo;
      iCount?: string; //获取涨停标杆股数量,最多3个

      lRefreshTime?: string; //刷新时间

    }
    //标杆信息
    interface FZTModelBlkInfo {
      blk?: StockInfo; //涨停标杆所属板块信息

      vecStock?: Array<FSimpleZTStockInfo>; //板块下连板数前3股票信息

      iHot?: string; //题材热度

    }
    //涨停标杆股信息
    interface FZTModelInfo {
      stkInfo?: FSimpleZTStockInfo; //涨停标杆股信息

      modelInfo?: FZTModelBlkInfo; //标杆信息

    }
    //涨停标杆回包
    interface FZTModelStockRsp {
      vecModelInfo?: Array<FZTModelInfo>;
      lRefreshTime?: string;
    }
    interface FSubNewStockReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string; //刷新时间

    }
    interface FSubNewStockInfo {
      stkInfo?: FMDaySubNewStockInfo; //次新股信息

      vecBlk?: Array<FBlockSimpleInfo>; //次新股所属题材

    }
    interface FSubNewStockRsp {
      vecStk?: Array<FSubNewStockInfo>; //次新股股信息 

      lRefreshTime?: string; //刷新时间

    }
    //板块异动请求
    interface FBlkUnuActReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string; //刷新时间

    }
    interface FBlkUnuActDetailInfo {
      blkUnuAct?: FBlkUnuActInfo; //异动信息

      iNDaysUnuActTime?: string; //30日炒作次数

    }
    //板块异动回包
    interface FBlkUnuActRsp {
      vecBlkUnuActDetail?: Array<FBlkUnuActDetailInfo>; //所有板块异动信息(无序)

      lRefreshTime?: string;
    }
    //板块异动标签请求
    interface FBlkUnuActFlagReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string; //刷新时间

    }
    //板块异动标签回包
    interface FBlkUnuActFlagRsp {
      vecBlkUnuActTag?: Array<FBlkUnuActTagInfo>; //异动标签(有序)

      lRefreshTime?: string;
    }
    //热点板块请求
    interface FHotPointBlkStkReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string; //刷新时间

    }
    //热点板块所属股票信息
    interface FHotPointBlkStockInfo {
      stkInfo?: FSimpleZTStockInfo;
      iDragonHeadIdx?: string; //股票龙头股标签(0:不是龙头股 1:龙一 2:龙二 ...)

    }
    interface FHotPointBlkRspInfo {
      blk?: StockInfo; //题材信息

      vecStk?: Array<FHotPointBlkStockInfo>; //排序后的题材所属龙头股信息

      iHot?: string; //题材热度

    }
    //热点板块回包
    interface FHotPointBlkStkRsp {
      vecHotPointBlkStk?: Array<FHotPointBlkRspInfo>; //热点板块及股票

      lRefreshTime?: string;
    }
    //超短大盘池请求
    interface FUltraShortTermStkReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string; //刷新时间

    }
    //超短大盘池回包
    interface FUltraShortTermStkRsp {
      stUltraStkPool?: FUltraShorttermStkPool; //超短大盘

      lRefreshTime?: string;
    }
    //擒牛股请求
    interface FCatchBullStkReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string; //刷新时间

    }
    //擒牛股回包
    interface FCatchBullStkRsp {
      vecZtStk?: Array<FSimpleZTStockInfo>; //涨停擒牛股

      vecFbStk?: Array<FSimpleZTStockInfo>; //反包擒牛股

      vecSnStk?: Array<FSimpleZTStockInfo>; //近端次新擒牛股

      lRefreshTime?: string; //刷新时间

    }
    //超短大盘最新涨停股请求
    interface FUltraShtLastZtStkReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string; //刷新时间

    }
    interface FUltraShtLastZtStkRspInfo {
      stkInfo?: FSimpleZTStockInfo;
      eOriPool?: E_UNITED_STK_POOL_TYPE; //来源股池

      iLastZTTimeRank?: string; //最后涨停时间排名

    }
    //超短大盘最新涨停股回包
    interface FUltraShtLastZtStkRsp {
      vecStk?: Array<FUltraShtLastZtStkRspInfo>; //股票信息

      lRefreshTime?: string; //刷新时间

    }
    //板块基础数据
    interface FBlkBasicDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecBlk?: Array<StockInfo>;
      eBasicDataType?: E_BLK_BASIC_DATA_TYPE;
      iEndDate?: string; //结束日期,默认用当天日期

      iPreDayNum?: string; //默认返回1天

      iCmd?: string; //附加命令(用来过滤掉不用的字段 0:所有数据 1:只要基础数据 2:基础数据+涨停成分股列表 3:基础数据+未涨停成分股列表)

    }
    interface FDateBlkBasicData {
      iDate?: string;
      vecData?: Array<FBlockBasicData>;
    }
    interface FBlkBasicDataRsp {
      eBasicDataType?: E_BLK_BASIC_DATA_TYPE;
      vecDateData?: Array<FDateBlkBasicData>;
    }
    //板块成分股数据
    interface FBlkStkDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecBlk?: Array<StockInfo>;
      iStkType?: string;
      iEndDate?: string; //结束日期,默认用当天日期

      iPreDayNum?: string; //默认返回1天

    }
    interface FDateBlkStkData {
      iDate?: string;
      vecBlkStk?: Array<FBlockStkCompData>;
    }
    interface FBlkStkDataRsp {
      iStkType?: string;
      vecDateBlkStk?: Array<FDateBlkStkData>;
    }
    //批量获取股票数据(支持沪深市场所有股票)
    interface FBatchStkDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecStk?: Array<StockInfo>;
      iDate?: string; //结束日期,默认用当天日期(预留,暂时没用)

    }
    interface FBatchStkDataRsp {
      iDate?: string;
      vecStk?: Array<FBlockStockInfo>;
    }
    //板块衍生数据
    interface FBlkExtDataReq {
      stHeader?: HQSys.HeaderInfo;
      eBlkDataType?: E_BLOCK_DATA_TYPE;
      iStartDate?: string; //预留(暂时无用)

      iEndDate?: string; //结束日期,默认用当天日期

      iPreDayNum?: string; //默认返回1天

      iSubCmd?: string; //子命令(每种E_BLOCK_DATA_TYPE代表的意义不同)

    }
    interface FBlkExtDataRsp {
      eBlkDataType?: E_BLOCK_DATA_TYPE;
      vecExtData?: Array<FBlockExternData>;
    }
    enum STORM_EYE_IDX_TYPE {
      STORM_EYE_IDX_TYPE_NUM, //风口数量指标

      STORM_EYE_IDX_TYPE_LEVEL, //板块风级指标

    }
    //板块风级指标
    interface FBlkStormEyeIdxReq {
      stHeader?: HQSys.HeaderInfo;
      eIdxType?: STORM_EYE_IDX_TYPE; //指标类型

      iStartDate?: string; //开始日期

      iEndDate?: string; //结束日期

      vecBlk?: Array<StockInfo>; //题材信息(类型为STORM_EYE_IDX_TYPE_LEVEL时必传)

    }
    interface FStromEyeNumIdx {
      iDate?: string;
      stStormNum?: FBlockStormNum;
    }
    interface FStormEyeLv {
      iDate?: string;
      iZTStkNum?: string; //涨停股数量 <日内风级>

      iAccZTStkNum?: string; //累计涨停股数量(某交易日没有涨停股则重置计数) <连续风级>

    }
    interface FBlkStormEyeLvIdx {
      blk?: FBlockSimpleInfo; //板块信息

      vecLv?: Array<FStormEyeLv>;
    }
    interface FBlkStormEyeIdxRsp {
      vecStormNum?: Array<FStromEyeNumIdx>; //风口数量

      vecStormLv?: Array<FBlkStormEyeLvIdx>; //风级信息

    }
    //批量获取股票异动数据
    interface FBatchStkCaUnuActReq {
      stHeader?: HQSys.HeaderInfo;
      vecStk?: Array<StockInfo>;
    }
    interface FBatchStkCaUnuActRsp {
      vecStkCaUnuAct?: Array<FStkAllCaUnuAct>;
    }
    interface FMultiCaUnuActTypeDataReq {
      stHeader?: HQSys.HeaderInfo;
      vecType?: Array<E_CALL_AUCTION_DATA_TYPE>; //异动类型

      iStartDate?: string; //预留(暂时无用)

      iEndDate?: string; //结束日期,默认用当天日期

      iPreDayNum?: string; //默认返回1天

    }
    interface FNumOfCaUnuActTypeStkReq {
      stHeader?: HQSys.HeaderInfo;
      vecType?: Array<E_CALL_AUCTION_DATA_TYPE>; //异动类型

      iStartDate?: string; //预留(暂时无用)

      iEndDate?: string; //结束日期,默认用当天日期

      iPreDayNum?: string; //默认返回1天

      bWantAll?: boolean; //全部异动

    }
    //根据异动类型获取所有对应的信息
    interface FCaUnuActTypeDataReq {
      stHeader?: HQSys.HeaderInfo;
      eType?: E_CALL_AUCTION_DATA_TYPE; //异动类型

      iStartDate?: string; //预留(暂时无用)

      iEndDate?: string; //结束日期,默认用当天日期

      iPreDayNum?: string; //默认返回1天

      iSubCmd?: string; //子命令(每种 E_CALL_AUCTION_DATA_TYPE 代表的意义不同)

    }
    interface FCaUnuActTypeDataRsq {
      eType?: E_CALL_AUCTION_DATA_TYPE; //原样返回

      vecCaUnuAct?: Array<FCaUnuActData>; //异动信息

    }
    //根据异动评级获取异动股票
    interface FCaUnuActLevelStkReq {
      stHeader?: HQSys.HeaderInfo;
      eLevel?: E_CA_UNU_ACT_LEVEL; //异动评级

      iStartDate?: string; //预留(暂时无用)

      iEndDate?: string; //结束日期,默认用当天日期

      iPreDayNum?: string; //默认返回1天

    }
    interface FDateCaUnuActLevelStk {
      iDate?: string;
      vecCaUnuActStk?: Array<FStkLastCaUnuAct>; //异动股票

    }
    interface FCaUnuActLevelStkRsp {
      eLevel?: E_CA_UNU_ACT_LEVEL; //原样返回

      vecCaLevel?: Array<FDateCaUnuActLevelStk>; //异动股票

    }
    interface FAllCallAuctionDataRsp {
      vecAllCaUnuAct?: Array<FCaUnuActTypeData>;
    }
    interface FNumOfCallAuctionStkRsp {
      mapNumOfStk?: Record<E_CALL_AUCTION_DATA_TYPE, string>; //各个异动对应个股数

      iNumOfAllStk?: string; //全部异动类型个股数

    }
    //涨停盘口信息
    interface FZDPanKouInfoReq {
      stHeader?: HQSys.HeaderInfo;
      vecStk?: Array<StockInfo>;
    }
    interface FZDPanKouInfo {
      iMarket?: string;
      strCode?: string;
      strStockZTReason?: string; //涨停原因

      dCurFDAmount?: string; //当前封单金额

      dFDRatio?: string; // 当前封成比

      dHighFDAmout?: string; //最高封单金额

      dZTTradeAmout?: string; //涨停成交金额

    }
    interface FZDPanKouInfoRsq {
      vecFZDPanKouInfo?: Array<FZDPanKouInfo>;
    }
    //所有股池
    interface FBatchUnitedStockPoolReq {
      stHeader?: HQSys.HeaderInfo;
      vecType?: Array<E_UNITED_STK_POOL_TYPE>; //股池类型(仅支持部分)

      lRefreshTime?: string; //刷新时间

      iDate?: string;
    }
    interface FUnitedPoolStock {
      eType?: E_UNITED_STK_POOL_TYPE;
      vecStk?: Array<StockInfo>;
    }
    interface FBatchUnitedStockPoolRsq {
      vecStkPool?: Array<FUnitedPoolStock>;
      lRefreshTime?: string; //刷新时间

      iDate?: string; //股池真实日期

    }
    interface FZTTagReq {
      stHeader?: HQSys.HeaderInfo;
      vecTagType?: Array<E_ZT_TAG_TYPE>; //标签类型

      eDataType?: E_TAG_DATA_TYPE; //类型:涨停分析3/盘面亮点0

      nStartDate?: string; //起始日期

      nEndDate?: string; //结束日期    

    }
    interface FZTTagRsp {
      vecTagData?: Array<FStockZTTag>;
    }
    //涨停标签请求
    interface FZTAllTagTypeReq {
      stHeader?: HQSys.HeaderInfo;
      lRefreshTime?: string; //刷新时间

      eTagType?: E_TAG_DATA_TYPE; //请求标签类型(涨停/盘面亮点标签)

    }
    interface FTagTypeInfo {
      eType?: E_ZT_TAG_TYPE;
      strTypeName?: string;
    }
    interface FZTAllTagTypeRsp {
      vecType?: Array<FTagTypeInfo>; //返回标签

      lRefreshTime?: string;
    }
  }
}
export {};