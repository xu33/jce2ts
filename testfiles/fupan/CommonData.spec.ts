declare global {
  namespace HQSys {
    interface HStockUnique {
      shtSetcode?: string;
      sCode?: string;
    }
    interface HCWVerData {
      shtSetCode?: string;
      sCode?: string;
      lCWVersion?: string;
      lQXVersion?: string;
      lLTGChgVersion?: string;
    }
    enum E_STOCK_TYPE {
      E_STOCK_TYPE_A = 1,
      E_STOCK_TYPE_B = 2,
    }
    enum E_SHT_NAME_CHG_TYPE {
      E_OTHER_CHG = 0,
      E_XGFX_CHG = 1,
      E_XGSR_CHG = 2,
      E_ST_CHG = 3,
      E_CXST_CHG = 4,
      E_PT_CHG = 5,
      E_CXPT_CHG = 6,
      E_XST_CHG = 7,
      E_CXXST_CHG = 8,
      E_CXXSTBST_CHG = 9,
      E_WCGGJCJG_CHG = 10,
      E_QDGGWCBZG_CHG = 11,
      E_JSGGWWCBZS_CHG = 12,
      E_WCGGJCQDS_CHG = 13,
      E_WCGGQDSTCXXSTBST_CHG = 15,
      E_GSMCHJYFWBG_CHG = 16,
      E_HFSSSR_CHG = 17,
      E_HFSSCR_CHG = 18,
    }
    interface HNameChgData {
      shtMarket?: string;
      sCode?: string;
      lChgDate?: string;
      sOldName?: string;
      sNewName?: string;
      eType?: E_SHT_NAME_CHG_TYPE;
    }
    interface HNameUsedBefore {
      lChgDate?: string;
      sOldName?: string;
      eType?: E_SHT_NAME_CHG_TYPE;
    }
    interface HStockUpInfo {
      sCode?: string;
      shtUnit?: string;
      sName?: string;
      iVolBase?: number;
      cPrecise?: string;
      shtType?: string;
      vChgData?: Array<HNameUsedBefore>;
      iBaseFreshCount?: number;
      iGbFreshCount?: number;
    }
    interface HStockDelistInfo {
      stInfo?: HStockUpInfo;
      lTsDate?: string;
    }
    interface HStockSuspendInfo {
      stInfo?: HStockUpInfo;
      lSuspendDate?: string;
    }
    interface HStockUpcomingInfo {
      stInfo?: HStockUpInfo;
      lUpcomingDate?: string;
      dPrice?: string;
    }
    interface HMarketCodes {
      shtSetCode?: string;
      shtFlag?: string;
      sCheckSum?: string;
      vInfo?: Array<HStockUpInfo>;
      vDelist?: Array<HStockDelistInfo>;
      vUpcoming?: Array<HStockUpcomingInfo>;
      vSuspend?: Array<HStockSuspendInfo>;
    }
    interface SCWData {
      shtMarket: string;
      sCode: string;
      iUpdateDate?: number;
      iIPODate?: number;
      dZGB?: string;
      dLTGB?: string;
      dBShare?: string;
      dHShare?: string;
      dPerCapitaHold?: string;
      dMGSY?: string;
      dMGJZC?: string;
      dTZMGJZC?: string;
      dMGGJJ?: string;
      dMGWFPLR?: string;
      dYYSRTB?: string;
      dJLRTB?: string;
      dJZCSYL?: string;
      dJLL?: string;
      dYYLRL?: string;
      dXSMLL?: string;
      dLDBL?: string;
      dZCFZBL?: string;
      dGDQYB?: string;
      dYYSR?: string;
      dYYCB?: string;
      dTZSY?: string;
      dYYLR?: string;
      dYYWSZ?: string;
      dLRZE?: string;
      dJLR?: string;
      dZZC?: string;
      dLDZC?: string;
      dGDZC?: string;
      dWXZC?: string;
      dCQGQTZ?: string;
      dZFZ?: string;
      dLDFZ?: string;
      dCQFZ?: string;
      dJZC?: string;
      dZBGJJ?: string;
      dWFPLR?: string;
      lBGQ?: string;
      sSSHY?: string;
      dFXJ?: string;
      lVer?: string;
      dMGSYDT?: string;
      dMGJZCDT?: string;
      dYYSRZZL?: string;
      dJLRZZL?: string;
      sSSHYCode?: string;
    }
    enum EQXChgType {
      E_PX = 1,
      E_SG = 2,
      E_ZZ = 3,
      E_PG = 4,
      E_GKZF = 5,
      E_FGKZF = 6,
    }
    interface SQXChgData {
      lChanDate: string;
      dCashBt?: string;
      dBonusShr?: string;
      dCapShr?: string;
      dAllotPct?: string;
      dAllotPrice?: string;
      dIssPri?: string;
      dIssShareNum?: string;
      eType?: EQXChgType;
    }
    interface SQXData {
      shtMarket: string;
      sCode: string;
      mChgData?: Array<SQXChgData>;
      lVer?: string;
    }
    interface HTSStock {
      shtMarket?: string;
      sCode?: string;
      sName?: string;
      lTsDate?: string;
      eType?: E_STOCK_TYPE;
      iBlockType?: number;
    }
    interface HJjssStockData {
      shtMarket?: string;
      sCode?: string;
      sName?: string;
      dPrice?: string;
      lDate?: string;
      eType?: E_STOCK_TYPE;
    }
    interface HLTGChgData {
      lChgTime?: string;
      lAFloatShare?: string;
      lBFloatShare?: string;
      lHFloatShare?: string;
      dZGB?: string;
    }
    interface HLTGChg {
      shtMarket?: string;
      sCode?: string;
      lVer?: string;
      vData?: Array<HLTGChgData>;
    }
    interface HNewStockInfo {
      shtMarket?: string;
      sCode?: string;
      dFXJ?: string;
      sListDate?: string;
      sName?: string;
      iAPLDate?: number;
    }
    interface HBrokerData {
      sId?: string;
      sEnName?: string;
      sEnShtName?: string;
      sChName?: string;
      sChShtName?: string;
    }
    interface HBrokerQueue {
      shtSetcode?: string;
      sCode?: string;
      buySide?: Record<number, Array<HBrokerData>>;
      sellSide?: Record<number, Array<HBrokerData>>;
    }
    interface TradeCale {
      iDate?: number;
      shtStatus?: string;
    }
  }
}
export {};