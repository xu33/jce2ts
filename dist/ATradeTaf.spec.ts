declare global {
  namespace AT {
    enum E_ATRADE_RET_CODE {
      EARC_PARAM_ERR = -4,
      EARC_AUTH_ERR = -3,
      EARC_VERSION_ERR = -2,
      EARC_SYS_ERR = -1,
      EARC_SUCC = 0,
    }
    enum E_ATRADE_PROTO_TYPE {
      EAPT_JCE = 0,
      EAPT_JSON = 1,
      EAPT_CGI = 2,
    }
    interface UserSeqKey {
      uid?: string;
    }
    interface UserSeqValue {
      seq?: number;
      latestTime?: string;
    }
    interface ATradeReq {
      guid?: string;
      xua?: string;
      deviceID?: string;
      seq?: number;
      cmd?: string;
      pt?: E_ATRADE_PROTO_TYPE;
      uid?: string;
      data?: Array<string>;
      extend?: Record<string, string>;
    }
    interface ATradeRsp {
      seq?: number;
      cmd?: string;
      pt?: E_ATRADE_PROTO_TYPE;
      uid?: string;
      data?: Array<string>;
      extend?: Record<string, string>;
    }
    interface ATradeSiteReq {
      guid?: string;
      xua?: string;
      did?: string;
      seq?: number;
      uid?: string;
    }
    interface ATradeSiteRsp {
      curConn?: number;
    }
    interface ATradeTaf {
      getSiteInfo: (req: ATradeSiteReq) => ATradeSiteRsp;
      doTrade: (req: ATradeReq) => ATradeRsp;
    }
  }
}
export {};