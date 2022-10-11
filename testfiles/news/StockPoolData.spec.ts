declare global {
  namespace NewsRecom {
    enum E_NEWS_INDEX_TYPE {
      E_INDEX_NONE = 0,
      E_INDEX_WXCP = 1,
      E_INDEX_QKJCY = 2,
      E_INDEX_ZTJB = 3,
      E_INDEX_DXJJ = 4,
      E_INDEX_ZLGJ = 5,
      E_INDEX_ZLCT = 6,
      E_INDEX_HJJC = 7,
      E_INDEX_SWJC = 8,
      E_INDEX_LS_F = 9,
      E_INDEX_TS_F = 10,
      E_INDEX_BSJK = 11,
      E_INDEX_DYGZMX = 12,
      E_INDEX_DYZCMX = 13,
      E_INDEX_XTXG = 14,
      E_INDEX_TSXG = 15,
      E_INDEX_JDXG = 16,
      E_INDEX_YHXG = 17,
      E_INDEX_MJXG = 18,
      E_INDEX_MJ60 = 19,
      E_INDEX_QSDXJGG = 20,
      E_INDEX_MMRQJGG = 21,
      E_INDEX_JYAQJGG = 22,
      E_INDEX_CWPGJGG = 23,
      E_INDEX_ZHPXJGG = 24,
      E_INDEX_QSAQPF = 25,
      E_INDEX_QSAQZCYL = 26,
      E_INDEX_QSAQZT = 27,
      E_INDEX_ZJDL = 28,
      E_INDEX_ZJKP = 29,
      E_INDEX_ZJLX = 30,
      E_INDEX_DPFX = 31,
      E_INDEX_CWML = 32,
      E_INDEX_SSZF = 33,
      E_INDEX_FLXG12 = 34,
      E_INDEX_FLXG13 = 35,
      E_INDEX_DDX_RED = 36,
      E_INDEX_DYYH = 37,
      E_INDEX_DYEH = 38,
      E_INDEX_HJY = 39,
      E_INDEX_PKS = 40,
      E_INDEX_DZZJ = 41,
      E_INDEX_GRZMR = 42,
      E_INDEX_GSZG = 43,
      E_INDEX_JGYZG = 44,
      E_INDEX_MJDY = 45,
      E_INDEX_PJDS = 46,
      E_INDEX_SCRMGZ = 47,
      E_INDEX_DYDZ = 48,
      E_INDEX_YJYZ = 49,
      E_INDEX_YPZTYC = 50,
      E_INDEX_YQNG = 51,
      E_INDEX_BDLT = 52,
      E_INDEX_CDLT = 53,
      E_INDEX_CZLT = 54,
      E_INDEX_JZLT = 55,
      E_INDEX_QSLT = 56,
      E_INDEX_RDLT = 57,
      E_INDEX_ZCLT = 58,
      E_INDEX_ZTLT = 59,
      E_INDEX_ZJLT = 60,
      E_INDEX_XGZB1 = 61,
      E_INDEX_XGZB2 = 62,
      E_INDEX_XGZB3 = 63,
      E_INDEX_XGZB4 = 64,
      E_INDEX_XGZB5 = 65,
      E_INDEX_XGZB6 = 66,
      E_INDEX_XGZB7 = 67,
      E_INDEX_XGZB8 = 68,
      E_INDEX_XGZB9 = 69,
      E_INDEX_XGZB10 = 70,
      E_INDEX_XGZB11 = 71,
      E_INDEX_XGZB12 = 72,
      E_INDEX_XGZB13 = 73,
      E_INDEX_XGZB14 = 74,
      E_INDEX_XGZB15 = 75,
      E_INDEX_XGZB16 = 76,
      E_INDEX_XGZB17 = 77,
      E_INDEX_XGZB18 = 78,
      E_INDEX_XGZB19 = 79,
      E_INDEX_XGZB20 = 80,
      E_INDEX_BDGZ = 81,
      E_INDEX_DXLS = 82,
      E_INDEX_FZXZ = 83,
      E_INDEX_FLZT = 84,
      E_INDEX_LHXF = 85,
      E_INDEX_WJJ = 86,
      E_INDEX_WJCP = 87,
      E_INDEX_YZQD = 88,
      E_INDEX_FCT_BOLL = 89,
      E_INDEX_FCT_KDJ = 90,
      E_INDEX_FCT_MACD = 91,
      E_INDEX_FCT_RSI = 92,
      E_INDEX_FCT_DKX = 93,
      E_INDEX_FCT_DYZCMX_JGYW = 94,
      E_INDEX_KDJ_DSX = 95,
      E_INDEX_MA_DSX = 96,
      E_INDEX_MACD_DSX = 97,
      E_INDEX_BSJK_BDJK = 98,
      E_INDEX_BSJK_WXJK = 99,
      E_INDEX_BSJK_SBFZJK = 100,
      E_INDEX_TSXG_CPLS = 101,
      E_INDEX_TSXG_ZJBY = 102,
      E_INDEX_TSXG_MACDDZQGZ = 103,
      E_INDEX_TSXG_GSBD = 104,
      E_INDEX_TSXG_DKLC = 105,
      E_INDEX_TSXG_HCNLBY = 106,
      E_INDEX_XTXG_MACDJX = 107,
      E_INDEX_XTXG_DBHSB = 108,
      E_INDEX_XTXG_SDHT = 109,
      E_INDEX_XTXG_JDXG = 110,
      E_INDEX_XTXG_DFP = 111,
      E_INDEX_XTXG_LNJB = 112,
      E_INDEX_XTXG_PZTP = 113,
      E_INDEX_XTXG_XBSY = 114,
      E_INDEX_MJXG_DXLS = 115,
      E_INDEX_MJXG_SSQL = 116,
      E_INDEX_MJXG_YXQN = 117,
      E_INDEX_YHXG_ZJXB = 118,
      E_INDEX_YHXG_HJZ = 119,
      E_INDEX_JDXG_BHLCT = 120,
      E_INDEX_JDXG_MMPP = 121,
      E_INDEX_JDXG_QSDD = 122,
      E_INDEX_JDXG_CYHT = 123,
      E_INDEX_JDXG_BTX = 124,
      E_INDEX_JDXG_QLDX = 125,
      E_INDEX_MHDZ = 126,
      E_INDEX_CPXHD = 127,
      E_INDEX_DXJJ_HIS = 128,
      E_INDEX_DYYH_HIS = 129,
      E_INDEX_DYEH_HIS = 130,
      E_INDEX_HJY_HIS = 131,
      E_INDEX_PKS_HIS = 132,
      E_INDEX_DJPD = 133,
      E_INDEX_WXCP_B = 134,
      E_INDEX_WXCP_B_HIS = 135,
      E_INDEX_WXCP_BT = 136,
      E_INDEX_ZTJBNEW = 137,
      E_INDEX_ZTJB_APP = 138,
      E_INDEX_XSBDW = 139,
      E_INDEX_PYTHON_HSB = 140,
      E_INDEX_PYTHON_QMZX = 141,
      E_INDEX_PYTHON_DWCZX = 142,
      E_INDEX_PYTHON_KZTM = 143,
      E_INDEX_PYTHON_SGCX = 144,
      E_INDEX_PYTHON_DFP = 145,
      E_INDEX_PYTHON_SSSF = 146,
      E_INDEX_PYTHON_SKYX = 147,
      E_INDEX_PYTHON_PTDB = 148,
      E_INDEX_PYTHON_DWBPYX = 149,
      E_INDEX_PYTHON_XSYJ = 150,
      E_INDEX_ZLGZ = 151,
      E_INDEX_ZLT0 = 152,
      E_INDEX_ZLT0_RTMIN = 153,
      E_INDEX_ZLT0_DAY = 154,
      E_INDEX_LB = 155,
      E_INDEX_LB_RTMIN = 156,
      E_INDEX_XSBDXG = 157,
      E_INDEX_XSBDXG_HIS = 158,
      E_INDEX_QDYCL = 159,
      E_INDEX_ZJDL_L2 = 160,
      E_INDEX_XSBDW_YJ = 161,
      E_INDEX_ZJDL_L2_RTMIN = 162,
      E_INDEX_ZJDL_L2_DAY = 163,
    }
    interface NewsSIndexDataNew {
      shtMarket?: string;
      sCode?: string;
      sStockName?: string;
      dChangeRate?: string;
      sSignalLastTime?: string;
      sChoseReason?: string;
      sChoseTime?: string;
      iLimitUpType?: number;
      sUrl?: string;
    }
    interface NewsRecomTgLive {
      sImgUrl?: string;
      sLiveRoomName?: string;
      sLiveTitle?: string;
      iJoinNum?: number;
      sLiveUrl?: string;
      iStatus?: number;
      iCommentNum?: number;
      sNewMessage?: string;
      bHasImage?: boolean;
      sLiveId?: string;
    }
    interface NewsContentColumn {
      summary?: string;
      title?: string;
      toUrl?: string;
    }
    interface NewsVedioInfo {
      multiMediaStyle?: number;
      multiMediaStatus?: number;
      fileUrl?: string;
      videoUrl?: string;
      title?: string;
      teacherName?: string;
      toUrl?: string;
      type?: number;
      playCount?: number;
      vedioId?: string;
      startTime?: number;
      endTime?: number;
    }
    interface NewsTagInfo {
      type: number;
      value?: number;
      tittle?: string;
    }
    interface OneDynamicData {
      id?: number;
      stockName?: string;
      stockCode?: string;
      market?: number;
      message?: string;
      dataName?: string;
      tag?: NewsTagInfo;
      createTime?: string;
    }
    interface DynamicData {
      dataCount?: number;
      vDynamicData?: Array<OneDynamicData>;
    }
    interface NewsRecomAssemblyData {
      vTgLive?: Array<NewsRecomTgLive>;
      vContentColumn?: Array<NewsContentColumn>;
      vVedioInfo?: Array<NewsVedioInfo>;
      dynamicData?: DynamicData;
    }
  }
}
export {};