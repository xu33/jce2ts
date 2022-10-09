declare global {
  namespace CenterManager {
    interface HStockCompetition {
      lCompetitionId?: string;
      sCompetitionName?: string;
      sCompetitionImage?: string;
      sCompetitionDesc?: string;
      sCompetitionPrizeDesc?: string;
      lCompetitionStartCapitalHKD?: string;
      lCompetitionStartCapitalCNY?: string;
      lCompetitionStartCapitalUSD?: string;
      lCompetitionEnterStartTime?: string;
      lCompetitionEnterEndTime?: string;
      lCompetitionStartTime?: string;
      lCompetitionEndTime?: string;
      sCompetitionRuleDesc?: string;
      lCompetitionPrizeNumber?: string;
      sCompetitionPrizeJson?: string;
      sCompetitionUser?: string;
      lCompetitionUserMax?: string;
      iCompetionStatus?: number;
      iCompetionTotalNum?: number;
      iCompetionRank?: number;
      dProfit?: string;
      sRecommendImg?: string;
      lSignContestDate?: string;
      iSigned?: number;
      sTradeVariety?: string;
    }
    interface HStockCompetitionReq {
      uiStart?: string;
      uiCount?: string;
      sStockUserId?: string;
      iType?: number;
      iCompetitionFilter?: number;
      iSignSort?: number;
    }
    interface HStockCompetitionRsp {
      iRet?: number;
      iTotal?: number;
      bEnd?: boolean;
      vHStockCompetition?: Array<HStockCompetition>;
      msg?: string;
    }
    interface HTransactionUser {
      sNickName?: string;
      dProfit?: string;
      sHeadImgUrl?: string;
      iFans?: number;
      iRank?: number;
      sStockUserId?: string;
    }
    interface HTransactionUserRsp {
      iRet?: number;
      total?: number;
      bEnd?: boolean;
      vHTransactionUser?: Array<HTransactionUser>;
      msg?: string;
      rMyProfitRank?: HTransactionUser;
      lUpdateTime?: string;
    }
    enum E_Stock_Competition_USER {
      ESCU_ALL = 0,
      ESCU_INTEREST = 1,
      ESCU_FANS = 2,
    }
    interface HTransactionUserReq {
      uiStart?: string;
      uiCount?: string;
      sStockUserId?: string;
      iFans?: number;
      rankType?: number;
      lCompetitionId?: string;
    }
    interface HStockCompetitionAnnouncement {
      sStockCompetitionName?: string;
      sType?: string;
      stitle?: string;
      lAnnounceDate?: string;
      sDigest?: string;
      sContent?: string;
    }
    interface HStockCompetitionAnnouncementRsp {
      iRet?: number;
      total?: number;
      bEnd?: boolean;
      vHStockCompetitionAnnouncement?: Array<HStockCompetitionAnnouncement>;
      msg?: string;
    }
    interface HStockCompetitionAnnouncementReq {
      uiStart?: string;
      uiCount?: string;
    }
    interface HJoinStockCompetitionReq {
      lCompetitionId?: string;
      sStockUserId?: string;
      sStockUserNickName?: string;
      sStockUserTel?: string;
      sStockUserAccount?: string;
    }
    interface HJoinStockCompetitionRsp {
      iRet?: number;
      msg?: string;
    }
    interface HStockContestRecommandReq {
      uiStart?: string;
      uiCount?: string;
    }
    interface HStockContestRecommandRsp {
      iRet?: number;
      vHStockCompetition?: Array<HStockCompetition>;
      msg?: string;
    }
    interface HStockUserAttentionReq {
      targetUserId?: string;
      fansUserId?: string;
    }
    interface HStockUserAttentionRsp {
      iRet?: number;
      msg?: string;
    }
    interface HStockUserAttentionStateRsp {
      iRet?: number;
      msg?: string;
      iState?: number;
    }
    interface HSignStateReq {
      sStockUserId?: string;
      lContestId?: string;
    }
    interface HSignStateRsp {
      iSigned?: number;
    }
    interface HStockCompetitionDetialRsp {
      competition?: HStockCompetition;
      vUserProfitRanks?: Array<HTransactionUser>;
      iRet?: number;
      msg?: string;
      rMyProfitRank?: HTransactionUser;
    }
    interface HStockRankRsp {
      iRank?: number;
      iRankChange?: number;
      iRet?: number;
      msg?: string;
    }
    interface RestTimesReq {
      sStockUserId?: string;
    }
    interface RestTimesRsp {
      iRemainTimes?: number;
      iRet?: number;
      msg?: string;
    }
    interface HStockUserFansRsp {
      lFansNum?: string;
      iRet?: number;
      msg?: string;
      sNickName?: string;
      sStockUserId?: string;
      sHeadImgUrl?: string;
      sMobileNum?: string;
    }
    interface HBlacklistReq {
      sStockUserId?: string;
    }
    interface HBlacklistRsp {
      iIsBlacklist?: number;
    }
  }
}
export {};