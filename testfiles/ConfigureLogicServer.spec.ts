declare global {
  namespace DataCenter {
    enum E_MESSAGE_ROLE {
      E_GUEST = 0,
      E_NORMAL = 1,
      E_ACCOUNT = 2,
    }
    interface Widget {
      sWidgetName?: string;
      sWidgetCode?: string;
      sIcon?: string;
      sSubScript?: string;
      sLink?: string;
      sDescription?: string;
      iLoginStatus?: number;
      sBuryPoint?: string;
      sSubhead?: string;
      sFeature_desc?: string;
      sIcon_black?: string;
      sFeature_horn_icon_black?: string;
      sPlat?: string;
      sStatus?: string;
    }
    interface Feature {
      iAppName?: number;
      sChannel?: string;
      sFeatureCode?: string;
      sFeatureName?: string;
      sVersion?: string;
      vWidgetList?: Array<Widget>;
    }
    interface FeatureInfoReq {
      sGuid?: string;
      sXua?: string;
      sUid?: string;
      sFeatureCode: string;
    }
    interface FeatureInfoRsp {
      iRet: number;
      sMsg?: string;
      feature?: Feature;
    }
    interface FeatureInfoBatchReq {
      sGuid?: string;
      sXua?: string;
      sUid?: string;
      sFeatureCodeList: Array<string>;
    }
    interface FeatureInfoBatchRsp {
      iRet: number;
      sMsg?: string;
      featureList?: Array<Feature>;
    }
    interface Message {
      iAppName?: number;
      iCategory?: number;
      sTitle?: string;
      sSubType?: string;
      sVersion?: string;
      sIcon?: string;
      sLink?: string;
      iType?: number;
      sCategoryName?: string;
      iCategorySort?: number;
      eMessageRole?: E_MESSAGE_ROLE;
      iSerialNum?: number;
    }
    interface MessageInfoReq {
      sGuid?: string;
      sXua?: string;
      sUid?: string;
      isAccount?: boolean;
    }
    interface MessageInfoRsp {
      iRet: number;
      sMsg?: string;
      mMessage?: Record<number, Array<Message>>;
    }
    interface Notice {
      iAppName?: number;
      iType?: number;
      iPublishType?: number;
      sStartTime?: string;
      sEndTime?: string;
      sTitle?: string;
      sContext?: string;
      iPublishTime?: string;
    }
    interface NoticeInfoReq {
      sGuid?: string;
      sXua?: string;
      sUid?: string;
      iType?: number;
      iPublishType?: number;
    }
    interface NoticeInfoRsp {
      iRet: number;
      sMsg?: string;
      vNoticeList?: Array<Notice>;
    }
    interface Other {
      iAppName?: number;
      sChannel?: string;
      sOtherCode?: string;
      sOtherName?: string;
      sVersion?: string;
      sContent?: string;
    }
    interface OtherInfoReq {
      sGuid?: string;
      sXua?: string;
      sUid?: string;
      sOtherCode: string;
    }
    interface OtherInfoRsp {
      iRet: number;
      sMsg?: string;
      otherInfo?: Other;
    }
    interface RiskStock {
      iMarket: number;
      sStockCode: string;
      sContent: string;
    }
    interface RiskTip {
      iType?: number;
      sTaskName?: string;
      iSmSwitch?: number;
      iJySwitch?: number;
      riskStock?: Array<RiskStock>;
    }
    interface RiskTipReq {
      sGuid?: string;
      sXua?: string;
      vType: Array<number>;
    }
    interface RiskTipRsp {
      iRet: number;
      sMsg?: string;
      mRiskTip?: Record<number, Array<RiskTip>>;
    }
    interface FloorInfoReq {
      sGuid?: string;
      sXua?: string;
      sUid?: string;
      iPageCode: number;
    }
    interface FloorInfo {
      sFloorName?: string;
      iFloorCode?: number;
      sVersion?: string;
      iPlat?: number;
      iStatus?: number;
    }
    interface FloorInfoRsp {
      iRet: number;
      sMsg?: string;
      vFloorList?: Array<FloorInfo>;
    }
    interface HotStockInfoReq {
      sGuid?: string;
      sXua?: string;
      sUid?: string;
    }
    interface HotStock {
      sStockName?: string;
      sGotoUrl?: string;
      sTag?: string;
      iStatus?: number;
    }
    interface HotStockInfoRsp {
      iRet: number;
      sMsg?: string;
      vHotStockList?: Array<HotStock>;
    }
    interface HotFeatureInfoReq {
      sGuid?: string;
      sXua?: string;
      sUid?: string;
    }
    interface HotFeature {
      sFeatureName?: string;
      sFeatureSub?: string;
      sFeatureUrl?: string;
      sTag?: string;
      sInterceptor?: number;
      sBuryPoint?: string;
      iStatus?: number;
    }
    interface HotFeatureInfoRsp {
      iRet: number;
      sMsg?: string;
      vHotFeatureList?: Array<HotFeature>;
    }
    interface ConfigureLogicServer {
      getHotFeatureInfo: (req: HotFeatureInfoReq) => HotFeatureInfoRsp;
      getHotStockInfo: (req: HotStockInfoReq) => HotStockInfoRsp;
      getFloorInfo: (req: FloorInfoReq) => FloorInfoRsp;
      getRiskTip: (req: RiskTipReq) => RiskTipRsp;
      getOtherInfo: (req: OtherInfoReq) => OtherInfoRsp;
      getNoticeInfo: (req: NoticeInfoReq) => NoticeInfoRsp;
      getMessageInfo: (req: MessageInfoReq) => MessageInfoRsp;
      getFeatureInfoBatch: (req: FeatureInfoBatchReq) => FeatureInfoBatchRsp;
      getFeatureInfo: (req: FeatureInfoReq) => FeatureInfoRsp;
    }
  }
}
export {};