declare global {
  namespace NTG {
    interface FeedsInfo {
      index?: string;
      author?: string;
      type?: number;
      id?: string;
      subType?: number;
      subId?: string;
      title?: string;
      summary?: string;
      img?: Array<string>;
      extra?: string;
      status?: number;
      updateTime?: string;
      recommendTime?: string;
      cost?: string;
      marketing?: string;
      tagType?: string;
      criterionProductId?: string;
      exKey?: string;
      buyStatus?: number;
      costType?: number;
      relateStock?: Array<Stock>;
      content?: string;
      serviceType?: string;
      detailUrl?: string;
      rightType?: string;
    }
    interface InjectInfoReq {
      basicInfo?: BasicInfo;
      info?: FeedsInfo;
    }
    interface InjectInfoRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface QueryInfoCond {
      type?: number;
      tgUserNames?: Array<string>;
      contentTypes?: Array<number>;
      tagName?: string;
      rightType?: string;
    }
    interface QueryInfoReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      userName?: string;
      condition?: QueryInfoCond;
    }
    interface QueryInfoResult {
      total?: number;
      status?: number;
      list?: Array<FeedsInfo>;
    }
    interface QueryInfoRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryInfoResult;
    }
    interface QueryVipInfoCond {
      type?: number;
      tgUserNames?: Array<string>;
    }
    interface QueryVipInfoReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      userName?: string;
      condition?: QueryVipInfoCond;
    }
    interface QueryVipInfoResult {
      total?: number;
      status?: number;
      list?: Array<FeedsInfo>;
    }
    interface QueryVipInfoRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryVipInfoResult;
    }
    interface UpdateFeedStatusReq {
      basicInfo?: BasicInfo;
      index?: string;
      status?: number;
      author?: string;
      type?: number;
      id?: string;
    }
    interface UpdateFeedStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SetRecommendFeedReq {
      basicInfo?: BasicInfo;
      index?: number;
      status?: number;
      recommendKey?: string;
      author?: string;
      type?: number;
      id?: string;
    }
    interface SetRecommendFeedRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetRecommendFeedReq {
      basicInfo?: BasicInfo;
      userName?: string;
      recommendKey?: string;
      author?: string;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
    }
    interface GetRecommendFeedRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryInfoResult;
    }
    interface SearchFeedsReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      recommendKey?: string;
      keyWord?: string;
    }
    interface FeedDetail {
      tgInfo?: TgInfo;
      feed?: FeedsInfo;
      readCount?: number;
      favCount?: number;
      rewardCount?: number;
      shareCount?: number;
    }
    interface FeedListRsp {
      total?: number;
      status?: number;
      list?: Array<FeedDetail>;
    }
    interface SearchFeedsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: FeedListRsp;
    }
    interface BroadcastReq {
      type?: number;
      cmd?: string;
      data?: string;
    }
    interface BroadcastRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetFeedsByAuthorReq {
      basicInfo?: BasicInfo;
      author?: string;
      type?: number;
      id?: string;
      subType?: number;
      subId?: string;
      costType?: number;
    }
    interface GetFeedsByAuthorRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryInfoResult;
    }
    interface SetFeedTagsReq {
      basicInfo?: BasicInfo;
      queryInfoCondList?: Array<QueryInfoCond>;
      type?: number;
    }
    interface SetFeedTagsRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetFeedTagsReq {
      basicInfo?: BasicInfo;
      type?: number;
      upName?: string;
    }
    interface GetFeedTagsRsp {
      ret?: RET_CODE;
      message?: string;
      queryInfoCondList?: Array<QueryInfoCond>;
    }
    interface GetFeedsByHotAuthorReq {
      basicInfo?: BasicInfo;
      type?: number;
    }
    interface HotRecommend {
      backgroundUrl?: string;
      productId?: string;
      productType?: string;
      title?: string;
      intro?: string;
      icon?: string;
      buttonName?: string;
      backgroundColor?: string;
      url?: string;
      extro?: string;
      description?: string;
      t?: string;
    }
    interface FeedsByHotAuthor {
      feedsInfo?: FeedsInfo;
      hotRecommend?: HotRecommend;
    }
    interface GetFeedsByHotAuthorRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<FeedsByHotAuthor>;
    }
    interface PublishCommentReq {
      basicInfo?: BasicInfo;
      userName?: string;
      business?: string;
      bId?: number;
      replyId?: string;
      replyUser?: string;
      type?: number;
      body?: string;
      status?: number;
      unlimited?: number;
    }
    interface CrmUser {
      userName?: string;
      userId?: string;
      avatar?: string;
      nickName?: string;
      realNickName?: string;
      type?: number;
      isMember?: number;
    }
    interface Comment {
      id?: string;
      uId?: string;
      bus?: string;
      bId?: number;
      rId?: string;
      rUId?: string;
      type?: number;
      body?: string;
      cost?: number;
      t?: string;
      status?: number;
      fav?: number;
      uInfo?: CrmUser;
      isRecommend?: number;
    }
    interface CommentDetail {
      id?: string;
      uId?: string;
      bus?: string;
      bId?: number;
      rId?: string;
      rUId?: string;
      type?: number;
      body?: string;
      cost?: number;
      t?: string;
      status?: number;
      fav?: number;
      uInfo?: CrmUser;
      rInfo?: Comment;
      favStatus?: number;
      tgDetail?: TgDetail;
      isRecommend?: number;
      buyStatus?: number;
      originBody?: string;
    }
    interface PublishCommentData {
      id?: string;
      commentDetail?: CommentDetail;
    }
    interface PublishCommentRsp {
      ret?: RET_CODE;
      message?: string;
      data?: PublishCommentData;
    }
    interface UpdateCommentStatusReq {
      basicInfo?: BasicInfo;
      business?: string;
      bId?: number;
      id?: string;
      status?: number;
    }
    interface UpdateCommentStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GagUserReq {
      basicInfo?: BasicInfo;
      type?: number;
      business?: string;
      bId?: number;
      userName?: string;
      status?: number;
    }
    interface GagUserRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SetRecommendCommentReq {
      basicInfo?: BasicInfo;
      business?: string;
      recommendKey?: string;
      id?: number;
      reason?: string;
      status?: number;
    }
    interface SetRecommendCommentRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetRecommendCommentReq {
      basicInfo?: BasicInfo;
      business?: string;
      recommendKey?: string;
    }
    interface CommentListRsp {
      total?: number;
      status?: number;
      list?: Array<CommentDetail>;
    }
    interface GetRecommendCommentRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CommentListRsp;
    }
    interface GetCommentsFilterGagReq {
      basicInfo?: BasicInfo;
      type?: number;
      business?: string;
      bId?: number;
      direction?: number;
      referId?: number;
      offset?: number;
      size?: number;
    }
    interface GetCommentsFilterGagRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CommentListRsp;
    }
    interface GetCommentsReq {
      basicInfo?: BasicInfo;
      userName?: string;
      business?: string;
      bId?: number;
      direction?: number;
      referId?: number;
      offset?: number;
      size?: number;
    }
    interface GetCommentsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CommentListRsp;
    }
    interface GetMyCommentsReq {
      basicInfo?: BasicInfo;
      userName?: string;
      business?: string;
      bId?: number;
      direction?: number;
      referId?: number;
      offset?: number;
      size?: number;
      onlyReplied?: number;
    }
    interface GetMyCommentsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CommentListRsp;
    }
    interface GetCommentsByIdReq {
      basicInfo?: BasicInfo;
      userName?: string;
      business?: string;
      ids?: Array<number>;
      type?: number;
    }
    interface GetCommentsByIdRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<CommentDetail>;
    }
    interface GetMultilevelCommentsReq {
      basicInfo?: BasicInfo;
      type?: number;
      userName?: string;
      business?: string;
      bId?: number;
      direction?: number;
      referId?: number;
      offset?: number;
      size?: number;
    }
    interface MultilevelComment {
      id?: string;
      uId?: string;
      bus?: string;
      bId?: number;
      rId?: string;
      rUId?: string;
      type?: number;
      body?: string;
      cost?: number;
      t?: string;
      status?: number;
      fav?: number;
      uInfo?: CrmUser;
      rUInfo?: CrmUser;
    }
    interface ReplyCommentList {
      total?: number;
      status?: number;
      list?: Array<MultilevelComment>;
    }
    interface MultilevelCommentDetail {
      id?: string;
      uId?: string;
      bus?: string;
      bId?: number;
      rId?: string;
      rUId?: string;
      type?: number;
      body?: string;
      cost?: number;
      t?: string;
      status?: number;
      fav?: number;
      uInfo?: CrmUser;
      rUInfo?: CrmUser;
      rInfo?: MultilevelComment;
      bReply?: ReplyCommentList;
    }
    interface MultilevelCommentsRsp {
      total?: number;
      status?: number;
      list?: Array<MultilevelCommentDetail>;
    }
    interface GetMultilevelCommentsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: MultilevelCommentsRsp;
    }
    interface GetReplyCommentsReq {
      basicInfo?: BasicInfo;
      type?: number;
      userName?: string;
      business?: string;
      bId?: number;
      replyCommentId?: number;
      direction?: number;
      referId?: number;
      offset?: number;
      size?: number;
    }
    interface GetReplyCommentsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: ReplyCommentList;
    }
    interface RecommendCommentBatch {
      business?: string;
      recommendKey?: string;
      data?: Array<CommentDetail>;
    }
    interface GetRecommendCommentBatchReq {
      basicInfo?: BasicInfo;
      keys?: Array<RecommendCommentBatch>;
    }
    interface GetRecommendCommentBatchRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<RecommendCommentBatch>;
    }
    interface UpdateCommentFavReq {
      basicInfo?: BasicInfo;
      type?: number;
      userName?: string;
      business?: string;
      bId?: number;
      commentId?: number;
    }
    interface UpdateCommentFavRsp {
      ret?: RET_CODE;
      message?: string;
      data?: number;
    }
    interface GetCommentBusinessReq {
      basicInfo?: BasicInfo;
      tgId?: string;
      business?: string;
    }
    interface CommentBusiness {
      tgId?: string;
      business?: string;
      bId?: number;
      bName?: string;
    }
    interface GetCommentBusinessRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CommentBusiness;
    }
    interface SearchCommentsReq {
      basicInfo?: BasicInfo;
      recommendKey?: string;
      userName?: string;
      business?: string;
      bId?: number;
      direction?: number;
      referId?: number;
      offset?: number;
      size?: number;
    }
    interface RecommendComment {
      rInfo?: Comment;
      recommendTime?: string;
      recommendReason?: string;
      bName?: string;
    }
    interface RecommendCommentRsp {
      total?: number;
      status?: number;
      list?: Array<RecommendComment>;
    }
    interface SearchCommentsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: RecommendCommentRsp;
    }
    interface QueryCommentStatisticsReq {
      basicInfo?: BasicInfo;
      startTime?: string;
      endTime?: string;
    }
    interface CommentStatistics {
      userName?: string;
      userCount?: number;
      commentCount?: number;
      buyPayment?: string;
      rewardPayment?: string;
    }
    interface QueryCommentStatisticsRsp {
      iRet?: RET_CODE;
      message?: string;
      data?: Array<CommentStatistics>;
    }
    interface UpdateRecommendInFeedReq {
      basicInfo?: BasicInfo;
      uId?: string;
      bId?: number;
      id?: string;
      body?: string;
      type?: number;
    }
    interface UpdateRecommendInFeedRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface Tweet {
      id?: string;
      userId?: string;
      content?: string;
      img?: Array<string>;
      extra?: string;
      status?: number;
      isPush?: number;
      createTime?: string;
      updateTime?: string;
      marketing?: string;
      cost?: string;
      cronTime?: string;
      tagType?: string;
      criterionProductId?: string;
      exKey?: string;
      type?: number;
      relateStock?: Array<Stock>;
    }
    interface PublishTweetReq {
      basicInfo?: BasicInfo;
      tweet?: Tweet;
    }
    interface PublishTweetRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Tweet;
    }
    interface OperateTweetReq {
      basicInfo?: BasicInfo;
      tweet?: Tweet;
      editProps?: Array<string>;
    }
    interface OperateTweetRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Tweet;
    }
    interface PushTweetReq {
      basicInfo?: BasicInfo;
      id?: string;
    }
    interface PushTweetRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface TweetDetail {
      tgInfo?: TgInfo;
      tweet?: Tweet;
      readCount?: number;
      favCount?: number;
      rewardCount?: number;
      shareCount?: number;
      commentCount?: number;
      favStatus?: number;
      tgDetail?: TgDetail;
      buyStatus?: number;
      collectStatus?: number;
    }
    interface TweetListRsp {
      total?: number;
      status?: number;
      list?: Array<TweetDetail>;
    }
    interface GetTgTweetsReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      userId?: string;
      type?: number;
    }
    interface GetTgTweetsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: TweetListRsp;
    }
    interface GetTweetsByIdReq {
      basicInfo?: BasicInfo;
      ids?: Array<string>;
      type?: number;
    }
    interface GetTweetsByIdRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<TweetDetail>;
    }
    interface UpdateTweetStatusReq {
      basicInfo?: BasicInfo;
      id?: string;
      status?: number;
    }
    interface UpdateTweetStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface UpdateTweetExtraReq {
      basicInfo?: BasicInfo;
      id?: string;
      operateType?: number;
      name?: string;
      count?: number;
    }
    interface UpdateTweetExtraRsp {
      ret?: RET_CODE;
      message?: string;
      data?: number;
    }
    interface SearchTweetsReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      recommendKey?: string;
      keyWord?: string;
      searchType?: number;
    }
    interface SearchTweetsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: TweetListRsp;
    }
    interface QueryTweetStatisticReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      keyWord?: string;
      startTime?: string;
      endTime?: string;
      sortBy?: string;
      sortKey?: string;
    }
    interface TweetStatistic {
      tgDetail?: TgDetail;
      total?: number;
      readCount?: number;
      favCount?: number;
      rewardCount?: number;
      shareCount?: number;
      commentCount?: number;
      avgReadCount?: number;
    }
    interface TweetStatisticRsp {
      total?: number;
      status?: number;
      list?: Array<TweetStatistic>;
    }
    interface QueryTweetStatisticRsp {
      ret?: RET_CODE;
      message?: string;
      data?: TweetStatisticRsp;
    }
    interface VideoLive {
      id?: string;
      userId?: string;
      title?: string;
      url?: string;
      img?: Array<string>;
      extra?: string;
      status?: number;
      isPush?: number;
      createTime?: string;
      updateTime?: string;
      costType?: number;
      videoType?: number;
      liveStartTime?: string;
      liveEndTime?: string;
    }
    interface PublishVideoLiveReq {
      basicInfo?: BasicInfo;
      videoLive?: VideoLive;
    }
    interface PublishVideoLiveRsp {
      ret?: RET_CODE;
      message?: string;
      data?: VideoLive;
    }
    interface PushVideoLiveReq {
      basicInfo?: BasicInfo;
      id?: string;
    }
    interface PushVideoLiveRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface VideoLiveDetail {
      tgInfo?: TgInfo;
      videoLive?: VideoLive;
      readCount?: number;
      favCount?: number;
      rewardCount?: number;
      shareCount?: number;
      commentCount?: number;
      favStatus?: number;
      tgDetail?: TgDetail;
      collectStatus?: number;
      isRecommend?: number;
    }
    interface VideoLiveListRsp {
      total?: number;
      status?: number;
      list?: Array<VideoLiveDetail>;
    }
    interface GetTgVideoLivesReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      userId?: string;
      type?: number;
      recommendKey?: string;
    }
    interface GetTgVideoLivesRsp {
      ret?: RET_CODE;
      message?: string;
      data?: VideoLiveListRsp;
    }
    interface GetVideoLivesByIdReq {
      basicInfo?: BasicInfo;
      ids?: Array<string>;
      type?: number;
    }
    interface GetVideoLivesByIdRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<VideoLiveDetail>;
    }
    interface UpdateVideoLiveStatusReq {
      basicInfo?: BasicInfo;
      id?: string;
      status?: number;
    }
    interface UpdateVideoLiveStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface UpdateVideoLiveExtraReq {
      basicInfo?: BasicInfo;
      id?: string;
      operateType?: number;
      name?: string;
      count?: number;
    }
    interface UpdateVideoLiveExtraRsp {
      ret?: RET_CODE;
      message?: string;
      data?: number;
    }
    interface SearchVideoLivesReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      recommendKey?: string;
      keyWord?: string;
    }
    interface SearchVideoLivesRsp {
      ret?: RET_CODE;
      message?: string;
      data?: VideoLiveListRsp;
    }
    interface GetVideoLivesReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      videoType?: number;
    }
    interface GetVideoLivesRsp {
      ret?: RET_CODE;
      message?: string;
      data?: VideoLiveListRsp;
    }
    interface UpdateBusinessExtraReq {
      basicInfo?: BasicInfo;
      business?: string;
      subBus?: string;
      bId?: string;
      userRelated?: number;
      operateType?: number;
      name?: string;
      count?: number;
    }
    interface UpdateBusinessExtraRsp {
      ret?: RET_CODE;
      message?: string;
      data?: number;
    }
    interface BusinessExtra {
      business?: string;
      bId?: string;
      extra?: string;
    }
    interface QueryBusinessExtraReq {
      basicInfo?: BasicInfo;
      userName?: string;
      userRelated?: number;
      bIds?: Array<BusinessExtra>;
    }
    interface QueryBusinessExtraRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<BusinessExtra>;
    }
    interface GetTgInfoReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
    }
    interface GetTgInfoData {
      tgInfo?: TgInfo;
    }
    interface GetTgInfoRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTgInfoData;
    }
    interface UpdateTgInfoReq {
      basicInfo?: BasicInfo;
      tgInfo?: TgInfo;
      onlyUpdateCache?: number;
    }
    interface UpdateTgInfoRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTgInfoBatchReq {
      basicInfo?: BasicInfo;
      tgUpNames?: Array<string>;
    }
    interface GetTgInfoBatchData {
      tgs?: Array<TgInfo>;
    }
    interface GetTgInfoBatchRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTgInfoBatchData;
    }
    interface GetTgInfoListReq {
      basicInfo?: BasicInfo;
      type?: number;
      upName?: string;
      offset?: number;
      size?: number;
    }
    interface TgListInfo {
      tgInfo?: TgInfo;
      fans?: string;
      followStatus?: number;
      recommendTime?: string;
      reason?: string;
    }
    interface GetTgInfoListData {
      total?: number;
      list?: Array<TgListInfo>;
    }
    interface GetTgInfoListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTgInfoListData;
    }
    interface SetRecommendReq {
      basicInfo?: BasicInfo;
      recommendKey?: string;
      tgUpName?: string;
      reason?: string;
      operateType?: number;
    }
    interface SetRecommendRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTgsReq {
      basicInfo?: BasicInfo;
      type?: number;
      offset?: number;
      size?: number;
      searchKey?: string;
    }
    interface GetTgsData {
      total?: number;
      status?: number;
      list?: Array<TgListInfo>;
    }
    interface GetTgsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTgsData;
    }
    interface GetRecommendTgListReq {
      basicInfo?: BasicInfo;
      recommendKey?: string;
      upName?: string;
      offset?: number;
      size?: number;
    }
    interface GetRecommendTgListData {
      total?: number;
      list?: Array<TgListInfo>;
    }
    interface GetRecommendTgListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetRecommendTgListData;
    }
    interface FollowTgReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
      status?: number;
      upName?: string;
    }
    interface FollowTgRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetMyTgReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      upName?: string;
    }
    interface GetMyTgData {
      total?: number;
      list?: Array<TgDetail>;
    }
    interface GetMyTgRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetMyTgData;
    }
    interface GetTgListReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      upName?: string;
    }
    interface TgListRsp {
      total?: number;
      list?: Array<TgDetail>;
    }
    interface GetTgListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: TgListRsp;
    }
    interface GetTgDetailBatchReq {
      basicInfo?: BasicInfo;
      tgUpNames?: Array<string>;
      upName?: string;
    }
    interface GetTgDetailBatchData {
      tgDetail?: Array<TgDetail>;
    }
    interface GetTgDetailBatchRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTgDetailBatchData;
    }
    interface GetUserInfoByUpNameBatchReq {
      basicInfo?: BasicInfo;
      upNames?: Array<string>;
    }
    interface GetUserInfoByUpNameBatchRsp {
      ret?: RET_CODE;
      message?: string;
      users?: Array<UserInfo>;
    }
    interface UserMap {
      userId?: number;
      userName?: string;
    }
    interface PushMsgReq {
      basicInfo?: BasicInfo;
      type?: number;
      tgUpName?: string;
      productType?: number;
      productId?: number;
      pushPlatform?: number;
      targetId?: number;
      targetName?: string;
      targetType?: number;
      messageType?: number;
      pushContent?: string;
      upName?: string;
      startTime?: string;
      url?: string;
      toUsers?: Array<UserMap>;
    }
    interface PushMsgRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SendSmsReq {
      basicInfo?: BasicInfo;
      type?: number;
      tgId?: number;
      productType?: number;
      productId?: number;
      msg?: string;
      toUsers?: Array<UserMap>;
    }
    interface SendSmsRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetUserRightReq {
      basicInfo?: BasicInfo;
      orderType?: number;
      offset?: number;
      size?: number;
      upName?: string;
    }
    interface UserRight {
      id?: number;
      updateTime?: string;
      startTime?: string;
      endTime?: string;
    }
    interface GetUserRightRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<UserRight>;
    }
    interface TabInfo {
      type?: number;
      subType?: number;
      name?: string;
      productId?: number;
      icon?: string;
      url?: string;
      priId?: number;
      status?: number;
      tabFlag?: number;
    }
    interface SetTgTabReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
      tabs?: Array<TabInfo>;
      type?: number;
    }
    interface SetTgTabRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTgTabReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
      type?: number;
      upName?: string;
    }
    interface GetTgTabRsp {
      ret?: RET_CODE;
      message?: string;
      tabs?: Array<TabInfo>;
      userVipRight?: number;
    }
    interface LoginReq {
      basicInfo?: BasicInfo;
      upName?: string;
      pwd?: string;
    }
    interface LoginRsp {
      ret?: RET_CODE;
      message?: string;
      userInfo?: UserInfo;
    }
    interface CreateCriterionProductReq {
      productId?: number;
      productType?: number;
      productName?: string;
      riskLevel?: number;
      investType?: number;
      investTime?: number;
      price?: number;
      oldPrice?: number;
      tgUpName?: string;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface CriterionProductData {
      criterionProductId?: string;
      exKey?: string;
    }
    interface CreateCriterionProductRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CriterionProductData;
    }
    interface CriterionProductInfo {
      productId?: number;
      productType?: number;
      exKey?: string;
      criterionProductId?: string;
      upName?: string;
      discountType?: number;
      rightId?: string;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface GetCriterionProductInfoBatchReq {
      basicInfo?: BasicInfo;
      criterionProductInfoList?: Array<CriterionProductInfo>;
      upName?: string;
    }
    interface GetCriterionProductInfoBatchRsp {
      ret?: RET_CODE;
      message?: string;
      criterionProductInfoList?: Array<CriterionProductInfo>;
    }
    interface GetTgProfileByProductIdReq {
      basicInfo?: BasicInfo;
      productId?: string;
    }
    interface TgProfile {
      upName?: string;
      productId?: string;
    }
    interface GetTgProfileByProductIdRsp {
      ret?: RET_CODE;
      message?: string;
      data?: TgProfile;
    }
    interface DisCountConfig {
      month?: number;
      days?: number;
      discount?: string;
      cost?: number;
    }
    interface VipProduct {
      iaUserId?: number;
      productTypes?: Array<number>;
      config?: Array<DisCountConfig>;
      intro?: string;
      productName?: string;
      riskLevel?: number;
      investType?: number;
      investTime?: number;
      status?: number;
      id?: number;
      createTime?: string;
      updateTime?: string;
      tgUpName?: string;
      img?: string;
    }
    interface CreateVipProductReq {
      basicInfo?: BasicInfo;
      vipProduct?: VipProduct;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface CreateVipProductRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface QueryVipProductReq {
      basicInfo?: BasicInfo;
      iaUserId?: number;
      keyword?: string;
      productType?: number;
      offset?: number;
      size?: number;
      tgUpName?: string;
    }
    interface QueryVipProductData {
      total?: number;
      list?: Array<VipProduct>;
    }
    interface QueryVipProductRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryVipProductData;
    }
    interface QueryVipProductDetailReq {
      basicInfo?: BasicInfo;
      vipProductId?: number;
    }
    interface DisCountProduct {
      id?: number;
      productId?: number;
      productType?: number;
      userId?: number;
      initialPrice?: string;
      activate?: number;
      cancelDiscount?: number;
      favourableType?: number;
      favourableRange?: string;
      favourablePrice?: string;
      discountType?: number;
      discountExtra?: string;
      productName?: string;
      discountDescription?: string;
      discountMonth?: string;
      riskLevel?: number;
    }
    interface DiscountInfo {
      total?: number;
      list?: Array<DisCountProduct>;
    }
    interface QueryVipProductDetailData {
      vipProduct?: VipProduct;
      discountInfo?: DiscountInfo;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface QueryVipProductDetailRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryVipProductDetailData;
    }
    interface QueryVipRightProductReq {
      basicInfo?: BasicInfo;
      userId?: number;
      vipProductId?: number;
      iaUserId?: number;
      offset?: number;
      size?: number;
      upName?: string;
      tgUpName?: string;
      referenceId?: string;
      direct?: number;
      productTypes?: Array<number>;
    }
    interface VipRightProduct {
      title?: string;
      intro?: string;
      productId?: number;
      productType?: number;
      tgInfo?: TgInfo;
      userRight?: Array<UserRight>;
      extra?: string;
      publishTime?: string;
      gId?: string;
    }
    interface QueryVipRightProduct {
      total?: number;
      list?: Array<VipRightProduct>;
      userRight?: Array<UserRight>;
      status?: number;
    }
    interface QueryVipRightProductRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryVipRightProduct;
    }
    interface QueryTgVipProductBatchReq {
      basicInfo?: BasicInfo;
      tgUpNames?: Array<string>;
      productType?: number;
    }
    interface QueryTgVipProductBatchData {
      tgUpName?: string;
      productTypes?: Array<number>;
    }
    interface QueryTgVipProductBatchRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<QueryTgVipProductBatchData>;
    }
    interface QueryVipProductBatchReq {
      basicInfo?: BasicInfo;
      productType?: number;
      tgUpNames?: Array<string>;
    }
    interface QueryVipProductBatchData {
      tgUpName?: string;
      list?: Array<VipProduct>;
    }
    interface QueryVipProductBatchRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<QueryVipProductBatchData>;
    }
    interface QueryUserRightByRightIdReq {
      basicInfo?: BasicInfo;
      productId?: number;
      productType?: number;
      rightId?: string;
      upName?: string;
    }
    interface QueryUserRightByRightIdRsp {
      ret?: RET_CODE;
      message?: string;
      endTime?: string;
      status?: number;
    }
    interface UpdateVipProductStatusReq {
      basicInfo?: BasicInfo;
      vipProductId?: number;
      status?: number;
    }
    interface UpdateVipProductStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface QueryUserVipRightReq {
      basicInfo?: BasicInfo;
      upName?: string;
      productTypes?: Array<number>;
    }
    interface UserVipRightData {
      productType?: number;
      tgUpName?: string;
      userRight?: UserRight;
    }
    interface QueryUserVipRightRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<UserVipRightData>;
    }
    interface SearchVipProductReq {
      basicInfo?: BasicInfo;
      keyword?: string;
      offset?: number;
      size?: number;
      direction?: number;
      referId?: number;
    }
    interface SearchVipProductData {
      total?: number;
      status?: number;
      list?: Array<VipProduct>;
    }
    interface SearchVipProductRsp {
      ret?: RET_CODE;
      message?: string;
      data?: SearchVipProductData;
    }
    interface OpenFreeUserRightReq {
      basicInfo?: BasicInfo;
      productId?: number;
      productType?: number;
      days?: number;
      productName?: string;
      upName?: string;
      tgUpName?: string;
    }
    interface OpenFreeUserRightRsp {
      ret?: RET_CODE;
      message?: string;
      crmOrderId?: string;
    }
    interface FollowTgBatchReq {
      basicInfo?: BasicInfo;
      tgUpNames?: Array<string>;
      status?: number;
      upName?: string;
    }
    interface FollowTgBatchRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetHomeOptimizationRecommendTgReq {
      basicInfo?: BasicInfo;
      upName?: string;
      offset?: number;
      size?: number;
    }
    interface HomeOptimizationRecommendTgData {
      total?: number;
      list?: Array<TgListInfo>;
    }
    interface GetHomeOptimizationRecommendTgRsp {
      ret?: RET_CODE;
      message?: string;
      data?: HomeOptimizationRecommendTgData;
    }
    interface GetUnionUserInfoByUpNameReq {
      basicInfo?: BasicInfo;
      upName?: string;
      plat?: string;
    }
    interface GetUnionUserInfoByUpNameRsp {
      ret?: RET_CODE;
      message?: string;
      user?: UserInfo;
    }
    interface CollectionInfo {
      index?: string;
      author?: string;
      type?: number;
      id?: string;
      subType?: number;
      subId?: string;
      title?: string;
      summary?: string;
      img?: Array<string>;
      extra?: string;
      status?: number;
      updateTime?: string;
      recommendTime?: string;
      cost?: number;
      marketing?: string;
      tagType?: string;
      criterionProductId?: string;
      exKey?: string;
      buyStatus?: number;
      costType?: number;
      relateStock?: Array<Stock>;
      content?: string;
    }
    interface CollectInfoReq {
      basicInfo?: BasicInfo;
      info?: CollectionInfo;
      status?: number;
    }
    interface CollectInfoRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface QueryMyCollectionReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      upName?: string;
    }
    interface QueryMyCollectionResult {
      total?: number;
      status?: number;
      list?: Array<CollectionInfo>;
    }
    interface QueryMyCollectionRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryMyCollectionResult;
    }
    interface QueryUserCollectStatusReq {
      basicInfo?: BasicInfo;
      type?: number;
      id?: string;
      upName?: string;
    }
    interface QueryUserCollectStatusRsp {
      ret?: RET_CODE;
      message?: string;
      status?: number;
    }
    interface ContentLabel {
      value?: number;
      label?: string;
      type?: number;
    }
    interface SetTgContentLabelReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
      contentLabels?: Array<ContentLabel>;
    }
    interface SetTgContentLabelRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTgContentLabelReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
    }
    interface GetTgContentLabelRsp {
      ret?: RET_CODE;
      message?: string;
      contentLabels?: Array<ContentLabel>;
    }
    interface CollectProductInfo {
      productId?: number;
      productType?: number;
      status?: number;
    }
    interface QueryUserCollectStatusBatchReq {
      basicInfo?: BasicInfo;
      upName?: string;
      list?: Array<CollectProductInfo>;
    }
    interface QueryUserCollectStatusBatchRsp {
      ret?: RET_CODE;
      message?: string;
      list?: Array<CollectProductInfo>;
    }
    interface QueryWeChatInfoByUpNameReq {
      basicInfo?: BasicInfo;
      upName?: string;
    }
    interface WeChatInfo {
      weChat?: string;
      weChatName?: string;
    }
    interface QueryWeChatInfoByUpNameRsp {
      ret?: RET_CODE;
      message?: string;
      data?: WeChatInfo;
    }
    interface GetTgStatisticsDataReq {
      basicInfo?: BasicInfo;
      tgName?: string;
      startTime?: string;
      endTime?: string;
      productType?: number;
      offset?: number;
      size?: number;
    }
    interface TgStatisticsData {
      commentCount?: number;
      readCount?: number;
      favCount?: number;
      saleCount?: number;
      tgUpName?: string;
      tgName?: string;
      total?: number;
    }
    interface TgStatisticsDataResult {
      total?: number;
      list?: Array<TgStatisticsData>;
    }
    interface GetTgStatisticsDataRsp {
      ret?: RET_CODE;
      message?: string;
      data?: TgStatisticsDataResult;
    }
    interface CreateDisCountProductReq {
      productId?: number;
      productType?: number;
      tgUpName?: string;
      disCountConfigs?: Array<DisCountConfig>;
      activate?: number;
      cancelDiscount?: number;
      favourableType?: number;
      favourableRange?: string;
      discountType?: number;
      discountExtra?: string;
      productName?: string;
      riskLevel?: number;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface CreateDisCountProductRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetRightUserReq {
      rightId?: number;
      id?: number;
      type?: number;
      offset?: number;
      size?: number;
    }
    interface RightUser {
      userId?: number;
      userName?: string;
      updateTime?: string;
      startTime?: string;
      endTime?: string;
    }
    interface GetRightUserRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<RightUser>;
    }
    interface ContentService {
      value?: number;
      service?: string;
      type?: number;
      contentLabels?: Array<ContentLabel>;
    }
    interface SetTgContentServiceReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
      contentServices?: Array<ContentService>;
    }
    interface SetTgContentServiceRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTgContentServiceReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
    }
    interface GetTgContentServiceRsp {
      ret?: RET_CODE;
      message?: string;
      contentServices?: Array<ContentService>;
    }
    interface GetTgContentServiceBatchReq {
      basicInfo?: BasicInfo;
      tgUpNames?: Array<string>;
    }
    interface ContentServiceData {
      tgUpName?: string;
      contentServices?: Array<ContentService>;
    }
    interface GetTgContentServiceBatchRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<ContentServiceData>;
    }
    interface GetAllContentServiceReq {
      basicInfo?: BasicInfo;
    }
    interface GetAllContentServiceRsp {
      ret?: RET_CODE;
      message?: string;
      contentServices?: Array<ContentService>;
    }
    interface GetRightUserAvatarBatchReq {
      basicInfo?: BasicInfo;
      rightIds?: Array<string>;
      ids?: Array<number>;
      type?: number;
      offset?: number;
      size?: number;
      flag?: number;
    }
    interface RightUserAvatar {
      avatars?: Array<string>;
      rightId?: string;
      id?: number;
      type?: number;
    }
    interface GetRightUserAvatarBatchRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<RightUserAvatar>;
    }
    interface GetCrmModulesReq {
      basicInfo?: BasicInfo;
      upName?: string;
      rightId?: string;
      productId?: number;
      productType?: number;
    }
    interface CrmModules {
      crmOrderId?: string;
      productId?: string;
      startTime?: string;
      endTime?: string;
    }
    interface GetCrmModulesRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<CrmModules>;
    }
    interface SetCriterionOrderInfoReq {
      basicInfo?: BasicInfo;
      productId?: number;
      productType?: number;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface SetCriterionOrderInfoRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetCriterionOrderInfoReq {
      basicInfo?: BasicInfo;
      productId?: number;
      productType?: number;
    }
    interface GetCriterionOrderInfoRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CriterionOrderInfo;
    }
    interface GetHotRecommendTgReq {
      basicInfo?: BasicInfo;
      recommendKey?: string;
      upName?: string;
      offset?: number;
      size?: number;
    }
    interface HotRecommendTgData {
      total?: number;
      list?: Array<TgDetail>;
    }
    interface GetHotRecommendTgRsp {
      ret?: RET_CODE;
      message?: string;
      data?: HotRecommendTgData;
    }
    interface GetRecommendBasic {
      basicInfo?: ArticleBasicInfo;
      userInfo?: TgInfo;
      commentCount?: number;
      readCount?: number;
      favorites?: number;
      saleCount?: number;
      rewardCount?: number;
      description?: string;
      picture?: string;
      isRecommend?: number;
      recommendTime?: string;
      articleDetailUrl?: string;
      tgDetail?: TgDetail;
    }
    interface GetRecommendBasicList {
      total?: number;
      list?: Array<GetRecommendBasic>;
    }
    interface GetArticleList {
      total?: number;
      list?: Array<ArticleDetailExtra>;
    }
    interface SaveArticleReq {
      basicInfo?: BasicInfo;
      articleBasic?: ArticleBasicInfo;
      workWeChatInfo?: WorkWeChatInfo;
    }
    interface SaveArticleRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface VerifyArticleReq {
      basicInfo?: BasicInfo;
      id?: number;
      status?: number;
    }
    interface VerifyArticleRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SetArticleRecommendReq {
      basicInfo?: BasicInfo;
      articleId?: number;
      recommendKey?: string;
      operateType?: number;
      description?: string;
      picture?: string;
    }
    interface SetArticleRecommendRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface OperateArticleReq {
      basicInfo?: BasicInfo;
      articleBasic?: ArticleBasicInfo;
      editProps?: Array<string>;
    }
    interface OperateArticleRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetRecommendListReq {
      basicInfo?: BasicInfo;
      direction?: number;
      type?: string;
      offset?: number;
      size?: number;
      upName?: string;
    }
    interface GetRecommendListRsp {
      ret?: RET_CODE;
      message?: string;
      list?: Array<GetRecommendBasic>;
    }
    interface GetHotArticleListReq {
      basicInfo?: BasicInfo;
    }
    interface GetHotArticleListRsp {
      ret?: RET_CODE;
      message?: string;
      list?: Array<GetRecommendBasic>;
    }
    interface GetViewDetailReq {
      basicInfo?: BasicInfo;
      articleId?: number;
      upName?: string;
      isUserGet?: boolean;
    }
    interface GetViewDetailRsp {
      ret?: RET_CODE;
      message?: string;
      data?: ArticleDetailExtra;
    }
    interface OperateExtra {
      name?: string;
      operateType?: number;
      count?: number;
    }
    interface UpdateArticleExtraReq {
      basicInfo?: BasicInfo;
      articleId?: number;
      upName?: string;
      extras?: Array<OperateExtra>;
    }
    interface UpdateArticleExtraRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTgArticleListByStatusReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
      status?: number;
      direction?: number;
      offset?: number;
      size?: number;
      referId?: number;
      recommendKey?: string;
    }
    interface GetTgArticleListByStatusRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetArticleList;
    }
    interface GetArticleListByTimeReq {
      basicInfo?: BasicInfo;
      referId?: number;
      offset?: number;
      size?: number;
      direction?: number;
    }
    interface GetArticleListByTimeRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetArticleList;
    }
    interface SearchArticlesReq {
      basicInfo?: BasicInfo;
      referId?: number;
      offset?: number;
      size?: number;
      direction?: number;
      keyWord?: string;
    }
    interface SearchArticlesRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetArticleList;
    }
    interface GetArticleListByIdReq {
      basicInfo?: BasicInfo;
      articleIds?: Array<number>;
    }
    interface GetArticleListByIdRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<ArticleDetailExtra>;
    }
    interface GetViewCountsReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
    }
    interface GetViewCountsRsp {
      ret?: RET_CODE;
      message?: string;
      allCount?: number;
      freeCount?: number;
      chargeCount?: number;
      allEarnings?: number;
    }
    interface GetManageArticleListReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      referId?: number;
    }
    interface GetManageArticleListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetArticleList;
    }
    interface SearchManageArticleListReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      keyWord?: string;
      referId?: number;
    }
    interface SearchManageArticleListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetArticleList;
    }
    interface GetOperateAllArticleListReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      recommendKey?: string;
      referId?: number;
    }
    interface GetOperateAllArticleListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetRecommendBasicList;
    }
    interface SearchOperateArticleListReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      recommendKey?: string;
      referId?: number;
      keyWord?: string;
    }
    interface SearchOperateArticleListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetRecommendBasicList;
    }
    interface GetViewsByKeyWordReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      keyWord?: string;
      referId?: number;
    }
    interface GetViewsByKeyWordRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetArticleList;
    }
    interface GetMyArticleReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      upName?: string;
      referId?: number;
    }
    interface GetMyArticleRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetArticleList;
    }
    interface GetTgRecentArticleReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      referId?: number;
      tgUpName?: string;
      startTime?: string;
    }
    interface GetTgRecentArticleRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetArticleList;
    }
    interface GetTgArticleCountBatchReq {
      basicInfo?: BasicInfo;
      upNames?: Array<string>;
    }
    interface GetTgArticleCountBatchRsp {
      ret?: RET_CODE;
      message?: string;
      list?: Array<Record<string, number>>;
    }
    interface GetArticleRewardList {
      userId?: number;
      userName?: string;
      upName?: string;
      avatar?: string;
    }
    interface GetArticleReward {
      list?: Array<GetArticleRewardList>;
      total?: number;
    }
    interface GetArticleRewardReq {
      basicInfo?: BasicInfo;
      articleId?: number;
    }
    interface GetArticleRewardRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetArticleReward;
    }
    interface GetTopNewsReq {
      basicInfo?: BasicInfo;
    }
    interface TopNews {
      productId?: number;
      productType?: number;
      feedIndex?: string;
      title?: string;
      updateTime?: string;
    }
    interface TopNewsData {
      morningTopNews?: Array<TopNews>;
      nightTopNews?: Array<TopNews>;
    }
    interface GetTopNewsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: TopNewsData;
    }
    interface QueryArticleStatisticReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      keyWord?: string;
      startTime?: string;
      endTime?: string;
      sortBy?: string;
      sortKey?: string;
    }
    interface ArticleStatistic {
      tgUpName?: string;
      total?: number;
      readCount?: number;
      favCount?: number;
      rewardCount?: number;
      shareCount?: number;
      commentCount?: number;
      avgReadCount?: number;
      realName?: string;
      nickName?: string;
    }
    interface ArticleStatisticRsp {
      total?: number;
      status?: number;
      list?: Array<ArticleStatistic>;
    }
    interface QueryArticleStatisticRsp {
      ret?: RET_CODE;
      message?: string;
      data?: ArticleStatisticRsp;
    }
    interface SendWorkWeChatMessageByArticleReq {
      basicInfo?: BasicInfo;
      noteTitle?: string;
      content?: string;
      marketingWord?: string;
      workWeChatInfo?: WorkWeChatInfo;
    }
    interface SendWorkWeChatMessageByArticleRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface Extra {
      name?: string;
      operateType?: number;
      count?: number;
      val?: string;
    }
    interface UpdateExtraReq {
      businessId?: string;
      type?: number;
      id?: string;
      extras?: Array<Extra>;
      upName?: string;
    }
    interface UpdateExtraRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetExtraBatchReq {
      businessId?: string;
      ids?: Array<string>;
      upName?: string;
    }
    interface GetExtraBatchData {
      id?: string;
      extras?: Array<Extra>;
    }
    interface GetExtraBatchRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GetExtraBatchData>;
    }
    interface SetHotRecommendReq {
      basicInfo?: BasicInfo;
      recommendKey?: string;
      data?: HotRecommend;
      status?: number;
    }
    interface SetHotRecommendRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetHotRecommendReq {
      basicInfo?: BasicInfo;
      recommendKey?: string;
      direction?: number;
      offset?: number;
      size?: number;
    }
    interface GetHotRecommendRsp {
      ret?: RET_CODE;
      message?: string;
      list?: Array<HotRecommend>;
    }
    interface getAppIconMoreReq {
      iType?: number;
    }
    interface IconInfo {
      sLinkUrl?: string;
      sImgUrl?: string;
      sName?: string;
      sMarkUrl?: string;
      sDescription?: string;
    }
    interface AppIndexIconRsp {
      iRet: number;
      sMsg: string;
      stIconInfo?: Array<IconInfo>;
    }
    interface GetFiveStarMonitorReq {
      upName?: string;
    }
    interface FiveStarMonitor {
      High?: string;
      RiseAfterPick?: string;
      RiseMax?: string;
      RiseNow?: string;
      highAfterSignal?: string;
      rise_max?: string;
      signalContinue?: number;
      signalPrice?: string;
      signalStar?: number;
      signalStat?: number;
      signalTime?: string;
    }
    interface GetFiveStarMonitorData {
      shtMarket?: number;
      sCode?: string;
      iDate?: number;
      iTime?: number;
      sName?: string;
      mField?: FiveStarMonitor;
    }
    interface GetFiveStarMonitorRsp {
      ret?: number;
      data?: Array<GetFiveStarMonitorData>;
      buyStatus?: number;
    }
    interface GetLimitUpPioneerReq {
      upName?: string;
    }
    interface LimitUpPioneer {
      CC?: number;
      CCTime?: number;
      PriceNow?: string;
      RiseAfterPick?: string;
      RiseNow?: string;
      XN?: number;
      XNTime?: number;
      ZT?: number;
      ZTTime?: number;
      crzf?: number;
      price?: string;
      time?: number;
      wrzf?: number;
    }
    interface GetLimitUpPioneerData {
      shtMarket?: number;
      sCode?: string;
      iDate?: number;
      iTime?: number;
      sName?: string;
      fZTPrice?: string;
      fDTPrice?: string;
      mField?: LimitUpPioneer;
    }
    interface GetLimitUpPioneerRsp {
      ret?: number;
      msg?: string;
      data?: Array<GetLimitUpPioneerData>;
      buyStatus?: number;
    }
    interface GetSuggestionReq {
      sInput?: string;
      markets?: Array<number>;
      type?: number;
      iMaxNum?: number;
      getJG?: number;
    }
    interface GetSuggestionData {
      shtMarket?: number;
      sCode?: string;
      sName?: string;
    }
    interface GetSuggestionRsp {
      ret?: number;
      msg?: string;
      vStkSuggests?: Array<GetSuggestionData>;
    }
    interface GetDiagnosisRecordReq {
      channel?: string;
      iWantNum?: number;
    }
    interface GetDiagnosisRecordData {
      market?: number;
      stockCode?: string;
      stockName?: string;
      recordTime?: string;
      userName?: string;
    }
    interface GetDiagnosisRecordRsp {
      ret?: number;
      msg?: string;
      diagnosisRecordList?: Array<GetDiagnosisRecordData>;
    }
    interface GetMyStockReq {
      basicInfo?: BasicInfo;
      upName?: string;
    }
    interface GetMyStockRsp {
      ret?: number;
      message?: string;
      data?: Array<GetSuggestionData>;
    }
    interface AddMyStockReq {
      basicInfo?: BasicInfo;
      upName?: string;
      market?: string;
      stockCode?: string;
      position?: string;
      groupId?: number;
      xua?: string;
      gUid?: string;
    }
    interface AddMyStockRsp {
      ret?: number;
      message?: string;
    }
    interface IsFollowWxServiceReq {
      basicInfo?: BasicInfo;
      upName?: string;
    }
    interface IsFollowWxServiceRsp {
      ret?: number;
      message?: string;
      data?: number;
    }
    interface QueryPickStockReq {
      basicInfo?: BasicInfo;
      upName?: string;
    }
    interface PickStock {
      shtMarket?: number;
      sCode?: string;
      sName?: string;
      price?: string;
      change?: string;
      changeRate?: string;
      time?: string;
    }
    interface QueryPickStockData {
      ContinuousBuyStock?: Array<PickStock>;
      LowerPriceStock?: Array<PickStock>;
      buyStatus?: number;
      weChatInfo?: WeChatInfo;
    }
    interface QueryPickStockRsp {
      ret?: number;
      message?: string;
      data?: QueryPickStockData;
    }
    interface Cite {
      id?: string;
      userId?: string;
      content?: string;
      citedType?: number;
      citedId?: string;
      citedTitle?: string;
      citedImg?: Array<string>;
      status?: number;
      isPush?: number;
      createTime?: string;
      updateTime?: string;
      type?: number;
      cost?: string;
      marketing?: string;
      tagType?: string;
      relateStock?: Array<Stock>;
      coverImg?: string;
    }
    interface PublishCiteReq {
      basicInfo?: BasicInfo;
      cite?: Cite;
    }
    interface PublishCiteRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Cite;
    }
    interface PushCiteReq {
      basicInfo?: BasicInfo;
      id?: string;
    }
    interface PushCiteRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface CiteDetail {
      tgDetail?: TgDetail;
      cite?: Cite;
      readCount?: number;
      favCount?: number;
      shareCount?: number;
      commentCount?: number;
      rewardCount?: number;
      favStatus?: number;
      buyStatus?: number;
    }
    interface CiteListRsp {
      total?: number;
      status?: number;
      list?: Array<CiteDetail>;
    }
    interface GetTgCitesReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      userId?: string;
      type?: number;
    }
    interface GetTgCitesRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CiteListRsp;
    }
    interface GetCitesByIdReq {
      basicInfo?: BasicInfo;
      ids?: Array<string>;
      type?: number;
    }
    interface GetCitesByIdRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<CiteDetail>;
    }
    interface UpdateCiteStatusReq {
      basicInfo?: BasicInfo;
      id?: string;
      status?: number;
    }
    interface UpdateCiteStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface UpdateCiteExtraReq {
      basicInfo?: BasicInfo;
      id?: string;
      operateType?: number;
      name?: string;
      count?: number;
    }
    interface UpdateCiteExtraRsp {
      ret?: RET_CODE;
      message?: string;
      data?: number;
    }
    interface SearchCitesReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      recommendKey?: string;
      keyWord?: string;
    }
    interface SearchCitesRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CiteListRsp;
    }
    interface QueryNewStockReq {
      basicInfo?: BasicInfo;
      upName?: string;
    }
    interface NewStock {
      shtMarket?: number;
      sCode?: string;
      sName?: string;
      desc?: string;
    }
    interface QueryNewStockData {
      list?: Array<NewStock>;
    }
    interface QueryNewStockRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryNewStockData;
    }
    interface QueryStopAndResumeStockReq {
      basicInfo?: BasicInfo;
      upName?: string;
    }
    interface StopAndResumeStock {
      shtMarket?: number;
      sCode?: string;
      sName?: string;
      desc?: string;
    }
    interface QueryStopAndResumeStockData {
      list?: Array<StopAndResumeStock>;
    }
    interface QueryStopAndResumeStockRsp {
      ret?: RET_CODE;
      message?: string;
      data?: QueryStopAndResumeStockData;
    }
    interface GetUserStockMsgReq {
      basicInfo?: BasicInfo;
      upName?: string;
    }
    interface StockInfo {
      iMarket?: number;
      sGPCode?: string;
      sGPName?: string;
      iGroupId?: number;
    }
    interface StockMsgInfo {
      eMoudle?: number;
      lMsgId?: string;
      sMTitle?: string;
      sATitle?: string;
      sDigest?: string;
      sUrl?: string;
      iTime?: string;
      sAnaly?: string;
      stGPInfo?: StockInfo;
      eSubModule?: number;
      ext?: string;
    }
    interface UserStockMsg {
      lDate?: string;
      stGPInfo?: StockInfo;
      vMsgs?: Array<StockMsgInfo>;
    }
    interface UserStockMsgRsp {
      list?: Array<UserStockMsg>;
      isChange?: number;
    }
    interface GetUserStockMsgRsp {
      ret?: RET_CODE;
      message?: string;
      data?: UserStockMsgRsp;
    }
    interface GetPickSuggestionReq {
      basicInfo?: BasicInfo;
      upName?: string;
      noRandom?: number;
    }
    interface PickSuggestionData {
      shtMarket?: number;
      sCode?: string;
      sName?: string;
      RiseNow?: string;
      pickType?: number;
    }
    interface GetPickSuggestionRsp {
      ret?: number;
      msg?: string;
      data?: Array<PickSuggestionData>;
    }
    interface AdjustStockReq {
      basicInfo?: BasicInfo;
      business?: string;
      bId?: string;
      stockRecords?: Array<GoldStockRecord>;
      tgUpName?: string;
    }
    interface AdjustStockRsp {
      ret?: RET_CODE;
      message?: string;
      success?: Array<GoldStockRecord>;
      failure?: Array<GoldStockRecord>;
    }
    interface GetGoldStockReq {
      basicInfo?: BasicInfo;
      business?: string;
      bId?: string;
      goldStockId?: number;
      tgUpName?: string;
      upName?: string;
    }
    interface GoldStockData {
      list?: Array<GoldStockRecord>;
      buyStatus?: number;
      productId?: number;
      productType?: number;
      styleIntro?: string;
      oneMonthCost?: string;
      endTime?: string;
    }
    interface GetGoldStockRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GoldStockData;
    }
    interface GetGoldStockRecordReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      business?: string;
      bId?: string;
      goldStockId?: number;
      tgUpName?: string;
    }
    interface GoldStockRecordRsp {
      total?: number;
      list?: Array<GoldStockRecord>;
    }
    interface GetGoldStockRecordRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GoldStockRecordRsp;
    }
    interface SearchStockByKeyReq {
      basicInfo?: BasicInfo;
      keyWord?: string;
    }
    interface SearchStockByKeyRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<StockInfo>;
    }
    interface CreateGoldStockReq {
      basicInfo?: BasicInfo;
      business?: string;
      tgUpName?: string;
      config?: Array<DisCountConfig>;
    }
    interface CreateGoldStockRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetGoldStockBusinessReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
      business?: string;
    }
    interface GoldStockBusiness {
      tgUpName?: string;
      business?: string;
      bId?: number;
      bName?: string;
      bNameIntro?: string;
    }
    interface GetGoldStockBusinessRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GoldStockBusiness;
    }
    interface CourseInfo {
      id?: string;
      tgUpName?: string;
      title?: string;
      intro?: string;
      tgIntro?: string;
      costType?: number;
      cost?: number;
      coverImg?: string;
      status?: number;
      courseNum?: number;
      createTime?: string;
      updateTime?: string;
      courseFlag?: number;
      courseTags?: string;
      description?: string;
      courseImg?: string;
      oldPrice?: number;
      extra?: string;
      isRecommend?: number;
      courseDetailUrl?: string;
      userRightAvatars?: Array<string>;
      rightType?: number;
    }
    interface CreateCourseReq {
      basicInfo?: BasicInfo;
      courseInfo?: CourseInfo;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface CreateCourseRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTgCoursesReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      tgUpName?: string;
      type?: number;
      recommendKey?: string;
    }
    interface CoursesRsp {
      total?: number;
      status?: number;
      list?: Array<CourseInfo>;
    }
    interface GetTgCoursesRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CoursesRsp;
    }
    interface CourseContentInfo {
      id?: string;
      title?: string;
      costType?: number;
      cost?: number;
      contentType?: number;
      content?: string;
      summary?: string;
      marketingWord?: string;
      coverImg?: string;
      videoUrl?: string;
      audioUrl?: string;
      courseId?: string;
      createTime?: string;
      updateTime?: string;
      status?: number;
      index?: number;
      tgUpName?: string;
      extra?: string;
      buyStatus?: number;
      buyType?: number;
    }
    interface CreateCourseContentReq {
      basicInfo?: BasicInfo;
      courseContentInfo?: CourseContentInfo;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface CreateCourseContentRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetCourseContentsReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      courseId?: string;
      type?: number;
      upName?: string;
    }
    interface CourseContentsRsp {
      total?: number;
      status?: number;
      list?: Array<CourseContentInfo>;
      courseInfo?: CourseInfo;
      buyStatus?: number;
      readCount?: number;
      commentCount?: number;
      rewardCount?: number;
      shareCount?: number;
      favCount?: number;
      favStatus?: number;
    }
    interface GetCourseContentsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CourseContentsRsp;
    }
    interface UpdateCourseStatusReq {
      basicInfo?: BasicInfo;
      id?: string;
      status?: number;
    }
    interface UpdateCourseStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetCourseByIdsReq {
      basicInfo?: BasicInfo;
      ids?: Array<string>;
    }
    interface GetCourseByIdsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<CourseInfo>;
    }
    interface GetCourseContentByIdsReq {
      basicInfo?: BasicInfo;
      ids?: Array<string>;
    }
    interface GetCourseContentByIdsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<CourseContentInfo>;
    }
    interface GetLatestCourseReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      type?: number;
    }
    interface LatestCourseRsp {
      total?: number;
      status?: number;
      list?: Array<CourseInfo>;
    }
    interface GetLatestCourseRsp {
      ret?: RET_CODE;
      message?: string;
      data?: LatestCourseRsp;
    }
    interface SetRecommendCourseReq {
      basicInfo?: BasicInfo;
      recommendKey?: string;
      courseId?: string;
      operateType?: number;
    }
    interface SetRecommendCourseRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetRecommendCourseReq {
      basicInfo?: BasicInfo;
      recommendKey?: string;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
    }
    interface RecommendCourseRsp {
      total?: number;
      status?: number;
      list?: Array<CourseInfo>;
    }
    interface GetRecommendCourseRsp {
      ret?: RET_CODE;
      message?: string;
      data?: RecommendCourseRsp;
    }
    interface UpdateCourseContentStatusReq {
      basicInfo?: BasicInfo;
      id?: string;
      status?: number;
    }
    interface UpdateCourseContentStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface UpdateCourseFlagReq {
      basicInfo?: BasicInfo;
      id?: string;
      courseFlag?: number;
    }
    interface UpdateCourseFlagRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetCourseContentDetailReq {
      basicInfo?: BasicInfo;
      id?: string;
      upName?: string;
    }
    interface CourseContentDetail {
      courseContentInfo?: CourseContentInfo;
      tgDetail?: TgDetail;
      buyStatus?: number;
      readCount?: number;
      commentCount?: number;
      rewardCount?: number;
      shareCount?: number;
      favCount?: number;
      favStatus?: number;
      courseInfo?: CourseInfo;
    }
    interface GetCourseContentDetailRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CourseContentDetail;
    }
    interface UpdateCourseExtraReq {
      basicInfo?: BasicInfo;
      id?: string;
      operateType?: number;
      name?: string;
      count?: number;
    }
    interface UpdateCourseExtraRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface UpdateCourseContentExtraReq {
      basicInfo?: BasicInfo;
      id?: string;
      operateType?: number;
      name?: string;
      count?: number;
    }
    interface UpdateCourseContentExtraRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetRecommendCourseListReq {
      basicInfo?: BasicInfo;
      direction?: number;
      recommendKey?: string;
      offset?: number;
      size?: number;
      referId?: number;
    }
    interface GetRecommendCourseListRsp {
      ret?: RET_CODE;
      message?: string;
      list?: Array<CourseInfo>;
    }
    interface GetMyCoursesReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      upName?: string;
    }
    interface GetMyCoursesRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CoursesRsp;
    }
    interface GetCoursesByCostTypeReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      costType?: number;
    }
    interface GetCoursesByCostTypeRsp {
      ret?: RET_CODE;
      message?: string;
      data?: CoursesRsp;
    }
    interface GetTopicList {
      total?: number;
      list?: Array<TopicDetailExtra>;
    }
    interface SaveTopicReq {
      basicInfo?: BasicInfo;
      TopicBasic?: TopicBasicInfo;
    }
    interface SaveTopicRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface VerifyTopicReq {
      basicInfo?: BasicInfo;
      id?: number;
      status?: number;
    }
    interface VerifyTopicRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SetTopicRecommendReq {
      basicInfo?: BasicInfo;
      topicId?: number;
      recommendKey?: string;
      operateType?: number;
      description?: string;
      picture?: string;
    }
    interface SetTopicRecommendRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface OperateTopicReq {
      basicInfo?: BasicInfo;
      TopicBasic?: TopicBasicInfo;
      editProps?: Array<string>;
    }
    interface OperateTopicRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTopicDetailReq {
      basicInfo?: BasicInfo;
      TopicId?: number;
      upName?: string;
      isUserGet?: boolean;
    }
    interface GetTopicDetailRsp {
      ret?: RET_CODE;
      message?: string;
      data?: TopicDetailExtra;
    }
    interface UpdateTopicExtraReq {
      basicInfo?: BasicInfo;
      TopicId?: number;
      upName?: string;
      extras?: Array<OperateExtra>;
    }
    interface UpdateTopicExtraRsp {
      ret?: RET_CODE;
      message?: string;
      data?: number;
    }
    interface GetTgTopicListByStatusReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
      status?: number;
      direction?: number;
      offset?: number;
      size?: number;
      referId?: number;
      recommendKey?: string;
    }
    interface GetTgTopicListByStatusRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTopicList;
    }
    interface GetTopicListByTimeReq {
      basicInfo?: BasicInfo;
      referId?: number;
      offset?: number;
      size?: number;
      direction?: number;
    }
    interface GetTopicListByTimeRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTopicList;
    }
    interface SearchTopicsReq {
      basicInfo?: BasicInfo;
      referId?: number;
      offset?: number;
      size?: number;
      direction?: number;
      keyWord?: string;
    }
    interface SearchTopicsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTopicList;
    }
    interface GetTopicListByIdReq {
      basicInfo?: BasicInfo;
      TopicIds?: Array<number>;
    }
    interface GetTopicListByIdRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<TopicDetailExtra>;
    }
    interface GetTopicCountsReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
    }
    interface GetTopicCountsRsp {
      ret?: RET_CODE;
      message?: string;
      allCount?: number;
      freeCount?: number;
      chargeCount?: number;
      allEarnings?: number;
    }
    interface GetManageTopicListReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      referId?: number;
    }
    interface GetManageTopicListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTopicList;
    }
    interface SearchManageTopicListReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      keyWord?: string;
      referId?: number;
    }
    interface SearchManageTopicListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTopicList;
    }
    interface GetTopicsByKeyWordReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      keyWord?: string;
      referId?: number;
    }
    interface GetTopicsByKeyWordRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTopicList;
    }
    interface GetMyTopicReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      upName?: string;
      referId?: number;
    }
    interface GetMyTopicRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTopicList;
    }
    interface GetTgRecentTopicReq {
      basicInfo?: BasicInfo;
      direction?: number;
      offset?: number;
      size?: number;
      referId?: number;
      tgUpName?: string;
      startTime?: string;
    }
    interface GetTgRecentTopicRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTopicList;
    }
    interface GetTgTopicCountBatchReq {
      basicInfo?: BasicInfo;
      upNames?: Array<string>;
    }
    interface GetTgTopicCountBatchRsp {
      ret?: RET_CODE;
      message?: string;
      list?: Array<Record<string, number>>;
    }
    interface GetTopicRewardList {
      userId?: number;
      userName?: string;
      upName?: string;
      avatar?: string;
    }
    interface GetTopicReward {
      list?: Array<GetTopicRewardList>;
      total?: number;
    }
    interface GetTopicRewardReq {
      basicInfo?: BasicInfo;
      TopicId?: number;
    }
    interface GetTopicRewardRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetTopicReward;
    }
    interface GetTgTopicExtraReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
    }
    interface GetTgTopicExtraRsp {
      ret?: RET_CODE;
      message?: string;
      extra?: string;
    }
    interface GetTgTopicExtraBatchReq {
      basicInfo?: BasicInfo;
      tgUpNames?: Array<string>;
      startTime?: string;
      endTime?: string;
    }
    interface GetTgTopicExtraBatchRsp {
      ret?: RET_CODE;
      message?: string;
      extras?: Array<string>;
    }
    interface QueryTopicStatisticReq {
      basicInfo?: BasicInfo;
      direction?: number;
      referId?: string;
      offset?: number;
      size?: number;
      keyWord?: string;
      startTime?: string;
      endTime?: string;
      sortBy?: string;
      sortKey?: string;
    }
    interface TopicStatistic {
      tgUpName?: string;
      total?: number;
      readCount?: number;
      favCount?: number;
      rewardCount?: number;
      shareCount?: number;
      commentCount?: number;
      avgReadCount?: number;
      realName?: string;
      nickName?: string;
    }
    interface TopicStatisticRsp {
      total?: number;
      status?: number;
      list?: Array<TopicStatistic>;
    }
    interface QueryTopicStatisticRsp {
      ret?: RET_CODE;
      message?: string;
      data?: TopicStatisticRsp;
    }
    interface StageLiveDetailExtend {
      stageLiveBasicInfo?: StageLiveBasicInfo;
      commentCount?: number;
      favoriteCount?: number;
      participants?: number;
      saleCount?: number;
      rewardCount?: number;
      contentCount?: number;
      tgDetail?: TgDetail;
      reason?: string;
    }
    interface RelationProduct {
      url?: string;
      icon?: string;
      type?: string;
      id?: number;
    }
    interface GetLiveBasicInfoReq {
      basicInfo?: BasicInfo;
      id?: number;
    }
    interface GetLiveBasicInfoRsp {
      ret?: RET_CODE;
      message?: string;
      liveBasicInfo?: LiveBasicInfo;
    }
    interface GetLatestStageBatchByUidReq {
      basicInfo?: BasicInfo;
      upNames?: Array<string>;
    }
    interface GetLatestStageBatchByUidRsp {
      ret?: RET_CODE;
      message?: string;
      list?: Array<StageLiveBasicInfo>;
    }
    interface GetStageLiveListByUidReq {
      basicInfo?: BasicInfo;
      upName?: string;
      offset?: number;
      size?: number;
      flag?: number;
    }
    interface StageLiveListByUidRsp {
      total?: number;
      list?: Array<StageLiveBasicInfo>;
    }
    interface GetStageLiveListByUidRsp {
      ret?: RET_CODE;
      message?: string;
      data?: StageLiveListByUidRsp;
    }
    interface CreateLiveReq {
      basicInfo?: BasicInfo;
      config?: Array<DisCountConfig>;
    }
    interface CreateLiveRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface CreateLiveByStageSubmitReq {
      basicInfo?: BasicInfo;
      stageLiveBasicInfo?: StageLiveBasicInfo;
    }
    interface CreateLiveByStageSubmitRsp {
      ret?: RET_CODE;
      message?: string;
      data?: StageLiveBasicInfo;
    }
    interface GetHottestStageListReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
    }
    interface GetHottestStageListRsp {
      ret?: RET_CODE;
      message?: string;
      stageLive?: StageLive;
    }
    interface ViewStageLiveReq {
      basicInfo?: BasicInfo;
      upName?: string;
      liveId?: number;
      stageLiveId?: number;
    }
    interface ViewStageLiveRsp {
      ret?: RET_CODE;
      message?: string;
      detail?: StageLiveDetail;
      favoriteStatus?: number;
      isLatestStage?: number;
      buyStatus?: number;
    }
    interface JoinStageLiveReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      stageLiveId?: number;
    }
    interface JoinStageLiveRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface FavoriteStageLiveReq {
      basicInfo?: BasicInfo;
      stageLiveId?: number;
    }
    interface FavoriteStageLiveRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface PushStageContentReq {
      basicInfo?: BasicInfo;
      liveContent?: LiveContent;
    }
    interface PushStageContentRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface DelLiveContentReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      stageLiveId?: number;
      contentId?: number;
    }
    interface DelLiveContentRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface PullStageLiveContentReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
      liveId?: number;
      stageLiveId?: number;
      flag?: number;
      maxId?: number;
      minId?: number;
      offset?: number;
      size?: number;
    }
    interface PullStageLiveContentRsp {
      ret?: RET_CODE;
      message?: string;
      data?: StageLiveContent;
    }
    interface QueryHotLivesReq {
      basicInfo?: BasicInfo;
    }
    interface QueryHotLivesRsp {
      ret?: RET_CODE;
      message?: string;
      stageLives?: Array<StageLiveDetailExtend>;
    }
    interface SetHotLiveReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      status?: number;
      reason?: string;
    }
    interface SetHotLiveRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface EditLiveReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      stageLiveId?: number;
      peopleNum?: number;
    }
    interface EditLiveRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SwitchLiveStatusReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      status?: number;
      startT?: string;
      endT?: string;
    }
    interface SwitchLiveStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface QueryLatestLivesReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
    }
    interface QueryLatestLivesRsp {
      ret?: RET_CODE;
      message?: string;
      stageLive?: StageLive;
    }
    interface StageLiveNoticeReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      stageLiveId?: number;
      maxId?: number;
      toText?: number;
      tgUpName?: string;
    }
    interface StageLiveNoticeRsp {
      ret?: RET_CODE;
      message?: string;
      data?: StageLiveNotice;
    }
    interface GetLiveStageRedDotReq {
      basicInfo?: BasicInfo;
      liveId?: number;
    }
    interface GetLiveStageRedDotRsp {
      ret?: RET_CODE;
      message?: string;
      count?: number;
    }
    interface GetLiveListReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      recommendKey?: string;
    }
    interface RecommendLiveDetail {
      detail?: LiveDetail;
      isRecommend?: number;
      t?: string;
      isClose?: number;
      startT?: string;
      endT?: string;
    }
    interface LiveListRsp {
      total?: number;
      list?: Array<RecommendLiveDetail>;
    }
    interface GetLiveListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: LiveListRsp;
    }
    interface GetStageLiveDetailListReq {
      basicInfo?: BasicInfo;
      upName?: string;
      liveId?: number;
      offset?: number;
      size?: number;
      year?: string;
      month?: string;
      recommendKey?: string;
    }
    interface StageLiveDetailListRsp {
      total?: number;
      list?: Array<StageLiveDetail>;
    }
    interface GetStageLiveDetailListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: StageLiveDetailListRsp;
    }
    interface UpdateLiveSubmitReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      title?: string;
      config?: Array<DisCountConfig>;
    }
    interface UpdateLiveSubmitRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetLiveBasicInfoByUidReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
    }
    interface GetLiveBasicInfoByUidRsp {
      ret?: RET_CODE;
      message?: string;
      liveBasicInfo?: LiveBasicInfo;
    }
    interface EditStageLiveReq {
      basicInfo?: BasicInfo;
      stageLiveBasicInfo?: StageLiveBasicInfo;
    }
    interface EditStageLiveRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetRelationProductReq {
      basicInfo?: BasicInfo;
      liveId?: number;
    }
    interface GetRelationProductRsp {
      ret?: RET_CODE;
      message?: string;
      list?: Array<RelationProduct>;
    }
    interface SetRelationProductReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      relationProduct?: RelationProduct;
      status?: string;
    }
    interface SetRelationProductRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SetStageLiveContentTopReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      stageLiveId?: number;
      liveContentId?: number;
      status?: number;
    }
    interface SetStageLiveContentTopRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetStageLiveContentTopReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      stageLiveId?: number;
    }
    interface GetStageLiveContentTopRsp {
      ret?: RET_CODE;
      message?: string;
      liveContent?: string;
      recommendTime?: string;
    }
    interface GetStageLiveExtraBatchReq {
      basicInfo?: BasicInfo;
      stageLiveIds?: Array<number>;
    }
    interface StageLiveExtra {
      stageLiveId?: number;
      participants?: number;
      favoriteCount?: number;
      favStatus?: number;
    }
    interface GetStageLiveExtraBatchRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<StageLiveExtra>;
    }
    interface SetStagePlatformLiveContentTopReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      stageLiveId?: number;
      liveContent?: string;
      status?: number;
      platformType?: number;
    }
    interface SetStagePlatformLiveContentTopRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SetStageLiveStatusReq {
      basicInfo?: BasicInfo;
      stageLiveId?: number;
      status?: number;
    }
    interface SetStageLiveStatusRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SetRecommendLiveReq {
      basicInfo?: BasicInfo;
      liveId?: number;
      recommendKey?: string;
      type?: number;
    }
    interface SetRecommendLiveRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface QueryRecommendLivesReq {
      basicInfo?: BasicInfo;
      recommendKey?: string;
    }
    interface QueryRecommendLivesRsp {
      ret?: RET_CODE;
      message?: string;
      stageLives?: Array<StageLiveDetail>;
    }
    interface Group {
      id?: string;
      tgUpName?: string;
      name?: string;
      intro?: string;
      service?: string;
      welcomeWord?: string;
      img?: string;
      thumbnail?: string;
      userCount?: number;
      maxUserCount?: number;
      status?: number;
      createTime?: string;
      updateTime?: string;
      rewardCount?: number;
      isCost?: number;
      cost?: number;
      isOwnTip?: number;
      tipId?: number;
      groupBackgroundImg?: string;
      serviceSummary?: string;
      planForMonth?: string;
      showScoreUrl?: string;
      groupType?: number;
      feature?: string;
      description?: string;
      banPublicSay?: number;
      riskLevel?: number;
      imGroupId?: string;
      realCount?: number;
      config?: Array<DisCountConfig>;
      type?: number;
      startTime?: string;
      endTime?: string;
    }
    interface GroupAd {
      id?: number;
      type?: number;
      pic?: string;
      url?: string;
      status?: number;
      productType?: number;
      productId?: number;
      groupId?: string;
    }
    interface GroupInfo {
      group?: Group;
      tgInfo?: TgInfo;
      authority?: number;
      startTime?: string;
      endTime?: string;
      remainDays?: number;
      followStatus?: number;
      recommendTime?: string;
      recommendReason?: string;
      groupAds?: Array<GroupAd>;
      isGoldUser?: number;
      privateChatNum?: number;
      groupChatNum?: number;
      currentDayPrivateChatNum?: number;
      currentDayGroupChatNum?: number;
      runStatus?: number;
    }
    interface GroupUser {
      id?: number;
      userId?: number;
      upName?: string;
      userName?: string;
      groupName?: string;
      groupId?: number;
      startTime?: string;
      endTime?: string;
      isGag?: string;
    }
    interface GroupMsg {
      id?: number;
      groupId?: string;
      tgUpName?: string;
      content?: string;
      imgs?: Array<string>;
      thumbnails?: Array<string>;
      status?: number;
      fromUser?: string;
      toUser?: string;
      type?: number;
      createTime?: string;
      linkTitle?: string;
      linkUrl?: string;
      linkDesc?: string;
      toUsers?: string;
      linkWebUrl?: string;
      isArticle?: number;
    }
    interface GroupModule {
      id?: number;
      type?: number;
      moduleType?: number;
      moduleName?: string;
      modulePic?: string;
      moduleUrl?: string;
      status?: number;
      moduleId?: number;
      createTime?: string;
      sort?: number;
    }
    interface SetGroupModuleReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      groupModule?: GroupModule;
    }
    interface SetGroupModuleRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface SetGroupModuleBatchReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      tgUpName?: string;
      groupModules?: Array<GroupModule>;
    }
    interface SetGroupModuleBatchRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetGroupModuleReq {
      basicInfo?: BasicInfo;
      groupId?: string;
    }
    interface GetGroupModuleRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GroupModule>;
    }
    interface QueryGroupListReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
    }
    interface GroupListRsp {
      total?: number;
      list?: Array<GroupInfo>;
    }
    interface QueryGroupListRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupListRsp;
    }
    interface QueryGroupListByIdReq {
      basicInfo?: BasicInfo;
      groupIds?: Array<string>;
    }
    interface QueryGroupListByIdRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GroupInfo>;
    }
    interface QueryAdviserGroupReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      tgUpName?: string;
    }
    interface QueryAdviserGroupRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupListRsp;
    }
    interface JoinGroupReq {
      basicInfo?: BasicInfo;
      groupId?: string;
    }
    interface JoinGroupRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Group;
    }
    interface JoinGroupFreeReq {
      basicInfo?: BasicInfo;
      groupId?: string;
    }
    interface JoinGroupFreeRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Group;
    }
    interface QuitGroupReq {
      basicInfo?: BasicInfo;
      groupId?: string;
    }
    interface QuitGroupRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Group;
    }
    interface QuitGroupFreeReq {
      basicInfo?: BasicInfo;
      groupId?: string;
    }
    interface QuitGroupFreeRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Group;
    }
    interface GetMyGroupReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      upName?: string;
    }
    interface GetMyGroupRsp {
      ret?: number;
      message?: string;
      data?: GroupListRsp;
    }
    interface EnterGroupReq {
      basicInfo?: BasicInfo;
      groupId?: string;
    }
    interface EnterGroupRsp {
      ret?: number;
      message?: string;
      data?: GroupInfo;
    }
    interface GetGroupByTgIdReq {
      basicInfo?: BasicInfo;
      tgUpName?: string;
    }
    interface GetGroupByTgIdRsp {
      ret?: number;
      message?: string;
      data?: Group;
    }
    interface ViewGroupReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      tgUpName?: string;
    }
    interface ViewGroupRsp {
      ret?: number;
      message?: string;
      data?: GroupInfo;
    }
    interface SetGroupAdReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      groupAd?: GroupAd;
    }
    interface SetGroupAdRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetGroupAdReq {
      basicInfo?: BasicInfo;
      groupId?: string;
    }
    interface GetGroupAdRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GroupAd>;
    }
    interface SetTgGroupRightReq {
      basicInfo?: BasicInfo;
      typeId?: number;
      tgUpName?: string;
      data?: string;
    }
    interface SetTgGroupRightRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTgGroupRightReq {
      basicInfo?: BasicInfo;
      typeId?: number;
      tgUpName?: string;
    }
    interface GetTgGroupRightRsp {
      ret?: RET_CODE;
      message?: string;
      data?: string;
    }
    interface CreateGroupReq {
      basicInfo?: BasicInfo;
      group?: Group;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface CreateGroupRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Group;
    }
    interface OperationGroupReq {
      basicInfo?: BasicInfo;
      group?: Group;
      editProps?: Array<string>;
      criterionOrderInfo?: CriterionOrderInfo;
    }
    interface OperationGroupRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Group;
    }
    interface GetGroupContentReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      type?: number;
      groupId?: string;
      upName?: string;
    }
    interface GroupContent {
      groupMsg?: GroupMsg;
      userInfo?: UserInfo;
    }
    interface GroupContentRsp {
      total?: number;
      list?: Array<GroupContent>;
    }
    interface GetGroupContentRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupContentRsp;
    }
    interface PushGroupContentReq {
      basicInfo?: BasicInfo;
      groupMsg?: GroupMsg;
      ignoreIMError?: number;
      sendRongyun?: number;
      groupMsgType?: number;
      isSystem?: number;
    }
    interface PushGroupContentRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupMsg;
    }
    interface PushGroupPrivateContentReq {
      basicInfo?: BasicInfo;
      groupMsg?: GroupMsg;
      groupMsgType?: number;
      groupChatType?: number;
    }
    interface PushGroupPrivateContentRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupMsg;
    }
    interface PullGroupSessionReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      tgUpName?: string;
      condition?: string;
    }
    interface GroupSession {
      upName?: string;
      userName?: string;
      avatar?: string;
      onReadCount?: number;
      payment?: string;
      star?: number;
      userTag?: string;
      createTime?: string;
      content?: string;
      imgs?: Array<string>;
    }
    interface PullGroupSessionRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GroupSession>;
    }
    interface PullGroupFriendReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      tgUpName?: string;
      condition?: string;
    }
    interface GroupFriend {
      upName?: string;
      userName?: string;
      avatar?: string;
      onReadCount?: number;
      payment?: string;
      star?: number;
      readStatus?: number;
      latestTime?: string;
      teamId?: number;
      endTime?: string;
      userTag?: string;
      isGag?: number;
    }
    interface PullGroupFriendRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GroupFriend>;
    }
    interface QueryAllMessageReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      type?: number;
      condition?: string;
    }
    interface GroupMessage {
      groupMsg?: GroupMsg;
      groupName?: string;
      fromUserName?: string;
      toUserName?: string;
      createUser?: string;
    }
    interface AllMessageRsp {
      total?: number;
      list?: Array<GroupMessage>;
    }
    interface QueryAllMessageRsp {
      ret?: RET_CODE;
      message?: string;
      data?: AllMessageRsp;
    }
    interface QueryGroupUserReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      condition?: string;
    }
    interface GroupUserRsp {
      total?: number;
      list?: Array<GroupUser>;
    }
    interface QueryGroupUserRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupUserRsp;
    }
    interface SetGroupGagReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      upName?: string;
      type?: number;
    }
    interface SetGroupGagRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface QueryGroupsWithRecommendReq {
      basicInfo?: BasicInfo;
      offset?: number;
      size?: number;
      typeId?: number;
      condition?: string;
    }
    interface QueryGroupsWithRecommendRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupListRsp;
    }
    interface UpdateRecommendGroupReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      status?: number;
      typeId?: number;
      updateTime?: string;
    }
    interface UpdateRecommendGroupRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface QueryRecommendGroupsReq {
      basicInfo?: BasicInfo;
      typeId?: number;
      excludeSubscribed?: number;
    }
    interface QueryRecommendGroupsRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GroupInfo>;
    }
    interface SubscribeGroupReq {
      basicInfo?: BasicInfo;
      upName?: string;
      groupId?: string;
      type?: number;
      status?: number;
    }
    interface SubscribeGroupRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface QueryGroupStatisticReq {
      basicInfo?: BasicInfo;
      date?: string;
    }
    interface GroupStatistic {
      groupId?: string;
      groupName?: string;
      userCount?: number;
      groupChatUserCount?: number;
      groupChatMsgCount?: number;
      privateChatUserCount?: number;
      privateChatMsgCount?: number;
      buyPayment?: string;
      rewardPayment?: string;
    }
    interface QueryGroupStatisticRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GroupStatistic>;
    }
    interface PullGroupTeamReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      teamIds?: Array<number>;
      isUser?: number;
      condition?: string;
    }
    interface GroupTeam {
      id?: number;
      groupId?: string;
      name?: string;
      createTime?: string;
      updateTime?: string;
      status?: number;
      users?: Array<GroupFriend>;
    }
    interface PullGroupTeamRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GroupTeam>;
    }
    interface UpdateGroupTeamReq {
      basicInfo?: BasicInfo;
      groupTeam?: GroupTeam;
    }
    interface UpdateGroupTeamRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupTeam;
    }
    interface UpdateGroupTeamUserReq {
      basicInfo?: BasicInfo;
      groupFriend?: GroupFriend;
      fromTeamId?: number;
      isDelete?: number;
    }
    interface UpdateGroupTeamUserRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupFriend;
    }
    interface notifyReq {
      basicInfo?: BasicInfo;
      cmd?: string;
      data?: string;
    }
    interface notifyRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface broadcastReq {
      basicInfo?: BasicInfo;
      cmd?: string;
      data?: string;
    }
    interface broadcastRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetTokenReq {
      basicInfo?: BasicInfo;
      upName?: string;
      nickName?: string;
      avatar?: string;
    }
    interface GetTokenRsp {
      ret?: RET_CODE;
      message?: string;
      token?: string;
    }
    interface PushSystemMessageReq {
      basicInfo?: BasicInfo;
      targetId?: number;
      targetName?: string;
      targetType?: number;
      messageType?: number;
      userIds?: Array<number>;
      userNames?: Array<string>;
      pushContent?: string;
      userId?: number;
      userName?: string;
      avatar?: string;
      startTime?: string;
    }
    interface PushSystemMessageRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetGroupRightByAppReq {
      basicInfo?: BasicInfo;
      upName?: string;
      groupId?: string;
    }
    interface GetGroupRightByAppData {
      buyStatus?: number;
      url?: string;
    }
    interface GetGroupRightByAppRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GetGroupRightByAppData;
    }
    interface EnterGroupByAppReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      upName?: string;
    }
    interface EnterGroupData {
      group?: Group;
      tgInfo?: TgInfo;
      authority?: number;
      startTime?: string;
      endTime?: string;
      remainDays?: number;
      groupIntroUrl?: string;
      renewFeeUrl?: string;
      rewardUrl?: string;
      groupOwnRightList?: Array<GroupModule>;
    }
    interface EnterGroupByAppRsp {
      ret?: RET_CODE;
      message?: string;
      data?: EnterGroupData;
    }
    interface SetGroupNoticeReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      notice?: string;
      status?: number;
      platformType?: number;
      url?: string;
    }
    interface SetGroupNoticeRsp {
      ret?: RET_CODE;
      message?: string;
    }
    interface GetGroupNoticeReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      platformType?: number;
    }
    interface GroupNotice {
      notice?: string;
      url?: string;
    }
    interface GetGroupNoticeRsp {
      ret?: RET_CODE;
      message?: string;
      data?: GroupNotice;
    }
    interface QueryUserGagReq {
      basicInfo?: BasicInfo;
      groupId?: string;
      condition?: string;
    }
    interface QueryUserGagRsp {
      ret?: RET_CODE;
      message?: string;
      data?: Array<GroupFriend>;
    }
    interface GetAgentListReq {
      basicInfo?: BasicInfo;
      corpId?: string;
      tgUpName?: string;
    }
    interface AgentInfo {
      agentId?: string;
      agentName?: string;
      corpSecret?: string;
    }
    interface GetAgentListRsp {
      ret?: number;
      message?: string;
      agentList?: Array<AgentInfo>;
      corpId?: string;
    }
    interface GetDepartmentListReq {
      basicInfo?: BasicInfo;
      corpId?: string;
      tgUpName?: string;
      departmentId?: string;
    }
    interface Department {
      id?: string;
      name?: string;
      parentId?: string;
      order?: string;
    }
    interface GetDepartmentListRsp {
      ret?: RET_CODE;
      message?: string;
      departmentList?: Array<Department>;
    }
    interface GetTagListReq {
      basicInfo?: BasicInfo;
      corpId?: string;
      tgUpName?: string;
    }
    interface Tag {
      tagId?: string;
      tagName?: string;
    }
    interface GetTagListRsp {
      ret?: RET_CODE;
      message?: string;
      tagList?: Array<Tag>;
    }
    interface GetIndexByDateNewReq {
      basicInfo?: BasicInfo;
      type?: number;
      startTime?: string;
      endTime?: string;
      condition?: Record<string, string>;
    }
    interface IndexByDateNew {
      shtMarket?: string;
      sCode?: string;
      iDate?: number;
      mField?: Record<string, string>;
      iTime?: number;
      sName?: string;
      mTagField?: Record<string, string>;
    }
    interface GetIndexByDateNewRsp {
      ret?: RET_CODE;
      message?: string;
      data?: IndexByDateNew;
    }
    interface TgAccess {
      getIndexByDateNew: (stReq: GetIndexByDateNewReq) => GetIndexByDateNewRsp;
      getTagList: (stReq: GetTagListReq) => GetTagListRsp;
      getDepartmentList: (stReq: GetDepartmentListReq) => GetDepartmentListRsp;
      getAgentList: (stReq: GetAgentListReq) => GetAgentListRsp;
      queryUserGag: (stReq: QueryUserGagReq) => QueryUserGagRsp;
      getGroupNotice: (stReq: GetGroupNoticeReq) => GetGroupNoticeRsp;
      setGroupNotice: (stReq: SetGroupNoticeReq) => SetGroupNoticeRsp;
      enterGroupByApp: (stReq: EnterGroupByAppReq) => EnterGroupByAppRsp;
      getGroupRightByApp: (stReq: GetGroupRightByAppReq) => GetGroupRightByAppRsp;
      getGroupModule: (stReq: GetGroupModuleReq) => GetGroupModuleRsp;
      setGroupModuleBatch: (stReq: SetGroupModuleBatchReq) => SetGroupModuleBatchRsp;
      setGroupModule: (stReq: SetGroupModuleReq) => SetGroupModuleRsp;
      pushSystemMessage: (stReq: PushSystemMessageReq) => PushSystemMessageRsp;
      getToken: (stReq: GetTokenReq) => GetTokenRsp;
      updateGroupTeamUser: (stReq: UpdateGroupTeamUserReq) => UpdateGroupTeamUserRsp;
      updateGroupTeam: (stReq: UpdateGroupTeamReq) => UpdateGroupTeamRsp;
      pullGroupTeam: (stReq: PullGroupTeamReq) => PullGroupTeamRsp;
      queryGroupStatistic: (stReq: QueryGroupStatisticReq) => QueryGroupStatisticRsp;
      subscribeGroup: (stReq: SubscribeGroupReq) => SubscribeGroupRsp;
      setGroupGag: (stReq: SetGroupGagReq) => SetGroupGagRsp;
      queryGroupUser: (stReq: QueryGroupUserReq) => QueryGroupUserRsp;
      queryAllMessage: (stReq: QueryAllMessageReq) => QueryAllMessageRsp;
      updateRecommendGroup: (stReq: UpdateRecommendGroupReq) => UpdateRecommendGroupRsp;
      queryGroupsWithRecommend: (stReq: QueryGroupsWithRecommendReq) => QueryGroupsWithRecommendRsp;
      queryRecommendGroups: (stReq: QueryRecommendGroupsReq) => QueryRecommendGroupsRsp;
      queryAdviserGroup: (stReq: QueryAdviserGroupReq) => QueryAdviserGroupRsp;
      queryGroupListById: (stReq: QueryGroupListByIdReq) => QueryGroupListByIdRsp;
      queryGroupList: (stReq: QueryGroupListReq) => QueryGroupListRsp;
      getTgGroupRight: (stReq: GetTgGroupRightReq) => GetTgGroupRightRsp;
      setTgGroupRight: (stReq: SetTgGroupRightReq) => SetTgGroupRightRsp;
      pushGroupPrivateContent: (stReq: PushGroupPrivateContentReq) => PushGroupPrivateContentRsp;
      pushGroupContent: (stReq: PushGroupContentReq) => PushGroupContentRsp;
      pullGroupFriend: (stReq: PullGroupFriendReq) => PullGroupFriendRsp;
      pullGroupSession: (stReq: PullGroupSessionReq) => PullGroupSessionRsp;
      getGroupContent: (stReq: GetGroupContentReq) => GetGroupContentRsp;
      getMyGroup: (stReq: GetMyGroupReq) => GetMyGroupRsp;
      getGroupByTgId: (stReq: GetGroupByTgIdReq) => GetGroupByTgIdRsp;
      viewGroup: (stReq: ViewGroupReq) => ViewGroupRsp;
      enterGroup: (stReq: EnterGroupReq) => EnterGroupRsp;
      quitGroupFree: (stReq: QuitGroupFreeReq) => QuitGroupFreeRsp;
      quitGroup: (stReq: QuitGroupReq) => QuitGroupRsp;
      joinGroupFree: (stReq: JoinGroupFreeReq) => JoinGroupFreeRsp;
      joinGroup: (stReq: JoinGroupReq) => JoinGroupRsp;
      operationGroup: (stReq: OperationGroupReq) => OperationGroupRsp;
      createGroup: (stReq: CreateGroupReq) => CreateGroupRsp;
      setStageLiveStatus: (stReq: SetStageLiveStatusReq) => SetStageLiveStatusRsp;
      getStageLiveExtraBatch: (stReq: GetStageLiveExtraBatchReq) => GetStageLiveExtraBatchRsp;
      getStageLiveContentTop: (stReq: GetStageLiveContentTopReq) => GetStageLiveContentTopRsp;
      SetStagePlatformLiveContentTop: (stReq: SetStagePlatformLiveContentTopReq) => SetStagePlatformLiveContentTopRsp;
      setStageLiveContentTop: (stReq: SetStageLiveContentTopReq) => SetStageLiveContentTopRsp;
      setRelationProduct: (stReq: SetRelationProductReq) => SetRelationProductRsp;
      getRelationProduct: (stReq: GetRelationProductReq) => GetRelationProductRsp;
      editStageLiveBasicInfoById: (stReq: EditStageLiveReq) => EditStageLiveRsp;
      getLiveBasicInfoByUid: (stReq: GetLiveBasicInfoByUidReq) => GetLiveBasicInfoByUidRsp;
      updateLiveSubmit: (stReq: UpdateLiveSubmitReq) => UpdateLiveSubmitRsp;
      getStageLiveDetailList: (stReq: GetStageLiveDetailListReq) => GetStageLiveDetailListRsp;
      queryRecommendLives: (stReq: QueryRecommendLivesReq) => QueryRecommendLivesRsp;
      setRecommendLive: (stReq: SetRecommendLiveReq) => SetRecommendLiveRsp;
      getLiveList: (stReq: GetLiveListReq) => GetLiveListRsp;
      getLiveStageRedDot: (stReq: GetLiveStageRedDotReq) => GetLiveStageRedDotRsp;
      stageLiveNotice: (stReq: StageLiveNoticeReq) => StageLiveNoticeRsp;
      queryLatestLives: (stReq: QueryLatestLivesReq) => QueryLatestLivesRsp;
      switchLiveStatus: (stReq: SwitchLiveStatusReq) => SwitchLiveStatusRsp;
      editLive: (stReq: EditLiveReq) => EditLiveRsp;
      setHotLive: (stReq: SetHotLiveReq) => SetHotLiveRsp;
      queryHotLives: (stReq: QueryHotLivesReq) => QueryHotLivesRsp;
      pullStageLiveContent: (stReq: PullStageLiveContentReq) => PullStageLiveContentRsp;
      delLiveContent: (stReq: DelLiveContentReq) => DelLiveContentRsp;
      pushStageContent: (stReq: PushStageContentReq) => PushStageContentRsp;
      favoriteStageLive: (stReq: FavoriteStageLiveReq) => FavoriteStageLiveRsp;
      joinStageLive: (stReq: JoinStageLiveReq) => JoinStageLiveRsp;
      viewStageLive: (stReq: ViewStageLiveReq) => ViewStageLiveRsp;
      getHottestStageList: (stReq: GetHottestStageListReq) => GetHottestStageListRsp;
      createLiveByStageSubmit: (stReq: CreateLiveByStageSubmitReq) => CreateLiveByStageSubmitRsp;
      createLive: (stReq: CreateLiveReq) => CreateLiveRsp;
      getStageLiveListByUid: (stReq: GetStageLiveListByUidReq) => GetStageLiveListByUidRsp;
      getLatestStageBatchByUid: (stReq: GetLatestStageBatchByUidReq) => GetLatestStageBatchByUidRsp;
      getLiveBasicInfo: (stReq: GetLiveBasicInfoReq) => GetLiveBasicInfoRsp;
      queryTopicStatistic: (stReq: QueryTopicStatisticReq) => QueryTopicStatisticRsp;
      getTgTopicExtraBatch: (stReq: GetTgTopicExtraBatchReq) => GetTgTopicExtraBatchRsp;
      getTgTopicExtra: (stReq: GetTgTopicExtraReq) => GetTgTopicExtraRsp;
      getShareTopicDetail: (stReq: GetTopicDetailReq) => GetTopicDetailRsp;
      getTopicReward: (stReq: GetTopicRewardReq) => GetTopicRewardRsp;
      getTgTopicCountBatch: (stReq: GetTgTopicCountBatchReq) => GetTgTopicCountBatchRsp;
      searchManageTopicList: (stReq: SearchManageTopicListReq) => SearchManageTopicListRsp;
      getManageTopicList: (stReq: GetManageTopicListReq) => GetManageTopicListRsp;
      verifyTopic: (stReq: VerifyTopicReq) => VerifyTopicRsp;
      operateTopic: (stReq: OperateTopicReq) => OperateTopicRsp;
      setTopicRecommend: (stReq: SetTopicRecommendReq) => SetTopicRecommendRsp;
      searchTopics: (stReq: SearchTopicsReq) => SearchTopicsRsp;
      getTopicCountsAndEarnings: (stReq: GetTopicCountsReq) => GetTopicCountsRsp;
      getTgTopicListByStatus: (stReq: GetTgTopicListByStatusReq) => GetTgTopicListByStatusRsp;
      saveTopic: (stReq: SaveTopicReq) => SaveTopicRsp;
      getTgRecentTopic: (stReq: GetTgRecentTopicReq) => GetTgRecentTopicRsp;
      getMyTopic: (stReq: GetMyTopicReq) => GetMyTopicRsp;
      getTopicsByKeyWord: (stReq: GetTopicsByKeyWordReq) => GetTopicsByKeyWordRsp;
      getTopicListById: (stReq: GetTopicListByIdReq) => GetTopicListByIdRsp;
      getTopicListByTime: (stReq: GetTopicListByTimeReq) => GetTopicListByTimeRsp;
      updateTopicExtra: (stReq: UpdateTopicExtraReq) => UpdateTopicExtraRsp;
      getTopicDetail: (stReq: GetTopicDetailReq) => GetTopicDetailRsp;
      getCoursesByCostType: (stReq: GetCoursesByCostTypeReq) => GetCoursesByCostTypeRsp;
      getMyCourses: (stReq: GetMyCoursesReq) => GetMyCoursesRsp;
      getRecommendCourseList: (stReq: GetRecommendCourseListReq) => GetRecommendCourseListRsp;
      updateCourseContentExtra: (stReq: UpdateCourseContentExtraReq) => UpdateCourseContentExtraRsp;
      updateCourseExtra: (stReq: UpdateCourseExtraReq) => UpdateCourseExtraRsp;
      getCourseContentDetail: (stReq: GetCourseContentDetailReq) => GetCourseContentDetailRsp;
      updateCourseFlag: (stReq: UpdateCourseFlagReq) => UpdateCourseFlagRsp;
      updateCourseContentStatus: (stReq: UpdateCourseContentStatusReq) => UpdateCourseContentStatusRsp;
      getRecommendCourse: (stReq: GetRecommendCourseReq) => GetRecommendCourseRsp;
      setRecommendCourse: (stReq: SetRecommendCourseReq) => SetRecommendCourseRsp;
      getLatestCourse: (stReq: GetLatestCourseReq) => GetLatestCourseRsp;
      getCourseContentByIds: (stReq: GetCourseContentByIdsReq) => GetCourseContentByIdsRsp;
      getCourseByIds: (stReq: GetCourseByIdsReq) => GetCourseByIdsRsp;
      updateCourseStatus: (stReq: UpdateCourseStatusReq) => UpdateCourseStatusRsp;
      getCourseContents: (stReq: GetCourseContentsReq) => GetCourseContentsRsp;
      createCourseContent: (stReq: CreateCourseContentReq) => CreateCourseContentRsp;
      getTgCourses: (stReq: GetTgCoursesReq) => GetTgCoursesRsp;
      createCourse: (stReq: CreateCourseReq) => CreateCourseRsp;
      getGoldStockBusiness: (stReq: GetGoldStockBusinessReq) => GetGoldStockBusinessRsp;
      createGoldStock: (stReq: CreateGoldStockReq) => CreateGoldStockRsp;
      getGoldStockRecord: (stReq: GetGoldStockRecordReq) => GetGoldStockRecordRsp;
      getGoldStock: (stReq: GetGoldStockReq) => GetGoldStockRsp;
      adjustStock: (stReq: AdjustStockReq) => AdjustStockRsp;
      getPickSuggestion: (stReq: GetPickSuggestionReq) => GetPickSuggestionRsp;
      getUserStockMsg: (stReq: GetUserStockMsgReq) => GetUserStockMsgRsp;
      queryStopAndResumeStock: (stReq: QueryStopAndResumeStockReq) => QueryStopAndResumeStockRsp;
      queryNewStock: (stReq: QueryNewStockReq) => QueryNewStockRsp;
      searchCites: (stReq: SearchCitesReq) => SearchCitesRsp;
      updateCiteExtra: (stReq: UpdateCiteExtraReq) => UpdateCiteExtraRsp;
      getCitesById: (stReq: GetCitesByIdReq) => GetCitesByIdRsp;
      updateCiteStatus: (stReq: UpdateCiteStatusReq) => UpdateCiteStatusRsp;
      getTgCites: (stReq: GetTgCitesReq) => GetTgCitesRsp;
      publishCite: (stReq: PublishCiteReq) => PublishCiteRsp;
      queryPickStock: (stReq: QueryPickStockReq) => QueryPickStockRsp;
      isFollowWxService: (stReq: IsFollowWxServiceReq) => IsFollowWxServiceRsp;
      addMyStock: (stReq: AddMyStockReq) => AddMyStockRsp;
      getMyStock: (stReq: GetMyStockReq) => GetMyStockRsp;
      getDiagnosisRecord: (stReq: GetDiagnosisRecordReq) => GetDiagnosisRecordRsp;
      getSuggestion: (stReq: GetSuggestionReq) => GetSuggestionRsp;
      getLimitUpPioneer: (stReq: GetLimitUpPioneerReq) => GetLimitUpPioneerRsp;
      getFiveStarMonitor: (stReq: GetFiveStarMonitorReq) => GetFiveStarMonitorRsp;
      getAppIconMore: (req: getAppIconMoreReq) => AppIndexIconRsp;
      getHotRecommend: (stReq: GetHotRecommendReq) => GetHotRecommendRsp;
      setHotRecommend: (stReq: SetHotRecommendReq) => SetHotRecommendRsp;
      getExtraBatch: (stReq: GetExtraBatchReq) => GetExtraBatchRsp;
      updateExtra: (stReq: UpdateExtraReq) => UpdateExtraRsp;
      sendWorkWeChatMessageByArticle: (stReq: SendWorkWeChatMessageByArticleReq) => SendWorkWeChatMessageByArticleRsp;
      queryArticleStatistic: (stReq: QueryArticleStatisticReq) => QueryArticleStatisticRsp;
      getTopNews: (stReq: GetTopNewsReq) => GetTopNewsRsp;
      getShareViewDetail: (stReq: GetViewDetailReq) => GetViewDetailRsp;
      getArticleReward: (stReq: GetArticleRewardReq) => GetArticleRewardRsp;
      getTgArticleCountBatch: (stReq: GetTgArticleCountBatchReq) => GetTgArticleCountBatchRsp;
      searchManageArticleList: (stReq: SearchManageArticleListReq) => SearchManageArticleListRsp;
      getManageArticleList: (stReq: GetManageArticleListReq) => GetManageArticleListRsp;
      verifyArticle: (stReq: VerifyArticleReq) => VerifyArticleRsp;
      searchOperateArticleList: (stReq: SearchOperateArticleListReq) => SearchOperateArticleListRsp;
      getOperateAllArticleList: (stReq: GetOperateAllArticleListReq) => GetOperateAllArticleListRsp;
      operateArticle: (stReq: OperateArticleReq) => OperateArticleRsp;
      setArticleRecommend: (stReq: SetArticleRecommendReq) => SetArticleRecommendRsp;
      searchArticles: (stReq: SearchArticlesReq) => SearchArticlesRsp;
      getViewCountsAndEarnings: (stReq: GetViewCountsReq) => GetViewCountsRsp;
      getTgArticleListByStatus: (stReq: GetTgArticleListByStatusReq) => GetTgArticleListByStatusRsp;
      saveArticle: (stReq: SaveArticleReq) => SaveArticleRsp;
      getTgRecentArticle: (stReq: GetTgRecentArticleReq) => GetTgRecentArticleRsp;
      getMyArticle: (stReq: GetMyArticleReq) => GetMyArticleRsp;
      getHotArticleList: (stReq: GetHotArticleListReq) => GetHotArticleListRsp;
      getRecommendList: (stReq: GetRecommendListReq) => GetRecommendListRsp;
      getViewsByKeyWord: (stReq: GetViewsByKeyWordReq) => GetViewsByKeyWordRsp;
      getArticleListById: (stReq: GetArticleListByIdReq) => GetArticleListByIdRsp;
      getArticleListByTime: (stReq: GetArticleListByTimeReq) => GetArticleListByTimeRsp;
      updateArticleExtra: (stReq: UpdateArticleExtraReq) => UpdateArticleExtraRsp;
      getViewDetail: (stReq: GetViewDetailReq) => GetViewDetailRsp;
      getHotRecommendTg: (stReq: GetHotRecommendTgReq) => GetHotRecommendTgRsp;
      getCriterionOrderInfo: (stReq: GetCriterionOrderInfoReq) => GetCriterionOrderInfoRsp;
      setCriterionOrderInfo: (stReq: SetCriterionOrderInfoReq) => SetCriterionOrderInfoRsp;
      getCrmModules: (stReq: GetCrmModulesReq) => GetCrmModulesRsp;
      getRightUserAvatarBatch: (stReq: GetRightUserAvatarBatchReq) => GetRightUserAvatarBatchRsp;
      getAllContentService: (stReq: GetAllContentServiceReq) => GetAllContentServiceRsp;
      getTgContentServiceBatch: (stReq: GetTgContentServiceBatchReq) => GetTgContentServiceBatchRsp;
      getTgContentService: (stReq: GetTgContentServiceReq) => GetTgContentServiceRsp;
      setTgContentService: (stReq: SetTgContentServiceReq) => SetTgContentServiceRsp;
      getRightUser: (stReq: GetRightUserReq) => GetRightUserRsp;
      createDisCountProduct: (stReq: CreateDisCountProductReq) => CreateDisCountProductRsp;
      getTgStatisticsData: (stReq: GetTgStatisticsDataReq) => GetTgStatisticsDataRsp;
      queryWeChatInfoByUpName: (stReq: QueryWeChatInfoByUpNameReq) => QueryWeChatInfoByUpNameRsp;
      queryUserCollectStatusBatch: (stReq: QueryUserCollectStatusBatchReq) => QueryUserCollectStatusBatchRsp;
      getTgContentLabel: (stReq: GetTgContentLabelReq) => GetTgContentLabelRsp;
      setTgContentLabel: (stReq: SetTgContentLabelReq) => SetTgContentLabelRsp;
      queryUserCollectStatus: (stReq: QueryUserCollectStatusReq) => QueryUserCollectStatusRsp;
      queryMyCollection: (stReq: QueryMyCollectionReq) => QueryMyCollectionRsp;
      collectInfo: (stReq: CollectInfoReq) => CollectInfoRsp;
      getUnionUserInfoByUpName: (stReq: GetUnionUserInfoByUpNameReq) => GetUnionUserInfoByUpNameRsp;
      getHomeOptimizationRecommendTg: (stReq: GetHomeOptimizationRecommendTgReq) => GetHomeOptimizationRecommendTgRsp;
      followTgBatch: (stReq: FollowTgBatchReq) => FollowTgBatchRsp;
      openFreeUserRight: (stReq: OpenFreeUserRightReq) => OpenFreeUserRightRsp;
      searchVipProduct: (stReq: SearchVipProductReq) => SearchVipProductRsp;
      queryUserVipRight: (stReq: QueryUserVipRightReq) => QueryUserVipRightRsp;
      updateVipProductStatus: (stReq: UpdateVipProductStatusReq) => UpdateVipProductStatusRsp;
      queryUserRightByRightId: (stReq: QueryUserRightByRightIdReq) => QueryUserRightByRightIdRsp;
      queryVipProductBatch: (stReq: QueryVipProductBatchReq) => QueryVipProductBatchRsp;
      queryTgVipProductBatch: (stReq: QueryTgVipProductBatchReq) => QueryTgVipProductBatchRsp;
      queryVipRightProduct: (stReq: QueryVipRightProductReq) => QueryVipRightProductRsp;
      queryVipProductDetail: (stReq: QueryVipProductDetailReq) => QueryVipProductDetailRsp;
      queryVipProduct: (stReq: QueryVipProductReq) => QueryVipProductRsp;
      createVipProduct: (stReq: CreateVipProductReq) => CreateVipProductRsp;
      getTgProfileByProductId: (stReq: GetTgProfileByProductIdReq) => GetTgProfileByProductIdRsp;
      getCriterionProductInfoBatch: (stReq: GetCriterionProductInfoBatchReq) => GetCriterionProductInfoBatchRsp;
      createCriterionProduct: (stReq: CreateCriterionProductReq) => CreateCriterionProductRsp;
      login: (stReq: LoginReq) => LoginRsp;
      getTgTab: (stReq: GetTgTabReq) => GetTgTabRsp;
      setTgTab: (stReq: SetTgTabReq) => SetTgTabRsp;
      getUserRight: (stReq: GetUserRightReq) => GetUserRightRsp;
      sendSms: (stReq: SendSmsReq) => SendSmsRsp;
      pushMsg: (stReq: PushMsgReq) => PushMsgRsp;
      getUserInfoByUpNameBatch: (stReq: GetUserInfoByUpNameBatchReq) => GetUserInfoByUpNameBatchRsp;
      getTgDetailBatch: (stReq: GetTgDetailBatchReq) => GetTgDetailBatchRsp;
      getTgList: (stReq: GetTgListReq) => GetTgListRsp;
      getMyTg: (stReq: GetMyTgReq) => GetMyTgRsp;
      followTg: (stReq: FollowTgReq) => FollowTgRsp;
      getRecommendTgList: (stReq: GetRecommendTgListReq) => GetRecommendTgListRsp;
      getTgs: (stReq: GetTgsReq) => GetTgsRsp;
      setRecommend: (stReq: SetRecommendReq) => SetRecommendRsp;
      getTgInfoList: (stReq: GetTgInfoListReq) => GetTgInfoListRsp;
      getTgInfoBatch: (stReq: GetTgInfoBatchReq) => GetTgInfoBatchRsp;
      updateTgInfo: (stReq: UpdateTgInfoReq) => UpdateTgInfoRsp;
      getTgInfo: (stReq: GetTgInfoReq) => GetTgInfoRsp;
      queryBusinessExtra: (stReq: QueryBusinessExtraReq) => QueryBusinessExtraRsp;
      updateBusinessExtra: (stReq: UpdateBusinessExtraReq) => UpdateBusinessExtraRsp;
      getVideoLives: (stReq: GetVideoLivesReq) => GetVideoLivesRsp;
      searchVideoLives: (stReq: SearchVideoLivesReq) => SearchVideoLivesRsp;
      updateVideoLiveExtra: (stReq: UpdateVideoLiveExtraReq) => UpdateVideoLiveExtraRsp;
      updateVideoLiveStatus: (stReq: UpdateVideoLiveStatusReq) => UpdateVideoLiveStatusRsp;
      getVideoLivesById: (stReq: GetVideoLivesByIdReq) => GetVideoLivesByIdRsp;
      getTgVideoLives: (stReq: GetTgVideoLivesReq) => GetTgVideoLivesRsp;
      pushVideoLive: (stReq: PushVideoLiveReq) => PushVideoLiveRsp;
      publishVideoLive: (stReq: PublishVideoLiveReq) => PublishVideoLiveRsp;
      updateTweetExtra: (stReq: UpdateTweetExtraReq) => UpdateTweetExtraRsp;
      getTweetsById: (stReq: GetTweetsByIdReq) => GetTweetsByIdRsp;
      queryTweetStatistic: (stReq: QueryTweetStatisticReq) => QueryTweetStatisticRsp;
      searchTweets: (stReq: SearchTweetsReq) => SearchTweetsRsp;
      updateTweetStatus: (stReq: UpdateTweetStatusReq) => UpdateTweetStatusRsp;
      getTgTweets: (stReq: GetTgTweetsReq) => GetTgTweetsRsp;
      pushTweet: (stReq: PushTweetReq) => PushTweetRsp;
      operateTweet: (stReq: OperateTweetReq) => OperateTweetRsp;
      publishTweet: (stReq: PublishTweetReq) => PublishTweetRsp;
      updateRecommendInFeed: (stReq: UpdateRecommendInFeedReq) => UpdateRecommendInFeedRsp;
      queryCommentStatistics: (stReq: QueryCommentStatisticsReq) => QueryCommentStatisticsRsp;
      searchComments: (stReq: SearchCommentsReq) => SearchCommentsRsp;
      getCommentBusiness: (stReq: GetCommentBusinessReq) => GetCommentBusinessRsp;
      updateCommentFav: (stReq: UpdateCommentFavReq) => UpdateCommentFavRsp;
      getReplyComments: (stReq: GetReplyCommentsReq) => GetReplyCommentsRsp;
      getMultilevelComments: (stReq: GetMultilevelCommentsReq) => GetMultilevelCommentsRsp;
      getMyComments: (stReq: GetMyCommentsReq) => GetMyCommentsRsp;
      getCommentsById: (stReq: GetCommentsByIdReq) => GetCommentsByIdRsp;
      getComments: (stReq: GetCommentsReq) => GetCommentsRsp;
      getCommentsFilterGag: (stReq: GetCommentsFilterGagReq) => GetCommentsFilterGagRsp;
      getRecommendCommentBatch: (stReq: GetRecommendCommentBatchReq) => GetRecommendCommentBatchRsp;
      getRecommendComment: (stReq: GetRecommendCommentReq) => GetRecommendCommentRsp;
      setRecommendComment: (stReq: SetRecommendCommentReq) => SetRecommendCommentRsp;
      gagUser: (stReq: GagUserReq) => GagUserRsp;
      updateCommentStatus: (stReq: UpdateCommentStatusReq) => UpdateCommentStatusRsp;
      publishComment: (stReq: PublishCommentReq) => PublishCommentRsp;
      getFeedsByHotAuthor: (stReq: GetFeedsByHotAuthorReq) => GetFeedsByHotAuthorRsp;
      broadcast: (stReq: BroadcastReq) => BroadcastRsp;
      getFeedTags: (stReq: GetFeedTagsReq) => GetFeedTagsRsp;
      setFeedTags: (stReq: SetFeedTagsReq) => SetFeedTagsRsp;
      getFeedsByAuthor: (stReq: GetFeedsByAuthorReq) => GetFeedsByAuthorRsp;
      searchFeeds: (stReq: SearchFeedsReq) => SearchFeedsRsp;
      getRecommendFeed: (stReq: GetRecommendFeedReq) => GetRecommendFeedRsp;
      setRecommendFeed: (stReq: SetRecommendFeedReq) => SetRecommendFeedRsp;
      updateFeedStatus: (stReq: UpdateFeedStatusReq) => UpdateFeedStatusRsp;
      queryVipInfo: (stReq: QueryVipInfoReq) => QueryVipInfoRsp;
      queryInfo: (stReq: QueryInfoReq) => QueryInfoRsp;
      injectInfo: (stReq: InjectInfoReq) => InjectInfoRsp;
    }
  }
}
export {};