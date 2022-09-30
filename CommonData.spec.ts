declare global {
  namespace HQSys {
    interface HStockUnique {
      shtSetcode?: string;
      sCode?: string;
    }
    //财务权息版本数据
    interface HCWVerData {
      shtSetCode?: string;
      sCode?: string;
      lCWVersion?: string; ////财务数据最新版本

      lQXVersion?: string; ////权息数据最新版本

      lLTGChgVersion?: string; ////变动流通股最新版本

    }
    enum E_STOCK_TYPE {
      E_STOCK_TYPE_A, // A股

      E_STOCK_TYPE_B, // B股

    } // 股票类型

    enum E_SHT_NAME_CHG_TYPE {
      E_OTHER_CHG, // 其他

      E_XGFX_CHG, // 新股发行

      E_XGSR_CHG, // 新股首日

      E_ST_CHG, // ST

      E_CXST_CHG, // 撤销ST

      E_PT_CHG, // PT

      E_CXPT_CHG, // 撤销PT

      E_XST_CHG, // *ST

      E_CXXST_CHG, // 撤销*ST

      E_CXXSTBST_CHG, // 撤销*ST变成ST

      E_WCGGJCJG_CHG, // 完成股改简称加G

      E_QDGGWCBZG_CHG, // 去掉股改完成标志G

      E_JSGGWWCBZS_CHG, // 加上股改未完成标志S

      E_WCGGJCQDS_CHG, // 完成股改简称去掉S

      E_WCGGQDSTCXXSTBST_CHG, // 完成股改去掉S同时撤销*ST变成ST

      E_GSMCHJYFWBG_CHG, // 公司名称或经营范围变更

      E_HFSSSR_CHG, // 恢复上市首日

      E_HFSSCR_CHG, // 恢复上市次日

    } // 股票简称变动类型

    // 股票简称变动结构
    interface HNameChgData {
      shtMarket?: string;
      sCode?: string;
      lChgDate?: string; //// 变更日期

      sOldName?: string; //// 变更前名字

      sNewName?: string; //// 变更后名字

      eType?: E_SHT_NAME_CHG_TYPE; //// 变更类型

    }
    // 返回客户端的曾用名结构
    interface HNameUsedBefore {
      lChgDate?: string; //// 变更日期

      sOldName?: string; //// 变更前名字

      eType?: E_SHT_NAME_CHG_TYPE; //// 变更类型

    }
    interface HStockUpInfo {
      sCode?: string; ////股票代码

      shtUnit?: string; ////最小成交单元

      sName?: string; ////股票名称

      iVolBase?: string;
      cPrecise?: byte;
      shtType?: string;
      vChgData?: Array<HNameUsedBefore>; //// 股票名称变更历史

      iBaseFreshCount?: string; ////给线上老版本客户端使用，极智版无用

      iGbFreshCount?: string; ////给线上老版本客户端使用，极智版无用

    }
    interface HStockDelistInfo {
      stInfo?: HStockUpInfo;
      lTsDate?: string; //// 退市日期

    }
    interface HStockSuspendInfo {
      stInfo?: HStockUpInfo;
      lSuspendDate?: string; ////暂停上市日期

    }
    interface HStockUpcomingInfo {
      stInfo?: HStockUpInfo;
      lUpcomingDate?: string; //// 上市日期

      dPrice?: string; //// 上市发行价格

    }
    interface HMarketCodes {
      shtSetCode?: string;
      shtFlag?: string;
      sCheckSum?: string;
      vInfo?: Array<HStockUpInfo>;
      vDelist?: Array<HStockDelistInfo>; //// 退市股票

      vUpcoming?: Array<HStockUpcomingInfo>; //// 即将上市

      vSuspend?: Array<HStockSuspendInfo>; //// 暂停上市

    }
    // 财务数据
    interface SCWData {
      shtMarket: string;
      sCode: string;
      iUpdateDate?: string; //// 更新日期

      iIPODate?: string; //// 首次公开募股 Initial Public Offerings  上市日期

      dZGB?: string; //// 总股本

      dLTGB?: string; //// 流通股本

      dBShare?: string; //// B 股

      dHShare?: string; //// H 股

      dPerCapitaHold?: string; //// 人均持股

      dMGSY?: string; //// 每股收益（earnings per share）

      dMGJZC?: string; //// 每股净资产(BVPS)

      dTZMGJZC?: string; //// 调整每股净资产

      dMGGJJ?: string; //// 每股公积金 Accumulation fund per share

      dMGWFPLR?: string; //// 每股未分配

      dYYSRTB?: string; //// 营业收入同比

      dJLRTB?: string; //// 净利润同比

      dJZCSYL?: string; //// 净资产收益率

      dJLL?: string; //// 净利率

      dYYLRL?: string; //// 营业利润率

      dXSMLL?: string; //// 销售毛利率

      dLDBL?: string; //// 流动比率

      dZCFZBL?: string; //// 资产负债比率

      dGDQYB?: string; //// 股东权益比

      dYYSR?: string; //// 营业收入

      dYYCB?: string; //// 营业成本

      dTZSY?: string; //// 投资收益

      dYYLR?: string; //// 营业利润

      dYYWSZ?: string; //// 营业外收支

      dLRZE?: string; //// 利润总额

      dJLR?: string; //// 净利润

      dZZC?: string; //// 总资产

      dLDZC?: string; //// 流动资产

      dGDZC?: string; //// 固定资产

      dWXZC?: string; //// 无形资产

      dCQGQTZ?: string; //// 长期股权投资

      dZFZ?: string; //// 总负债

      dLDFZ?: string; //// 流动负债

      dCQFZ?: string; //// 长期负债

      dJZC?: string; //// 净资产

      dZBGJJ?: string; //// 资本公积金

      dWFPLR?: string; //// 未分配利润

      lBGQ?: string; //// 报告期

      sSSHY?: string; //// 所属行业

      dFXJ?: string; //// 发行价

      lVer?: string; //// 版本号

      dMGSYDT?: string; //// 每股收益动态

      dMGJZCDT?: string; //// 每股净资产动态

      dYYSRZZL?: string; //// 3年营业收入增长率

      dJLRZZL?: string; //// 3年净利润增长率

      sSSHYCode?: string; //// 所属行业代码，与sSSHY对应

    }
    enum EQXChgType {
      E_PX, // 派息

      E_SG, // 送股

      E_ZZ, // 转增

      E_PG, // 配股

      E_GKZF, // 公开增发

      E_FGKZF, // 非公开增发

    } // 权息变动类型  对应数据库中的类型

    // 权息变动数据
    interface SQXChgData {
      lChanDate: string; //// 变更日期

      dCashBt?: string; //// 每10股派现

      dBonusShr?: string; //// 每10股送股

      dCapShr?: string; //// 每10股转增

      dAllotPct?: string; //// 10配几

      dAllotPrice?: string; //// 配股价

      dIssPri?: string; //// 增发价格

      dIssShareNum?: string; //// 发行数量

      eType?: EQXChgType; //// 权息变动类型

    }
    interface SQXData {
      shtMarket: string;
      sCode: string;
      mChgData?: Array<SQXChgData>;
      lVer?: string; //// 版本号

    }
    // 退市股票返回结构
    interface HTSStock {
      shtMarket?: string; //// 市场

      sCode?: string; //// 股票代码

      sName?: string; //// 股票名称

      lTsDate?: string; //// 退市日期 格式 YYYYMMDD

      eType?: E_STOCK_TYPE; //// 股票类型

      iBlockType?: string; //// 股票板块类别

    }
    // 即将上市股票数据结构
    interface HJjssStockData {
      shtMarket?: string;
      sCode?: string;
      sName?: string; //// 股票名称

      dPrice?: string; //// 发行价

      lDate?: string; //// 上市日期

      eType?: E_STOCK_TYPE; //// 股票类型

    }
    interface HLTGChgData {
      lChgTime?: string; //// 变动时间

      lAFloatShare?: string; //// 流通A股

      lBFloatShare?: string; //// 流通B股

      lHFloatShare?: string; //// 流通H股

      dZGB?: string; //// 总股本

    }
    interface HLTGChg {
      shtMarket?: string; //// 市场

      sCode?: string; //// 股票代码

      lVer?: string; //// 版本号

      vData?: Array<HLTGChgData>; //// 变动数据

    }
    //新股信息
    interface HNewStockInfo {
      shtMarket?: string;
      sCode?: string;
      dFXJ?: string; ////发行价

      sListDate?: string; ////上市日期

      sName?: string; //// 股票名称     

      iAPLDate?: string; //// 申购起始日 (YYYYMMDD)

    }
    // 经纪商数据
    interface HBrokerData {
      sId?: string; //// 经纪代号

      sEnName?: string; //// 英文名

      sEnShtName?: string; //// 英文名简称

      sChName?: string; //// 中文名

      sChShtName?: string; //// 中文名简称

    }
    //港股经纪人队列
    interface HBrokerQueue {
      shtSetcode?: string; ////股票市场

      sCode?: string; ////股票代码

      buySide?: Record<string, Array<HBrokerData>>; ////level对应的买方经纪人列表

      sellSide?: Record<string, Array<HBrokerData>>; ////level对应的卖方经纪人列表

    }
    // 交易日历
    interface TradeCale {
      iDate?: string; //// 日期，格式：YYYYMMDD

      shtStatus?: string; //// 1：交易日；2：非交易日；3：提前闭市；4：半日交易

    }
  }
}
export {};