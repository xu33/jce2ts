declare global {
  namespace NTG {
    enum RET_CODE {
      SUCCESS = 0,
      ERROR = -999,
      PARAM_INVALID = -101,
      UNKNOWN = -9999,
    }
    interface BasicInfo {
      upName?: string;
      token?: string;
      platform?: string;
      device?: string;
      appId?: string;
      appVersion?: string;
      channel?: string;
      manufacturer?: string;
      system?: string;
      iMei?: string;
    }
    interface WorkWeChatInfo {
      corpId?: string;
      corpSecret?: string;
      agentId?: string;
      toParty?: string;
      toTag?: string;
      toUsers?: string;
      author?: string;
      thumbMediaId?: string;
      adContentForWeChat?: string;
    }
    interface TgInfo {
      id?: number;
      userId?: number;
      license?: string;
      type?: number;
      name?: string;
      idCard?: string;
      nickName?: string;
      company?: string;
      sex?: number;
      province?: string;
      city?: string;
      tel?: string;
      email?: string;
      qq?: string;
      intro?: string;
      stockAge?: number;
      profession?: number;
      credentialsUrl?: string;
      prove?: string;
      proveUrl?: string;
      updateTime?: string;
      avatar?: string;
      status?: number;
      createTime?: string;
      description?: string;
      tgUpName?: string;
      weChat?: string;
      icon?: string;
      weChatName?: string;
      styleIntro?: string;
      vipIntro?: string;
      goldStockIntro?: string;
      courseIntro?: string;
      groupIntro?: string;
      customerServiceUrl?: string;
      vipServiceIntro?: string;
      tags?: Array<string>;
    }
    interface TgDetail {
      tgInfo?: TgInfo;
      fans?: string;
      followStatus?: number;
      extra?: string;
    }
    interface UserInfo {
      userId?: number;
      userName?: string;
      upName?: string;
      avatar?: string;
      type?: number;
    }
    interface VideoInfo {
      coverUrl?: string;
      videoUrl?: string;
    }
    interface Stock {
      shtMarket?: number;
      sCode?: string;
      sName?: string;
    }
    interface ArticleBasicInfo {
      id?: number;
      tgId?: string;
      title?: string;
      content?: string;
      summary?: string;
      type?: number;
      cost?: string;
      createTime?: string;
      updateTime?: string;
      publishTime?: string;
      status?: number;
      tagType?: string;
      riskLevel?: number;
      description?: string;
      extra?: string;
      marketingWord?: string;
      audioMessage?: string;
      adContent?: string;
      videoInfo?: VideoInfo;
      img?: Array<string>;
      extraInfo?: string;
      tgUpName?: string;
      isPush?: number;
      cronTime?: string;
      relateStock?: Array<Stock>;
      coverImg?: string;
      adContentForIOS?: string;
      serviceType?: string;
      tagTypeName?: string;
      serviceTypeName?: string;
      syncWeChat?: string;
      rightType?: string;
    }
    interface ArticleDetailExtra {
      basicInfo?: ArticleBasicInfo;
      userInfo?: TgInfo;
      commentCount?: number;
      readCount?: number;
      favorites?: number;
      saleCount?: number;
      rewardCount?: number;
      shareCount?: number;
      isFavorite?: number;
      buyStatus?: number;
      tgDetail?: TgDetail;
      isRecommend?: number;
      recommendTime?: string;
      collectStatus?: number;
      articleDetailUrl?: string;
      workWeChatInfo?: WorkWeChatInfo;
    }
    interface ViewDetail {
      basicInfo?: ArticleBasicInfo;
      userInfo?: TgInfo;
      commentCount?: number;
      readCount?: number;
      favorites?: number;
      saleCount?: number;
      rewardCount?: number;
    }
    interface GoldStockRecord {
      id?: number;
      tgUpName?: string;
      business?: string;
      bId?: string;
      goldStockId?: number;
      stockCode?: string;
      stockName?: string;
      type?: number;
      reason?: string;
      createTime?: string;
      stockMarket?: string;
      price?: string;
      change?: string;
      changeRate?: string;
    }
    interface TopicBasicInfo {
      id?: number;
      tgId?: string;
      title?: string;
      content?: string;
      summary?: string;
      type?: number;
      cost?: string;
      createTime?: string;
      updateTime?: string;
      publishTime?: string;
      status?: number;
      tagType?: string;
      riskLevel?: number;
      description?: string;
      extra?: string;
      marketingWord?: string;
      audioMessage?: string;
      adContent?: string;
      videoInfo?: VideoInfo;
      img?: Array<string>;
      extraInfo?: string;
      tgUpName?: string;
      isPush?: number;
      cronTime?: string;
      relateStock?: Array<Stock>;
      coverImg?: string;
      adContentForIOS?: string;
    }
    interface TopicDetailExtra {
      basicInfo?: TopicBasicInfo;
      userInfo?: TgInfo;
      commentCount?: number;
      readCount?: number;
      favorites?: number;
      saleCount?: number;
      rewardCount?: number;
      shareCount?: number;
      isFavorite?: number;
      buyStatus?: number;
      tgDetail?: TgDetail;
      isRecommend?: number;
      recommendTime?: string;
      collectStatus?: number;
    }
    interface TopicDetail {
      basicInfo?: TopicBasicInfo;
      userInfo?: TgInfo;
      commentCount?: number;
      readCount?: number;
      favorites?: number;
      saleCount?: number;
      rewardCount?: number;
    }
    interface LiveBasicInfo {
      id: number;
      upName?: string;
      title?: string;
      summary?: string;
      type?: number;
      cost?: string;
      status?: number;
      createTime?: string;
      updateTime?: string;
      adPic?: string;
      adUrl?: string;
    }
    interface LiveDetail {
      liveBasicInfo?: LiveBasicInfo;
      saleCount?: number;
      tgDetail?: TgDetail;
    }
    interface StageLiveBasicInfo {
      id: number;
      upName?: string;
      liveId?: number;
      no?: string;
      summary?: string;
      status?: number;
      createTime?: string;
      updateTime?: string;
      groupId?: string;
      liveBasicInfo?: LiveBasicInfo;
    }
    interface StageLiveDetail {
      stageLiveBasicInfo?: StageLiveBasicInfo;
      commentCount?: number;
      favoriteCount?: number;
      participants?: number;
      saleCount?: number;
      rewardCount?: number;
      contentCount?: number;
      tgDetail?: TgDetail;
      isRecommend?: number;
      recommendTime?: string;
    }
    interface LiveContent {
      id: number;
      upName?: string;
      liveId?: number;
      stageLiveId?: number;
      type?: number;
      content?: string;
      pics?: Array<string>;
      thumbnails?: Array<string>;
      status?: number;
      createTime?: string;
      updateTime?: string;
      messageType?: number;
      relateStock?: Array<Stock>;
    }
    interface LiveMsg {
      id?: number;
      replyId?: number;
      upName?: string;
      liveId?: number;
      liveStageId?: number;
      content?: string;
      isDelete?: number;
      status?: number;
      updateTime?: string;
    }
    interface LiveDictionary {
      id?: number;
      dicKey?: string;
      dicValue?: string;
      extraType?: number;
      extraValue?: string;
    }
    interface GagInfo {
      upName?: string;
      liveId?: number;
      status?: number;
    }
    interface LiveMsgDetail {
      msgInfo?: LiveMsg;
      userInfo?: TgDetail;
      replyInfo?: LiveMsg;
      replyUserInfo?: TgDetail;
      gagInfo?: GagInfo;
    }
    interface StageLive {
      total?: number;
      stageLives?: Array<StageLiveDetail>;
    }
    interface StageLiveMsg {
      total?: number;
      liveMessages?: Array<LiveMsgDetail>;
    }
    interface StageLiveContent {
      total?: number;
      liveContents?: Array<LiveContent>;
    }
    interface RecommendMsg {
      msgInfo?: LiveMsgDetail;
      tgInfo?: TgInfo;
      stageLiveInfo?: StageLiveBasicInfo;
    }
    interface StageLiveNotice {
      total?: number;
      latestContent?: LiveContent;
      stageLiveInfo?: StageLiveBasicInfo;
    }
    interface CriterionOrderInfo {
      iosRightId?: string;
      iosOrderUrl?: string;
      iosCallbackUrl?: string;
      iosSpecialRightId?: string;
      rightId?: string;
      orderUrl?: string;
      callbackUrl?: string;
      specialRightId?: string;
      iosDisPlayPrice?: string;
      disPlayPrice?: string;
    }
  }
}
export {};