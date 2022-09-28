declare global {
  namespace AT {
    /*
            ID:rzrq_cybph_wtcd
            Desc:融资融券/创业板盘后/委托撤单
            Version: 1.0
            Date:20190507
        */
    interface rzrq_cybph_wtcd_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

      jysdm?: string; //交易市场,,DICT

      gddm?: string; //股东代码,,VARCHAR

      wtxh?: string; //委托序号,,VARCHAR

    }
    interface rzrq_cybph_wtcd_htxx_info {
      wtxh?: string; //委托序号,,INTEGER

      htxh?: string; //合同序号,,VARCHAR

      fhxx?: string; //返回信息,,VARCHAR

    }
    interface rzrq_cybph_wtcd_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      htxx?: rzrq_cybph_wtcd_htxx_info[];
    }

    /*
            ID:rzrq_cybph_plcd
            Desc:融资融券/创业板盘后/批量撤单
            Version: 1.0
            Date:20150505
        */
    interface rzrq_cybph_plcd_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

      wtph?: string; //委托批号,,VARCHAR

      gddm?: string; //股东代码,对于顶点柜台必传,复数，以|分割,VARCHAR

      jysdm?: string; //交易市场,对于顶点柜台必传，复数，以|分割,DICT

      wtxh?: string; //委托序号,以'|'号分隔,VARCHAR

    }
    interface rzrq_cybph_plcd_sblb_info {
      wtxh?: string; //委托序号,,VARCHAR

      errcode?: string; //错误代码,,VARCHAR

      errmsg?: string; //错误信息,,VARCHAR

    }
    interface rzrq_cybph_plcd_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      sblb?: rzrq_cybph_plcd_sblb_info[];
    }

    /*
            ID:rzrq_cybph_drwtcx
            Desc:融资融券/创业板盘后/当日委托查询
            Version: 1.0
            Date:20190507
        */
    interface rzrq_cybph_drwtcx_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

      gddm?: string; //股东代码,不送查全部,VARCHAR

      zqdm?: string; //证券代码,不送查全部,VARCHAR

      wtxh?: string; //委托序号,不送查全部,INTEGER

      cxfx?: string; //查询方向,1向下/0向上查询方向,VARCHAR

      qqhs?: string; //请求行数,每次取的行数,INTEGER

      dwc?: string; //定位串,第一次填空,VARCHAR

    }
    interface rzrq_cybph_drwtcx_cxlb_info {
      dwc?: string; //定位串,,VARCHAR

      wtrq?: string; //委托日期,,DATE8

      wtxh?: string; //委托序号,,INTEGER

      htxh?: string; //合同序号,,INTEGER

      khdm?: string; //客户代码,,INTEGER

      zjzh?: string; //资金账户,,VARCHAR

      gddm?: string; //股东代码,,VARCHAR

      wtsj?: string; //委托时间,,VARCHAR

      jysdm?: string; //交易所代码,,DICT

      zqdm?: string; //证券代码,,VARCHAR

      zqmc?: string; //证券名称,,VARCHAR

      wtjg?: string; //委托价格,,DECIMAL

      wtsl?: string; //委托数量,,INTEGER

      cjjg?: string; //成交价格,,DECIMAL

      cjsl?: string; //成交数量,,INTEGER

      mmlb?: string; //买卖类别,,DICT

      mmlbsm?: string; //买卖类别说明,,VARCHAR

      wtzt?: string; //委托状态,,DICT

      wtztsm?: string; //委托状态说明,,VARCHAR

      wtje?: string; //委托金额,,DECIMAL

      cjje?: string; //成交金额,,DECIMAL

      wtlb?: string; //委托类别,,DICT

      wtlbsm?: string; //委托类别说明,,VARCHAR

      fdyy?: string; //错误信息,,VARCHAR

      cdbz?: string; //撤单标志,,DICT

      cdbzsm?: string; //撤单标志说明,,VARCHAR

      wtlx?: string; //委托类型,,DICT

      wtlxsm?: string; //委托类型说明,,DICT

    }
    interface rzrq_cybph_drwtcx_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      cxlb?: rzrq_cybph_drwtcx_cxlb_info[];
    }

    /*
            ID:rzrq_cybph_lswtcx
            Desc:融资融券/创业板盘后/历史委托查询
            Version: 1.0
            Date:20190507
        */
    interface rzrq_cybph_lswtcx_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

      gddm?: string; //股东代码,不送查全部,VARCHAR

      zqdm?: string; //证券代码,不送查全部,VARCHAR

      wtxh?: string; //委托序号,不送查全部,INTEGER

      cxfx?: string; //查询方向,1向下/0向上查询方向，盘后查询记录正序返回,VARCHAR

      qqhs?: string; //请求行数,每次取的行数,INTEGER

      dwc?: string; //定位串,第一次填空,VARCHAR

      qsrq?: string; //起始日期,,DATE8

      zzrq?: string; //终止日期,,DATE8

    }
    interface rzrq_cybph_lswtcx_cxlb_info {
      dwc?: string; //定位串,,VARCHAR

      wtrq?: string; //委托日期,,DATE8

      wtxh?: string; //委托序号,,INTEGER

      htxh?: string; //合同序号,,INTEGER

      khdm?: string; //客户代码,,INTEGER

      zjzh?: string; //资金账户,,VARCHAR

      gddm?: string; //股东代码,,VARCHAR

      wtsj?: string; //委托时间,,VARCHAR

      jysdm?: string; //交易所代码,,DICT

      zqdm?: string; //证券代码,,VARCHAR

      zqmc?: string; //证券名称,,VARCHAR

      wtjg?: string; //委托价格,,DECIMAL

      wtsl?: string; //委托数量,,INTEGER

      cjjg?: string; //成交价格,,DECIMAL

      cjsl?: string; //成交数量,,INTEGER

      cjje?: string; //成交金额,,DECIMAL

      mmlb?: string; //买卖类别,,DICT

      mmlbsm?: string; //买卖类别说明,,VARCHAR

      wtzt?: string; //委托状态,,DICT

      wtztsm?: string; //委托状态说明,,VARCHAR

      wtje?: string; //委托金额,,DECIMAL

      wtlb?: string; //委托类别,,DICT

      wtlbsm?: string; //委托类别说明,,VARCHAR

      cdbz?: string; //撤单标志,,DICT

      cdbzsm?: string; //撤单标志说明,,VARCHAR

      fdyy?: string; //错误信息,,VARCHAR

    }
    interface rzrq_cybph_lswtcx_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      cxlb?: rzrq_cybph_lswtcx_cxlb_info[];
    }

    /*
            ID:rzrq_cybph_drcjcx
            Desc:融资融券/创业板盘后/当日成交查询
            Version: 1.0
            Date:20190507
        */
    interface rzrq_cybph_drcjcx_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

      gddm?: string; //股东代码,不送查全部,VARCHAR

      zqdm?: string; //证券代码,不送查全部,VARCHAR

      htxh?: string; //合同序号,不送查全部,INTEGER

      cxfx?: string; //查询方向,1向下/0向上查询方向，盘后查询记录正序返回,VARCHAR

      qqhs?: string; //请求行数,每次取的行数,INTEGER

      dwc?: string; //定位串,第一次填空,VARCHAR

    }
    interface rzrq_cybph_drcjcx_cxlb_info {
      dwc?: string; //定位串,,VARCHAR

      htxh?: string; //合同序号,,INTEGER

      cjbh?: string; //成交编号,,INTEGER

      wtxh?: string; //委托序号,,INTEGER

      khdm?: string; //客户代码,,INTEGER

      zjzh?: string; //资金账户,,VARCHAR

      gddm?: string; //股东代码,,VARCHAR

      jysdm?: string; //交易所代码,,DICT

      zqdm?: string; //证券代码,,VARCHAR

      zqmc?: string; //证券名称,,VARCHAR

      wtjg?: string; //委托价格,,DECIMAL

      wtsl?: string; //委托数量,,INTEGER

      cjjg?: string; //成交价格,,DECIMAL

      cjsl?: string; //成交数量,,INTEGER

      cjje?: string; //成交金额,,DECIMAL

      mmlb?: string; //买卖类别,,DICT

      mmlbsm?: string; //买卖类别说明,,VARCHAR

      cjzt?: string; //成交状态,,VARCHAR

      cjztsm?: string; //成交状态说明,,VARCHAR

      cjrq?: string; //成交日期,,DATE8

      wtrq?: string; //委托日期,,DATE8

      cjsj?: string; //成交时间,,VARCHAR

      wtsj?: string; //委托时间,,VARCHAR

    }
    interface rzrq_cybph_drcjcx_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      cxlb?: rzrq_cybph_drcjcx_cxlb_info[];
    }

    /*
            ID:rzrq_cybph_kcdwtcx
            Desc:融资融券/创业板盘后/可撤单委托查询
            Version: 1.0
            Date:20190507
        */
    interface rzrq_cybph_kcdwtcx_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

      gddm?: string; //股东代码,,VARCHAR

      zqdm?: string; //证券代码,,VARCHAR

      wtxh?: string; //委托序号,,INTEGER

      qqhs?: string; //请求行数,,INTEGER

      dwc?: string; //定位串,第一次填空,VARCHAR

    }
    interface rzrq_cybph_kcdwtcx_cxlb_info {
      dwc?: string; //定位串,,VARCHAR

      wtrq?: string; //委托日期,,DATE8

      wtxh?: string; //委托序号,,INTEGER

      htxh?: string; //合同序号,,INTEGER

      khdm?: string; //客户代码,,INTEGER

      zjzh?: string; //资金账户,,VARCHAR

      gddm?: string; //股东代码,,VARCHAR

      wtsj?: string; //委托时间,,VARCHAR

      jysdm?: string; //交易所代码,,DICT

      zqdm?: string; //证券代码,,VARCHAR

      zqmc?: string; //证券名称,,VARCHAR

      wtjg?: string; //委托价格,,DECIMAL

      wtsl?: string; //委托数量,,INTEGER

      cjjg?: string; //成交价格,,DECIMAL

      cjsl?: string; //成交数量,,INTEGER

      cjje?: string; //成交金额,,DECIMAL

      mmlb?: string; //买卖类别,,DICT

      mmlbsm?: string; //买卖类别说明,,VARCHAR

      wtzt?: string; //委托状态,,DICT

      wtztsm?: string; //委托状态说明,,VARCHAR

      wtlb?: string; //委托类别,,DICT

      wtlbsm?: string; //委托类别说明,,VARCHAR

      bjfssm?: string; //报价方式说明,,DICT

      cdsl?: string; //撤单数量,,INTEGER

      djzj?: string; //冻结资金,,DECIMAL

      bjfs?: string; //报价方式,,DICT

    }
    interface rzrq_cybph_kcdwtcx_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      cxlb?: rzrq_cybph_kcdwtcx_cxlb_info[];
    }

    /*
            ID:rzrq_cybph_lscjcx
            Desc:融资融券/创业板盘后/历史成交查询
            Version: 1.0
            Date:20190507
        */
    interface rzrq_cybph_lscjcx_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

      gddm?: string; //股东代码,不送查全部,VARCHAR

      zqdm?: string; //证券代码,不送查全部,VARCHAR

      cxfx?: string; //查询方向,1向下/0向上查询方,VARCHAR

      qqhs?: string; //请求行数,每次取的行数,INTEGER

      dwc?: string; //定位串,第一次填空,VARCHAR

      qsrq?: string; //起始日期,,DATE8

      zzrq?: string; //终止日期,,DATE8

    }
    interface rzrq_cybph_lscjcx_cxlb_info {
      dwc?: string; //定位串,,VARCHAR

      wtrq?: string; //委托日期,,DATE8

      wtxh?: string; //委托序号,,INTEGER

      htxh?: string; //合同序号,,INTEGER

      khdm?: string; //客户代码,,INTEGER

      zjzh?: string; //资金账户,,VARCHAR

      gddm?: string; //股东代码,,VARCHAR

      wtsj?: string; //委托时间,,VARCHAR

      jysdm?: string; //交易所代码,,DICT

      zqdm?: string; //证券代码,,VARCHAR

      zqmc?: string; //证券名称,,VARCHAR

      wtjg?: string; //委托价格,,DECIMAL

      wtsl?: string; //委托数量,,INTEGER

      cjjg?: string; //成交价格,,DECIMAL

      cjsl?: string; //成交数量,,INTEGER

      cjje?: string; //成交金额,,DECIMAL

      mmlb?: string; //买卖类别,,DICT

      mmlbsm?: string; //买卖类别说明,,VARCHAR

      cjzt?: string; //成交状态,,VARCHAR

      cjztsm?: string; //成交状态说明,,VARCHAR

      cjrq?: string; //成交日期,,DATE8

      cjsj?: string; //成交时间,,VARCHAR

      cjbh?: string; //成交编号,,VARCHAR

      wtztsm?: string; //委托状态说明,,VARCHAR

      wtzt?: string; //委托状态,,DICT

    }
    interface rzrq_cybph_lscjcx_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      cxlb?: rzrq_cybph_lscjcx_cxlb_info[];
    }

    /*
            ID:rzrq_cybph_ptjyxd
            Desc:融资融券/创业板盘后/普通交易委托下单
            Version: 1.0
            Date:20190520
        */
    interface rzrq_cybph_ptjyxd_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

      jysdm?: string; //交易市场,,DICT

      gddm?: string; //股东代码,,CHAR

      mmlb?: string; //买卖类别,,DICT

      zqdm?: string; //证券代码,,VARCHAR

      wtsl?: string; //数量,,INTEGER

      wtjg?: string; //价格,,DECIMAL

      wtlx?: string; //委托类型,,DICT

    }
    interface rzrq_cybph_ptjyxd_htxx_info {
      wtxh?: string; //委托序号,,INTEGER

      htxh?: string; //合同序号,,VARCHAR

    }
    interface rzrq_cybph_ptjyxd_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      htxx?: rzrq_cybph_ptjyxd_htxx_info[];
    }

    /*
            ID:rzrq_cybph_ptjykmmslcx
            Desc:融资融券/创业板盘后/担保品买入可买卖数量查询
            Version: 1.0
            Date:20150502
        */
    interface rzrq_cybph_ptjykmmslcx_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

      jysdm?: string; //交易市场,,DICT

      gddm?: string; //股东代码,,VARCHAR

      zqdm?: string; //证券代码,,VARCHAR

      wtjg?: string; //委托价格,,DECIMAL

      mmlb?: string; //买卖类别,,DICT

    }
    interface rzrq_cybph_ptjykmmslcx_kmmxx_info {
      jysdm?: string; //证券交易所代码,,DICT

      gddm?: string; //股东代码,,VARCHAR

      splx?: string; //商品类型,,VARCHAR

      zqdm?: string; //证券代码,,VARCHAR

      zqmc?: string; //证券名称,,VARCHAR

      zrspj?: string; //昨日收盘价,,DECIMAL

      jrkpj?: string; //今日开盘价,,DECIMAL

      zgcjj?: string; //最高成交价,,DECIMAL

      zdcjj?: string; //最低成交价,,DECIMAL

      zjcjj?: string; //最近成交价,,DECIMAL

      b1jg?: string; //买1价格,,DECIMAL

      b1sl?: string; //买1数量,,DECIMAL

      b2jg?: string; //买2价格,,DECIMAL

      b2sl?: string; //买2数量,,DECIMAL

      b3jg?: string; //买3价格,,DECIMAL

      b3sl?: string; //买3数量,,DECIMAL

      b4jg?: string; //买4价格,,DECIMAL

      b4sl?: string; //买4数量,,DECIMAL

      b5jg?: string; //买5价格,,DECIMAL

      b5sl?: string; //买5数量,,DECIMAL

      s1jg?: string; //卖1价格,,DECIMAL

      s1sl?: string; //卖1数量,,DECIMAL

      s2jg?: string; //卖2价格,,DECIMAL

      s2sl?: string; //卖2数量,,DECIMAL

      s3jg?: string; //卖3价格,,DECIMAL

      s3sl?: string; //卖3数量,,DECIMAL

      s4jg?: string; //卖4价格,,DECIMAL

      s4sl?: string; //卖4数量,,DECIMAL

      s5jg?: string; //卖5价格,,DECIMAL

      s5sl?: string; //卖5数量,,DECIMAL

      kmsl?: string; //可买卖数量,,INTEGER

      wtdw?: string; //委托单位,,VARCHAR

      ztjg?: string; //涨停价格,,DECIMAL

      dtjg?: string; //跌停价格,,DECIMAL

      sfjjts?: string; //是否即将退市,,CHAR

      sffxjs?: string; //是否风险警示,1是,0否,CHAR

      fxjstx?: string; //风险警示提醒,,VARCHAR

      zjkys?: string; //资金可用数,,INTEGER

      gfkys?: string; //股份可用数,,INTEGER

      fxts?: string; //风险提示,,VARCHAR

      hqscdm?: string; //行情市场代码,,INTEGER

      tpbz?: string; //停牌标志,,VARCHAR

      wtjg?: string; //委托价格,,DECIMAL

      zqlb?: string; //证券类别,,DICT

      zqlbsm?: string; //证券类别说明,,VARCHAR

      cybzcz?: string; //创业板注册制,,DICT

      jjzdbz?: string; //基金涨跌标志,,DICT

      enum_stock_type?: string; //行情返回证券类别,,VARCHAR

      stock_market?: string; //行情返回证券市场,,VARCHAR

    }
    interface rzrq_cybph_ptjykmmslcx_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      kmmxx?: rzrq_cybph_ptjykmmslcx_kmmxx_info[];
    }

    /*
            ID:rzrq_cybph_ptjyzdjyslcx
            Desc:融资融券/创业板盘后/最大交易数量查询
            Version: 1.0
            Date:20190507
        */
    interface rzrq_cybph_ptjyzdjyslcx_req {
      sessionid?: string; //移动app注册会话ID,,VARCHAR

      khbzlx?: string; //客户标志类型,,DICT

      khbz?: string; //客户标志,,VARCHAR

      jymm?: string; //交易密码,,PASSWORD

      token?: string; //账户会话ID,,VARCHAR

      yybdm?: string; //营业部代码,,VARCHAR

      lhxx?: string; //留痕信息,,VARCHAR

      jysdm?: string; //交易市场,,DICT

      gddm?: string; //股东代码,,VARCHAR

      zqdm?: string; //证券代码,,VARCHAR

      wtjg?: string; //委托价格,,DECIMAL

      mmlb?: string; //买卖类别,,DICT

      wtlx?: string; //委托类型,,DICT

      zjzh?: string; //资金账号,,VARCHAR

      khdm?: string; //客户代码,,VARCHAR

      lhxxn?: string; //新格式留痕信息,,VARCHAR

      lhxxnVer?: string; //新格式留痕信息版本,,VARCHAR

    }
    interface rzrq_cybph_ptjyzdjyslcx_kmmxx_info {
      jysdm?: string; //证券交易所代码,,DICT

      zqdm?: string; //证券代码,,VARCHAR

      zqmcc?: string; //证券中文全称,,VARCHAR

      zqmc?: string; //证券名称,,VARCHAR

      gddm?: string; //股东代码,,VARCHAR

      kmsl?: string; //可买卖数量,,INTEGER

      wtdw?: string; //委托单位,,VARCHAR

      sfjjts?: string; //是否即将退市,1退市整理期,0非退市整理期,CHAR

      sffxjs?: string; //是否风险警示,1风险警示股票,0非风险警示股票,CHAR

      zjkys?: string; //资金可用数,,INTEGER

      gfkys?: string; //股份可用数,,INTEGER

      tsgptx?: string; //退市股票提醒,,VARCHAR

      zqlb?: string; //证券类别,,DICT

      zqlbsm?: string; //证券类别说明,,VARCHAR

      cybzcz?: string; //创业板注册制,,DICT

      tsrq?: string; //退市日期,,DATE8

      splx?: string; //商品类型,,VARCHAR

      cw?: string; //仓位,,INTEGER

    }
    interface rzrq_cybph_ptjyzdjyslcx_rsp {
      ret_code?: string; //处理结果

      ret_msg?: string; //处理结果

      kmmxx?: rzrq_cybph_ptjyzdjyslcx_kmmxx_info[];
    }
  }
}
export {};