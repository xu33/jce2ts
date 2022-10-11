declare global {
  namespace DataCenter {
    enum OrderType {
      DESC = 0,
      ASC = 1,
    }
    interface PageInfo {
      iStartPage?: number;
      iPageSize?: number;
      field?: string;
      orderType?: OrderType;
    }
    enum PledgeType {
      ALL = 1,
      CJYJX = 2,
      CJPCX = 3,
      WDYJX = 4,
    }
    interface PledgeRiskItem {
      iSecUniCode?: number;
      iMktTypePar?: number;
      sSecCode?: string;
      sSecShortName?: string;
      fSPJ?: string;
      fYJX?: string;
      fPCX?: string;
      sGDMC?: string;
      fZYGS?: string;
      fZYBL?: string;
      sZYKSRQ?: string;
      sZYJSRQ?: string;
      sZQR?: string;
      sZYZT?: string;
      sSJRQ?: string;
      fNowPrice?: string;
      sSSBK?: string;
      sHS300?: string;
    }
    interface PledgeRiskItemByDate {
      iSecUniCode?: number;
      iMktTypePar?: number;
      sSecCode?: string;
      sSecShortName?: string;
      fSPJ?: string;
      fYJX?: string;
      fPCX?: string;
      sZYKSRQ?: string;
      fNowPrice?: string;
      fZYBL?: string;
      fZYGS?: string;
      sGDMC?: string;
      sZYZT?: string;
    }
    interface LJZYItem {
      iSecUniCode?: number;
      iMktTypePar?: number;
      sSecCode?: string;
      sSecShortName?: string;
      iPledgeCount?: number;
      fLJZYGS?: string;
      fPledgeRatio?: string;
      fNowPrice?: string;
      fMinYJX?: string;
      fMaxYJX?: string;
      fMinPCX?: string;
      fMaxPCX?: string;
      fYJXRatio?: string;
      fPCXRatio?: string;
    }
    interface PledgeRiskListReq {
      sBusId?: string;
      pageInfo?: PageInfo;
      pledgeType?: PledgeType;
    }
    interface PledgeRiskListByDateReq {
      sBusId?: string;
      pageInfo?: PageInfo;
      pledgeType?: PledgeType;
    }
    interface PledgeRiskListRsp {
      iRet?: number;
      sMsg?: string;
      iTotal?: number;
      vPledgeRiskList?: Array<PledgeRiskItem>;
    }
    interface PledgeRiskListByDateRsp {
      iRet?: number;
      sMsg?: string;
      iTotal?: number;
      vPledgeRiskList?: Array<PledgeRiskItemByDate>;
    }
    interface StkPledgeRiskReq {
      sBusId?: string;
      iSecUniCode?: number;
      sSecCode?: string;
      iMktTypePar?: number;
    }
    interface StkPledgeRiskInfo {
      iPcxCount?: number;
      iYjxCount?: number;
      iWjcCount?: number;
      iAllCount?: number;
      fPledgeRatio?: string;
      fYJXRatio?: string;
      fPCXRatio?: string;
    }
    interface StkPledgeRiskRsp {
      iRet?: number;
      sMsg?: string;
      stkPledgeRiskInfo?: StkPledgeRiskInfo;
      vPledgeRiskList?: Array<PledgeRiskItem>;
    }
    interface BondRiskItem {
      iSecUniCode?: number;
      iMktTypePar?: number;
      sSecCode?: string;
      sSecShortName?: string;
      sIssDate?: string;
      sBondShortName?: string;
      sBondLevel?: string;
      fIssSize?: string;
      fBondMatu?: string;
      sEndDate?: string;
      iIsDefault?: number;
      sDeclDate?: string;
      sBondType?: string;
    }
    enum BondType {
      All = 0,
      DEFAULT = 1,
      NO_DEFAULT = 2,
    }
    interface BondRiskListReq {
      sBusId?: string;
      pageInfo?: PageInfo;
      bondType?: BondType;
    }
    interface BondRiskListRsp {
      iRet?: number;
      sMsg?: string;
      iTotal?: number;
      vBondRiskList?: Array<BondRiskItem>;
    }
    interface StkBondRiskReq {
      sBusId?: string;
      iSecUniCode?: number;
      sSecCode?: string;
      iMktTypePar?: number;
    }
    interface StkBondRiskInfo {
      iIssueCount?: number;
      fBreachRate?: string;
      iCashCount?: number;
      iBreachCount?: number;
      sLastDeclDate?: string;
      fZDF?: string;
    }
    interface StkBondRiskRsp {
      iRet?: number;
      sMsg?: string;
      stkBondRiskInfo?: StkBondRiskInfo;
      vBondRiskList?: Array<BondRiskItem>;
    }
    interface LJZYListReq {
      sBusId?: string;
      pageInfo?: PageInfo;
    }
    interface LJZYListRsp {
      iRet?: number;
      sMsg?: string;
      iTotal?: number;
      vLJZYList?: Array<LJZYItem>;
    }
    interface CompanyRiskLogicServer {
      getLJZYList: (req: LJZYListReq) => LJZYListRsp;
      getStkBondRisk: (req: StkBondRiskReq) => StkBondRiskRsp;
      getBondRiskList: (req: BondRiskListReq) => BondRiskListRsp;
      getStkPledgeRisk: (req: StkPledgeRiskReq) => StkPledgeRiskRsp;
      getPledgeRiskByDateList: (req: PledgeRiskListByDateReq) => PledgeRiskListByDateRsp;
      getPledgeRiskList: (req: PledgeRiskListReq) => PledgeRiskListRsp;
    }
  }
}
export {};