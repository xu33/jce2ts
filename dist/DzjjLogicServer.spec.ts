declare global {
  namespace DataCenter {
    interface DzjjZXDZSJ {
      iSecUniCode?: number;
      iMktTypePar?: number;
      sSecCode?: string;
      sSecShortName?: string;
      sMZSM?: string;
      iDSHGGR?: number;
      fDZJG?: string;
      sSJJC?: string;
      fFXSL?: string;
      fMZJE?: string;
      fMZZJ?: string;
      iZXGGR?: number;
      fZJL?: string;
    }
    interface DzjjZXDZSJReq {
      sBusId?: string;
    }
    interface DzjjZXDZSJRsp {
      iRet?: number;
      sMsg?: string;
      vDzjjZXDZSJ?: Array<DzjjZXDZSJ>;
    }
    interface DzjjZXPF {
      iMktTypePar?: number;
      sSecCode?: string;
      sSecShortName?: string;
      iZXGGR?: number;
      sSJJC?: string;
      sMZSM?: string;
      fFXSL?: string;
      fDZJG?: string;
      fQJFQYZ?: string;
      iJLJJRQTS?: number;
      fJJSL?: string;
      fJJZZGBB?: string;
      fZJL?: string;
      fPFBL?: string;
      fPeRatio?: string;
    }
    interface DzjjZXPFReq {
      sBusId?: string;
    }
    interface DzjjZXPFRsp {
      iRet?: number;
      sMsg?: string;
      vDzjjZXPF?: Array<DzjjZXPF>;
    }
    interface DzjjPFJH {
      iMktTypePar?: number;
      sSecCode?: string;
      sSecShortName?: string;
      iZXGGR?: number;
      fDZJG?: string;
      fQJFQYZ?: string;
      fPFBL?: string;
      iJJRQ?: number;
    }
    interface DzjjPFJHReq {
      sBusId?: string;
    }
    interface DzjjPFJHRsp {
      iRet?: number;
      sMsg?: string;
      vDzjjPFJH?: Array<DzjjPFJH>;
    }
    interface DzjjJJFX {
      iMktTypePar?: number;
      sSecCode?: string;
      sSecShortName?: string;
      iZXGGR?: number;
      fDZJG?: string;
      fQJFQYZ?: string;
      iJLJJRQTS?: number;
      fJJSL?: string;
      fJJZZGBB?: string;
      fYJL?: string;
    }
    interface DzjjJJFXReq {
      sBusId?: string;
    }
    interface DzjjJJFXRsp {
      iRet?: number;
      sMsg?: string;
      vDzjjJJFX?: Array<DzjjJJFX>;
    }
    interface DzjjDZXQByCode {
      iSecUniCode?: number;
      iMktTypePar?: number;
      sSecCode?: string;
      sSecShortName?: string;
      iZXGGR?: number;
      iDSHGGR?: number;
      iFXJGGGR?: number;
      sSJJC?: string;
      fDZJG?: string;
      iJJRQ?: number;
      fMJGF?: string;
      fMZZJ?: string;
      sZFSM?: string;
      sZJYT?: string;
      sDZJZ?: string;
      fQJFQYZ_GG?: string;
      fQJFQYZ_ZJL?: string;
      fGGYLZF?: string;
      fZJL?: string;
      fZXJ?: string;
      fZDF?: string;
    }
    interface DzjjDZXQByCodeReq {
      sBusId?: string;
      iMktTypePar?: number;
      sSecCode?: string;
    }
    interface DzjjDZXQByCodeRsp {
      iRet?: number;
      sMsg?: string;
      vDzjjDZXQByCode?: Array<DzjjDZXQByCode>;
    }
    interface DzjjLogicServer {
      getDzjjDZXQByCode: (req: DzjjDZXQByCodeReq) => DzjjDZXQByCodeRsp;
      getDzjjJJFX: (req: DzjjJJFXReq) => DzjjJJFXRsp;
      getDzjjPFJH: (req: DzjjPFJHReq) => DzjjPFJHRsp;
      getDzjjZXPF: (req: DzjjZXPFReq) => DzjjZXPFRsp;
      getDzjjZXDZSJ: (req: DzjjZXDZSJReq) => DzjjZXDZSJRsp;
    }
  }
}
export {};