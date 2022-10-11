declare global {
  namespace ATG {
    enum E_TC_CLNT_TYPE {
      ETCT_INNER_WIN_PC = 1,
      ETCT_WIN_PC_CLNT = 2,
      ETCT_PHONE_CLNT = 3,
      ETCT_WEB_ENTRUST = 4,
      ETCT_MONITOR_CLNT = 5,
    }
    enum E_TC_ACCOUNT_TYPE {
      ETAT_CAPTICAL_ACC = 1,
      ETAT_STOCKHOLD_ACC = 2,
      ETAT_TRADE_ACC = 3,
      ETAT_BANK_ACC = 4,
      ETAT_BOND_ACC = 5,
      ETAT_CLNTL_ACC = 6,
      ETAT_TTN_ACC = 7,
    }
    interface TradeCookie {
      featureCode: string;
      createTime: string;
      seq: string;
      updateTime?: string;
    }
    enum E_RET_CODE {
      EARC_SUCC = 0,
      EARC_SYS_ERR = -1,
    }
    enum E_CLIENT_TYPE {
      E_APP_CLIENT = 0,
      E_CRM_CLIENT = 1,
    }
    interface TQHead {
      cmd?: number;
      compressed?: number;
      encrypted?: number;
      packetLen?: number;
      rawLen?: number;
      cookie?: number;
      mainid?: number;
      assisid?: number;
      custId?: number;
      license?: string;
      subCustId?: number;
      clientType?: E_CLIENT_TYPE;
      bussId?: number;
      stcId?: string;
      subTransType?: EAccountType;
      otherCustrId?: number;
    }
    interface CookieInfo {
      aesKey?: string;
      serialNumber?: number;
      userCode?: number;
      clientType?: number;
      accountType?: number;
      createTime?: string;
      updateTime?: string;
    }
    interface CheckAuthReq {
      clientVersion?: string;
      custId?: number;
      license?: string;
      machineCode?: string;
    }
    interface customerBaseInfoSubAccount {
      account?: string;
      custId?: number;
      type?: number;
    }
    interface customerBaseInfo {
      subs?: Array<customerBaseInfoSubAccount>;
      mobileNo?: string;
    }
    interface CheckAuthRspData {
      custId?: number;
      license?: string;
      login?: boolean;
      customerBaseVo?: customerBaseInfo;
    }
    interface CheckAuthRsp {
      code?: number;
      message?: string;
      success?: boolean;
      data?: CheckAuthRspData;
    }
  }
}
export {};