declare global {
  namespace News {
    interface Broker {
      getColumnInfo: (req: ColumnInfoReq) => ColumnInfoRsp;
      getResearchNewsContent: (req: NewsContentReq) => ResearchContentRsp;
      getNewsContent: (req: NewsContentReq) => NewsContentRsp;
      getLiveList: (req: NewsIdListReq) => LiveListRsp;
      getNewsList: (req: NewsListReq) => NewsListRsp;
      getAllList: (req: NewsReq) => NewsRsp;
      getColumnBriefList: (req: NewsIdListReq) => NewsListRsp;
      getBriefList: (req: NewsIdListReq) => NewsListRsp;
      getStocksNews: (req: stocksNewsReq) => NewsIdListRsp;
      getIdList: (req: NewsIdListReq) => NewsIdListRsp;
      getBannerList: (req: NewsBannerReq) => NewsBannerRsp;
    }
  }
}
export {};