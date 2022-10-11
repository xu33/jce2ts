declare global {
  namespace News {
    enum E_List_Type {
      ELT_NONE_Type = 0,
      ELT_HEANLINE = 1,
      ELT_CHANCE = 2,
      ELT_STRATEGY = 3,
      ELT_HANDICAP = 4,
      ELT_MAIN_FORCE = 5,
      ELT_MACROS = 6,
      ELT_COMPANY = 7,
      ELT_HK_STOCK = 8,
      ELT_US_STOCK = 9,
      ELT_SH_GOLD = 10,
      ELT_BIG_BOARD = 11,
      ELT_FUTURES = 13,
      ELT_FOREIGN_CURRENCY = 14,
      ELT_LIVE = 15,
      ELT_NOTICE = 16,
      ELT_RESEARCH_REPORT = 17,
      ELT_CHOICE = 18,
      ELT_CHOICE_NEWS = 19,
      ELT_CHOICE_NOTICE = 20,
      ELT_CHOICE_RESEARCH = 21,
      ELT_STOCK_NEWS = 22,
      ELT_STOCK_NOTICE = 23,
      ELT_STOCK_RESEARCH = 24,
      ELT_NEWS = 25,
      ELT_STOCK_INDUSTRY = 26,
      ELT_STOCK_INTERACTIVE = 27,
      ELT_INTERACTIVE = 28,
      ELT_IDU_REPORT = 29,
      ELT_RESEARCH = 30,
      ELT_ANALYSIS = 31,
      ELT_INSTITUTION_REFERENCE = 32,
      ELT_SPECIAL_STUDY = 33,
      ELT_RESEARCH_HEAD = 34,
      ELT_INDUSTRY = 40,
      ELT_CONCERN = 41,
      ELT_AREA = 42,
      ELT_FUND = 43,
      ELT_FUTURE_KIND = 44,
      ELT_THEME_TOPIC = 45,
      ELT_USASTOCK_NEWS = 51,
      ELT_USASTOCK_NOTICE = 52,
      ELT_USASTOCK_RESEARCH = 53,
      ELT_HKSTOCK_NEWS = 54,
      ELT_HKSTOCK_NOTICE = 55,
      ELT_HKSTOCK_RESEARCH = 56,
      ELT_NEWSTOCK_NEWS = 57,
      ELT_NEWSTOCK_NOTICE = 58,
      ELT_NEWSTOCK_RESEARCH = 59,
      ELT_MACRO_NEWS = 61,
      ELT_FARM_PRODUCE = 62,
      ELT_BLACK_METAL = 63,
      ELT_NONFERR_METAL = 64,
      ELT_ENERGY_CHEMICAL = 65,
      ELT_FUTURE_HEAD = 66,
      ELT_HK_NEWS = 67,
      ELT_USA_NEWS = 68,
      ELT_FUND_NEWS = 69,
      ELT_BUND_NEWS = 70,
      ELT_THIRD_BOARD = 71,
      ELT_PLATE = 72,
      ELT_STOCK_ADVICE = 73,
      ELT_INTER_NEWS = 74,
      ELT_INDU_NEWS = 75,
      ELT_FINANCIAL_NEWS = 76,
      ELT_GRAIL_NEWS = 77,
      ELT_SECURITY_NEWS = 78,
      ELT_PRE_NOTICE = 79,
      ELT_ADDISSUE_NOTICE = 80,
      ELT_IMP_NOTICE = 81,
      ELT_REMIND_NOTICE = 82,
      ELT_DIG_COIN_NEWS = 83,
      ELT_ALL_NEWS = 84,
      ELT_RECOMM_NEWS = 85,
      ELT_DDUNOTE_NEWS = 86,
      ELT_TGS_COLUMN = 87,
      ELT_TG_NEWS = 88,
      ELT_TGCOLUMN_NEWS = 89,
      ELT_DDUNOTE_ONLY = 90,
      ELT_INFOFLOW_TOPNEWS = 91,
      ELT_YTG_NEWS = 92,
      ELT_MEDIACOL_NEWS_ALL = 93,
      ELT_MEDIACOL_NEWS = 94,
      ELT_CHOICE_MEDIACOL_AND_DDU_NEWS = 95,
      ELT_DDUTHEACHER_LIST = 96,
      ELT_MEDIACIL_LIST = 97,
      ELT_FEATURES_LIST = 98,
      ELT_MEDIACOL_INFO = 99,
      ELT_HLTNEWS = 100,
      ELT_STOCK_REPORT = 101,
      ELT_NEWIDU_REPORT = 102,
      ELT_HS_HEANLINE = 201,
      ELT_HS_DEEPIN = 202,
      ELT_HS_IMPNEWS = 203,
      ELT_HS_CHOICE = 218,
      ELT_HS_CHOICE_NEWS = 219,
      ELT_HS_CHOICE_NOTICE = 220,
      ELT_HS_CHOICE_RESEARCH = 221,
      ELT_HS_STOCK_BEGIN = 250,
      ELT_HS_HKNEWS = 225,
      ELT_HS_USSTOCK_NEWS = 251,
      ELT_HS_HKSTOCK_NEWS = 254,
      ELT_HS_HKSTOCK_NOTICE = 255,
      ELT_HS_HKSTOCK_RESEARCH = 256,
      ELT_HS_STOCK_END = 299,
    }
    enum E_Rate_State {
      ERS_ALL = 0,
      ERS_INCREASE = 1,
      ERS_KEEP = 2,
      ERS_DOWN = 3,
      ERS_UNKNOW = 4,
      ERS_MAIDEN = 5,
    }
    enum E_Research_Tag {
      ERT_NONE = 0,
      ERT_BUY = 1,
      ERT_INCREASE = 2,
      ERT_NEUTRAL = 3,
      ERT_REDUCE = 4,
      ERT_SELL = 5,
      ERT_WAIT = 6,
    }
    enum E_Notice_Tag {
      ENT_ALL = 0,
      ENT_STRONG_LONG = 1,
      ENT_LONG = 2,
      ENT_NEUTER = 3,
      ENT_SHORT = 4,
      ENT_STRONG_SHORT = 5,
    }
    enum EX_BUSS_ID {
      EET_F10 = 0,
      EET_LEADER = 1,
      EET_INFO = 2,
      EET_PCONLINE = 3,
      EET_PCOEM = 4,
      EET_OEM = 5,
      EET_ZGB = 6,
      EET_GDS = 7,
      EET_JJJ = 8,
      EET_ZGBAPP = 9,
      EET_GDSAPP = 10,
      EET_PCINFO = 12,
      EET_THEME_EDIT = 13,
      EET_TZYAPP = 14,
      EET_TZYPC = 15,
      EET_HOT_NEWS = 16,
      EET_BEINIU_APP = 17,
      EET_DONGGUAN_APP = 18,
      EET_BEINIU_IOS = 19,
      EET_WEIXIN = 20,
      EET_NMAX_AND = 21,
      EET_NMAX_IOS = 22,
      EET_HLZQ = 23,
      EET_DZJJ = 24,
      EET_YTG = 25,
      EET_NRZL = 26,
      EET_FLOWATTACH = 27,
    }
    enum MARKET_CODE {
      EMC_SZ = 0,
      EMC_SH = 1,
      EMC_HK = 2,
      EMC_NASDAQ = 13,
      EMC_NYSE = 14,
      EMC_AMEX = 15,
      EMC_TB = 47,
    }
    interface UserBaseInfo {
      guid: string;
      xua: string;
      imei?: string;
      mac?: string;
      upId?: string;
      exData?: Record<string, string>;
    }
    enum E_Multimedia_Type {
      EMT_PICTURE = 0,
      EMT_FILE = 2,
      EMT_VIDE = 3,
      EMT_AD = 4,
      EMT_AUDIO = 5,
      EMT_PDF = 6,
      EMT_HTML = 7,
    }
    enum E_Multimedia_status {
      EMS_VIDEO_LIVE = 0,
      EMS_VIDEO_NOTICE = 1,
      EMS_VIDEO_TRANSCODING = 2,
      EMS_VIDEO_REPLAY = 3,
      EMS_VIDEO_SHORT = 4,
    }
    enum E_Multimedia_Style {
      EMS_BIG_VIDEO = 0,
      EMS_SMALL_VIDEO = 1,
      EMS_CONCERN_UPDATE = 2,
    }
    enum E_Heat_Status {
      EHS_NORMAL_NEWS = 0,
      EHS_HOT_NEWS = 1,
      EHS_TOP_NEWS = 2,
    }
    interface MultimediaInfo {
      type: number;
      fileUrl: string;
      name?: string;
      size?: number;
      duration?: number;
      videoUrl?: string;
      heat?: number;
      status?: number;
      showStyle?: number;
      heatStatus?: number;
      like?: number;
      share?: number;
    }
    enum E_News_Stauts {
      ENS_DISABLED = 0,
      ENS_AVAILABLE = 1,
      ENS_EDIT = 2,
      ENS_NEED_CHECK = 3,
      ENS_CHECK_ERR = 4,
    }
    const CIP_MEDIA = "0-";
    const CIP_RESEARCH = "Y-";
    const CIP_DDUNOTE = "T-";
    const CIP_DDUTWEET = "D-";
    const CIP_DDUCOMMENT = "W-";
    const CIP_DDUAD = "A-";
    const CIP_DDUNIUGROUP = "N-";
    const CIP_DDUEXPRESS = "E-";
    const CIP_DDUVIDEO = "V-";
    const CIP_DDULIVE = "L-";
    const CIP_STOCKPOOL = "S-";
    const CIP_EDITORPART = "Z-";
    const CIT_HOTSTOCK = "H-";
    enum E_News_Type {
      ENT_NEWS = 0,
      ENT_NOTICE = 1,
      ENT_REPORT = 2,
      ENT_MEDIA = 3,
      ENT_RESEARCH = 4,
      ENT_INTERACTIVE = 5,
      ENT_DUUNOTE = 6,
      ENT_DUUTWEET = 7,
      ENT_DUUCOMMENT = 8,
      ENT_DUUEXPRESS = 9,
      ENT_DUUVIDEO = 10,
      ENT_DUUNIUGROUP = 11,
      ENT_AD = 12,
      ENT_STOCKPOOL = 13,
      ENT_DDULIVE = 14,
      ENT_EDITORPART = 15,
      ENT_HOTSTOCK = 16,
      ENT_COLNEWS = 17,
      ENT_DANYMICDATA = 18,
      ENT_VIPNEWS = 19,
      ENT_TGVIPNEWS = 20,
      ENT_PROTOCOL = 21,
    }
    enum E_Source_Status {
      ESS_UNFOLLOW = 0,
      ESS_FOLLOW = 1,
    }
    enum E_Trade_Type {
      ETT_NO_INFO = 0,
      ETT_BEFORE = 1,
      ETT_TRADE = 2,
      ETT_AFTER = 3,
    }
    interface NewsBaseInfo {
      newsId: string;
      title: string;
      source: string;
      timestamp: string;
      listType: number;
      summary?: string;
      toUrl?: string;
      status?: number;
      contentLength?: number;
      stationId?: number;
      imageUrl?: Array<string>;
      newsType?: number;
      categoryId?: number;
      updateTime?: string;
      originId?: string;
      author?: string;
      sourceStatus?: number;
      questioner?: string;
      avatar?: string;
      crawlTime?: string;
      introduction?: string;
      page?: number;
      tradeType?: number;
      tradeTime?: string;
      subtitle?: string;
    }
    interface StockInfo {
      stock_code: string;
      stock_name: string;
      accer?: string;
      cur_price?: string;
      market?: number;
      secUniCode?: string;
      industryCode?: string;
      stockType?: number;
      dist_score?: string;
      bDelist?: boolean;
    }
    interface StockInfoLite {
      secCode: string;
      hqMarket: number;
    }
    enum E_Tage_Type {
      ETT_NEWS = 0,
      ETT_NOTICE = 1,
      ETT_RESEARCH = 2,
      ETT_RESEARCH_CHANGE = 3,
      ETT_COLUM = 4,
      ETT_PRODUCT = 5,
      ETT_NOTICE_TYPE = 6,
      ETT_HK_NOTICE_TYPE = 7,
      ETT_HK_RESEARCH = 8,
      ETT_HK_IMPNEWS = 9,
      ETT_DDUNOTTYPE = 10,
      ETT_MEDIACOLTYPE = 11,
      ETT_DDU_TEACHER = 12,
      ETT_MEDIACOL_BIGTYPE = 13,
      ETT_HAS_DP = 14,
      ETT_YQ_IMPACT = 15,
      ETT_CMS_COLID = 16,
      ETT_CUSTOM_WORD = 17,
    }
    interface TagInfo {
      type: number;
      value?: number;
      tittle?: string;
      style?: Record<string, string>;
    }
    enum E_Banner_Type {
      EBT_AD = 0,
      EBT_NEWS = 1,
    }
    interface NewsBannerInfo {
      baseInfo: NewsBaseInfo;
      bannerType: number;
      picturePath?: string;
      toUrl?: string;
    }
    interface ReportPrice {
      fLowExpePrice?: string;
      fHighExpePrice?: string;
    }
    enum NEWS_PAY_TYPE {
      NPT_FREE = 0,
      NPT_PAY = 1,
    }
    interface NewsListInfo {
      baseInfo: NewsBaseInfo;
      vStockList?: Array<StockInfo>;
      vTag?: Array<TagInfo>;
      mutilmediaInfo?: MultimediaInfo;
      price?: ReportPrice;
      hasContent?: boolean;
      attr?: Record<string, string>;
      stockPool?: Array<NewsRecom.NewsSIndexDataNew>;
      newsRecomAssemblyData?: NewsRecom.NewsRecomAssemblyData;
      newsPayType?: number;
      tagType2vTagDetail?: Record<number, Array<TagInfo>>;
    }
    interface LiveListInfo {
      baseInfo: NewsBaseInfo;
      liveContent?: Array<string>;
      vList?: Array<NewsBaseInfo>;
      mutilmediaInfo?: MultimediaInfo;
    }
    interface LiveListRsp {
      ret: number;
      vList: Array<LiveListInfo>;
      msgInfo?: string;
    }
    interface ListReqBaseInfo {
      userInfo: UserBaseInfo;
      vNewsList?: Array<string>;
    }
    enum E_Reqkey_Type {
      ERT_NOTICE = 0,
      ERT_RESEARCH_REPORT = 1,
      ERT_DEEP_RESEARCH = 2,
      ERT_STOCK_CODE = 3,
      ERT_MARKERT_TYPE = 4,
      ERT_INDUSTRY = 5,
      ERT_CONCERN = 6,
      ERT_AREA = 7,
      ERT_FUND = 8,
      ERT_FUTURE = 9,
      ERT_THEME = 10,
      ERT_CHOICE_TYPE = 11,
      ERT_NOTICE_TYPE_LIST = 12,
      ERT_TGEDITOR = 13,
      ERT_TGCOLUM_TYPE = 14,
      ERT_NOPAID = 50,
    }
    interface NewsListReq {
      baseInfo: ListReqBaseInfo;
      listType: number;
      bannerVersion: string;
      extData?: Record<number, string>;
    }
    interface NewsListRsp {
      ret: number;
      vList?: Array<NewsListInfo>;
      vBannerList?: Array<NewsBannerInfo>;
      bannerVersion?: string;
      msgInfo?: string;
      mList?: Record<string, Array<NewsListInfo>>;
      resSum?: number;
    }
    interface Author {
      name: string;
      professional: string;
    }
    interface NewsContentReq {
      userInfo: UserBaseInfo;
      listType: number;
      newsId?: string;
    }
    interface ReportChartsNode {
      chart_url?: string;
      chart_title?: string;
    }
    interface NewsContentRsp {
      ret: number;
      baseInfo: NewsBaseInfo;
      infoContent: Array<string>;
      mutimedia?: Array<MultimediaInfo>;
      author?: Author;
      vRelateList?: Array<NewsListInfo>;
      vRelateStockList?: Array<StockInfo>;
      vTagList?: Array<TagInfo>;
      msgInfo?: string;
      price?: ReportPrice;
      deadlineDate?: string;
      infoContentPart2?: Array<string>;
      charts?: Array<ReportChartsNode>;
    }
    interface ResearchFrontRsp {
      ret: number;
      vInnerList: Array<NewsListInfo>;
      vNewsList: Array<NewsListInfo>;
      vBannerList?: Array<NewsBannerInfo>;
      msgInfo?: string;
    }
    interface CalendarInfo {
      baseInfo: NewsBaseInfo;
      preValue?: string;
      forecastValue?: string;
      publishValue?: string;
      startLevel?: number;
    }
    interface CalendarListRsp {
      ret: number;
      vList: Array<CalendarInfo>;
      msgInfo?: string;
    }
    interface ColumInfo {
      columId: number;
      name: string;
    }
    interface ColumListRsp {
      ret: number;
      msgInfo?: string;
    }
    enum E_Direction_Type {
      EDT_NEWS = 0,
      EDT_OLD = 1,
      EDT_MIDDLE = 2,
      EDT_BEFORE = 3,
      EDT_SUB_TOP_NEWS = 4,
    }
    enum E_Column_Type {
      ECT_Notice_Type = 0,
      ECT_Notice_Long = 1,
      ECT_Notice_Short = 2,
      ECT_Notice_All = 3,
    }
    enum E_Column_Req_Type {
      ECR_App_Stock_Notice_List = 0,
      ECR_App_Choose_Report_List = 1,
      ECR_App_Choose_Notice_List = 2,
    }
    interface ColumnData {
      columnName: string;
      columnType: number;
      vColumnArgs?: Array<number>;
      columnReqType?: number;
    }
    interface ColumnInfoReq {
      ColumnReqType: number;
    }
    interface ColumnInfoRsp {
      vColumnData: Array<ColumnData>;
    }
    interface DayTimeRange {
      startTime?: number;
      endTime?: number;
      isMainRule?: boolean;
    }
    interface TimestampRange {
      startTime?: string;
      endTime?: string;
      isMainRule?: boolean;
    }
    interface NewsIdListReq {
      userInfo: UserBaseInfo;
      listType: number;
      beginId?: string;
      direction?: number;
      reqNum?: number;
      extData?: Record<number, string>;
      version?: string;
      noticeType?: Array<number>;
      vColumnData?: Array<ColumnData>;
      timeRange?: DayTimeRange;
      timestampRange?: TimestampRange;
      indexTypeList?: Record<number, Array<string>>;
      dynamicDataId?: number;
      startId?: string;
      pullDirection?: number;
      isChooseType?: boolean;
      curNewsSum?: number;
      vChooseStk?: Array<StockInfoLite>;
    }
    interface stocksNewsReq {
      idListReq: NewsIdListReq;
      vStockList?: Array<StockInfo>;
    }
    interface NewsIdListRsp {
      ret: number;
      msgInfo?: string;
      vList?: Array<string>;
      version?: string;
      vStockList?: Array<StockInfo>;
    }
    interface NewsServerNode {
      newsInfo: NewsListInfo;
      mutimedia?: Array<MultimediaInfo>;
      author?: Author;
      vRelateList?: Array<NewsListInfo>;
      vRelateStockList?: Array<StockInfo>;
      vTagList?: Array<TagInfo>;
      moduleId?: number;
      tempTagList?: Array<string>;
      tmpKeyList?: Array<string>;
      filePath?: string;
      hasNoContent?: boolean;
      vRelateThemeList?: Array<StockInfo>;
      vRelateIndustryList?: Array<StockInfo>;
      vRelateAreaList?: Array<StockInfo>;
      vRelateFundList?: Array<StockInfo>;
      vRelateId?: Array<string>;
      vRelatedOtherList?: Record<number, Array<StockInfo>>;
      stationId?: string;
      categoryId?: string;
      indexFilePath?: string;
      hasNoIndexContent?: boolean;
      fullFilePath?: string;
      fromResTable?: number;
    }
    interface NewsReq {
      baseInfo: ListReqBaseInfo;
      listType: number;
      beginId?: string;
      reqNum?: number;
      idType?: number;
    }
    enum E_Req_Id_Type {
      ERIT_ID = 0,
      ERIT_ID_LIST = 1,
      ERIT_SPECIAL_ID = 2,
    }
    interface NewsSummInfo {
      infoId?: string;
      summ?: NewsServerNode;
    }
    interface NewsRsp {
      ret: number;
      msgInfo?: string;
      vList?: Array<NewsSummInfo>;
    }
    interface NewsNode {
      newsId: string;
      priority: string;
      subType?: number;
      vRelateStock?: Array<string>;
      extData?: Record<number, string>;
      stationId?: number;
      impact?: number;
      noticeType?: number;
    }
    interface DelDataNode {
      news_id: string;
      stock_unicode?: string;
    }
    interface PushData {
      listType: number;
      vList: Array<NewsNode>;
      vBannerList?: Array<NewsBannerInfo>;
      _version?: string;
      vChipNews?: Array<NewsListInfo>;
      curTime?: string;
      delData?: Record<number, Array<string>>;
      delDataNodeList?: Record<number, Array<DelDataNode>>;
    }
    interface PushRsp {
      ret: number;
      errMsg: string;
    }
    interface DataNode {
      Id: string;
      priority: string;
      stationId?: number;
      noticeType?: number;
      impact?: string;
    }
    interface DataNodeList {
      columId: number;
      vList?: Array<DataNode>;
      lastUpdateTime?: string;
      subType?: number;
      lastNewsId?: string;
    }
    interface BannerList {
      columId: number;
      vList?: Array<NewsBannerInfo>;
      lastUpdateTime?: string;
    }
    interface ChipList {
      columId: number;
      vList?: Array<NewsListInfo>;
      lastUpdateTime?: string;
    }
    interface NewsBannerReq {
      userInfo: UserBaseInfo;
      listType: number;
      extData?: Record<number, string>;
      version?: string;
    }
    interface NewsBannerRsp {
      ret: number;
      vBannerList?: Array<NewsBannerInfo>;
      bannerVersion?: string;
      msgInfo?: string;
    }
    interface ResearchContentBase {
      id: string;
      columInfo: TagInfo;
      vContent?: Array<string>;
      title?: string;
    }
    interface ResearchContentRsp {
      ret: number;
      baseInfo: NewsBaseInfo;
      columInfo: TagInfo;
      vContentList?: Array<ResearchContentBase>;
      author?: Author;
      msgInfo?: string;
    }
    enum E_Operate_Type {
      EOT_MODIFY = 1,
      EOT_DELETE = 2,
      EOT_REVERT = 3,
      EOT_CHECK_ERR = 4,
      EOT_SUBMIT_CHECK = 5,
    }
    enum E_Query_News_Type {
      EQT_News_Title = 0,
      EQT_News_Id = 1,
    }
    interface QueryNewsInfo {
      listInfo: NewsListInfo;
      author?: Author;
      vRelateList?: Array<NewsListInfo>;
      mutimedia?: Array<MultimediaInfo>;
      vContent?: Array<string>;
      vTagInfo?: Array<TagInfo>;
    }
    interface QueryNewsReq {
      userInfo: UserBaseInfo;
      listType: E_List_Type;
      newsTitle: string;
      publishDate: string;
      reqType?: number;
    }
    enum E_Key_Type {
      EKT_TITLE = 0,
      EKT_SOURCE = 1,
      EKT_TIMESPAN = 2,
      EKT_SUMMARY = 3,
      EKT_CONTENT = 4,
      EKT_AUTHOR = 5,
      EKT_RELATE_STOCK = 6,
      EKT_TAGS = 7,
      EKT_CONTENT_IMG = 8,
      EKT_HEAT_STATUS = 9,
      EKT_LIST_IMG = 10,
      EKT_TAG = 11,
      EKT_NEWS_ATTACH = 12,
    }
    interface ModifyNewsReq {
      userInfo: UserBaseInfo;
      newsInfo: QueryNewsInfo;
      operateType: number;
      vKeyList?: Array<E_Key_Type>;
    }
    interface ModifyNewsRsp {
      ret: number;
      newsId?: string;
      msgInfo?: string;
    }
    interface ModifyNewsNode {
      allInfo: NewsServerNode;
      operateType: number;
      listType: number;
      insertTime: string;
      vDelStockList?: Array<StockInfo>;
      vAddStockList?: Array<StockInfo>;
      vDelTagList?: Array<TagInfo>;
      vAddTagList?: Array<TagInfo>;
      vModifyKeyList?: Array<E_Key_Type>;
      hasAnyBaseChange?: boolean;
    }
    interface UrlBaseInfo {
      userName: string;
      guId: string;
      bussId?: string;
      stockCode?: string;
      newsId?: string;
      listType?: string;
      pcFlag?: boolean;
      userNameEncoded?: boolean;
      pcHtmlUrlBase?: string;
      htmlUrlBase?: string;
      pcUrlTable?: Record<string, string>;
      baseUrlTable?: Record<string, string>;
      picPercent?: string;
      relateFlag?: string;
    }
    interface UserNode {
      upId: string;
    }
    interface SelfStockInfo {
      stock_code: string;
      market?: number;
    }
    interface UserStock {
      stockList: Array<SelfStockInfo>;
      timeStamp: string;
    }
    interface StockListKey {
      stockKey: string;
    }
    interface CodeListKey {
      tagType: number;
    }
    interface StkUserInfo {
      stock_code: string;
      market?: number;
      lastYQNewsId?: DataNode;
      lastDPNewsId?: DataNode;
    }
    interface StockInfoSM {
      stock_code: string;
      stock_name: string;
      market?: number;
      secUniCode?: string;
      industryCode?: string;
    }
    interface CodeListValue {
      codeList: Array<StockInfoSM>;
    }
    enum NIC_LIST_TYPE {
      NLT_STATIC_LIST = 1,
      NLT_AUTO_LIST = 2,
      NLT_RELA_LIST = 3,
      NLT_MAP_LIST = 4,
      NLT_EXTEND_LIST = 5,
    }
    interface AdBaseConfNode {
      adPartId?: number;
      adPlatform?: number;
    }
    enum E_AD_INSERT_TYPE {
      EAIT_GAP_TYPE = 1,
      EAIT_GAP_NO_CYCLE = 2,
    }
    interface AdConf {
      isWork?: boolean;
      insertType?: number;
      gap?: number;
      adConfList?: Array<AdBaseConfNode>;
      startOffSet?: number;
    }
  }
}
export {};