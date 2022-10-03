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
      E_STOCK_TYPE_A,
      E_STOCK_TYPE_B,
    }
    enum E_SHT_NAME_CHG_TYPE {
      E_OTHER_CHG,
      E_XGFX_CHG,
      E_XGSR_CHG,
      E_ST_CHG,
      E_CXST_CHG,
      E_PT_CHG,
      E_CXPT_CHG,
      E_XST_CHG,
      E_CXXST_CHG,
      E_CXXSTBST_CHG,
      E_WCGGJCJG_CHG,
      E_QDGGWCBZG_CHG,
      E_JSGGWWCBZS_CHG,
      E_WCGGJCQDS_CHG,
      E_WCGGQDSTCXXSTBST_CHG,
      E_GSMCHJYFWBG_CHG,
      E_HFSSSR_CHG,
      E_HFSSCR_CHG,
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
      iVolBase?: string;
      cPrecise?: string;
      shtType?: string;
      vChgData?: Array<HNameUsedBefore>;
      iBaseFreshCount?: string;
      iGbFreshCount?: string;
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
      iUpdateDate?: string;
      iIPODate?: string;
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
      E_PX,
      E_SG,
      E_ZZ,
      E_PG,
      E_GKZF,
      E_FGKZF,
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
      iBlockType?: string;
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
      iAPLDate?: string;
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
      buySide?: Record<string, Array<HBrokerData>>;
      sellSide?: Record<string, Array<HBrokerData>>;
    }
    interface TradeCale {
      iDate?: string;
      shtStatus?: string;
    }
  }
}
export {};