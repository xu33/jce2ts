declare global {
  namespace AT {
    interface rzrq_cybph_wtcd_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
      jysdm?: string;
      gddm?: string;
      wtxh?: string;
    }
    interface rzrq_cybph_wtcd_htxx_info {
      wtxh?: string;
      htxh?: string;
      fhxx?: string;
    }
    interface rzrq_cybph_wtcd_rsp {
      ret_code?: string;
      ret_msg?: string;
      htxx?: Array<rzrq_cybph_wtcd_htxx_info>;
    }
    interface rzrq_cybph_plcd_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
      wtph?: string;
      gddm?: string;
      jysdm?: string;
      wtxh?: string;
    }
    interface rzrq_cybph_plcd_sblb_info {
      wtxh?: string;
      errcode?: string;
      errmsg?: string;
    }
    interface rzrq_cybph_plcd_rsp {
      ret_code?: string;
      ret_msg?: string;
      sblb?: Array<rzrq_cybph_plcd_sblb_info>;
    }
    interface rzrq_cybph_drwtcx_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
      gddm?: string;
      zqdm?: string;
      wtxh?: string;
      cxfx?: string;
      qqhs?: string;
      dwc?: string;
    }
    interface rzrq_cybph_drwtcx_cxlb_info {
      dwc?: string;
      wtrq?: string;
      wtxh?: string;
      htxh?: string;
      khdm?: string;
      zjzh?: string;
      gddm?: string;
      wtsj?: string;
      jysdm?: string;
      zqdm?: string;
      zqmc?: string;
      wtjg?: string;
      wtsl?: string;
      cjjg?: string;
      cjsl?: string;
      mmlb?: string;
      mmlbsm?: string;
      wtzt?: string;
      wtztsm?: string;
      wtje?: string;
      cjje?: string;
      wtlb?: string;
      wtlbsm?: string;
      fdyy?: string;
      cdbz?: string;
      cdbzsm?: string;
      wtlx?: string;
      wtlxsm?: string;
    }
    interface rzrq_cybph_drwtcx_rsp {
      ret_code?: string;
      ret_msg?: string;
      cxlb?: Array<rzrq_cybph_drwtcx_cxlb_info>;
    }
    interface rzrq_cybph_lswtcx_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
      gddm?: string;
      zqdm?: string;
      wtxh?: string;
      cxfx?: string;
      qqhs?: string;
      dwc?: string;
      qsrq?: string;
      zzrq?: string;
    }
    interface rzrq_cybph_lswtcx_cxlb_info {
      dwc?: string;
      wtrq?: string;
      wtxh?: string;
      htxh?: string;
      khdm?: string;
      zjzh?: string;
      gddm?: string;
      wtsj?: string;
      jysdm?: string;
      zqdm?: string;
      zqmc?: string;
      wtjg?: string;
      wtsl?: string;
      cjjg?: string;
      cjsl?: string;
      cjje?: string;
      mmlb?: string;
      mmlbsm?: string;
      wtzt?: string;
      wtztsm?: string;
      wtje?: string;
      wtlb?: string;
      wtlbsm?: string;
      cdbz?: string;
      cdbzsm?: string;
      fdyy?: string;
    }
    interface rzrq_cybph_lswtcx_rsp {
      ret_code?: string;
      ret_msg?: string;
      cxlb?: Array<rzrq_cybph_lswtcx_cxlb_info>;
    }
    interface rzrq_cybph_drcjcx_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
      gddm?: string;
      zqdm?: string;
      htxh?: string;
      cxfx?: string;
      qqhs?: string;
      dwc?: string;
    }
    interface rzrq_cybph_drcjcx_cxlb_info {
      dwc?: string;
      htxh?: string;
      cjbh?: string;
      wtxh?: string;
      khdm?: string;
      zjzh?: string;
      gddm?: string;
      jysdm?: string;
      zqdm?: string;
      zqmc?: string;
      wtjg?: string;
      wtsl?: string;
      cjjg?: string;
      cjsl?: string;
      cjje?: string;
      mmlb?: string;
      mmlbsm?: string;
      cjzt?: string;
      cjztsm?: string;
      cjrq?: string;
      wtrq?: string;
      cjsj?: string;
      wtsj?: string;
    }
    interface rzrq_cybph_drcjcx_rsp {
      ret_code?: string;
      ret_msg?: string;
      cxlb?: Array<rzrq_cybph_drcjcx_cxlb_info>;
    }
    interface rzrq_cybph_kcdwtcx_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
      gddm?: string;
      zqdm?: string;
      wtxh?: string;
      qqhs?: string;
      dwc?: string;
    }
    interface rzrq_cybph_kcdwtcx_cxlb_info {
      dwc?: string;
      wtrq?: string;
      wtxh?: string;
      htxh?: string;
      khdm?: string;
      zjzh?: string;
      gddm?: string;
      wtsj?: string;
      jysdm?: string;
      zqdm?: string;
      zqmc?: string;
      wtjg?: string;
      wtsl?: string;
      cjjg?: string;
      cjsl?: string;
      cjje?: string;
      mmlb?: string;
      mmlbsm?: string;
      wtzt?: string;
      wtztsm?: string;
      wtlb?: string;
      wtlbsm?: string;
      bjfssm?: string;
      cdsl?: string;
      djzj?: string;
      bjfs?: string;
    }
    interface rzrq_cybph_kcdwtcx_rsp {
      ret_code?: string;
      ret_msg?: string;
      cxlb?: Array<rzrq_cybph_kcdwtcx_cxlb_info>;
    }
    interface rzrq_cybph_lscjcx_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
      gddm?: string;
      zqdm?: string;
      cxfx?: string;
      qqhs?: string;
      dwc?: string;
      qsrq?: string;
      zzrq?: string;
    }
    interface rzrq_cybph_lscjcx_cxlb_info {
      dwc?: string;
      wtrq?: string;
      wtxh?: string;
      htxh?: string;
      khdm?: string;
      zjzh?: string;
      gddm?: string;
      wtsj?: string;
      jysdm?: string;
      zqdm?: string;
      zqmc?: string;
      wtjg?: string;
      wtsl?: string;
      cjjg?: string;
      cjsl?: string;
      cjje?: string;
      mmlb?: string;
      mmlbsm?: string;
      cjzt?: string;
      cjztsm?: string;
      cjrq?: string;
      cjsj?: string;
      cjbh?: string;
      wtztsm?: string;
      wtzt?: string;
    }
    interface rzrq_cybph_lscjcx_rsp {
      ret_code?: string;
      ret_msg?: string;
      cxlb?: Array<rzrq_cybph_lscjcx_cxlb_info>;
    }
    interface rzrq_cybph_ptjyxd_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
      jysdm?: string;
      gddm?: string;
      mmlb?: string;
      zqdm?: string;
      wtsl?: string;
      wtjg?: string;
      wtlx?: string;
    }
    interface rzrq_cybph_ptjyxd_htxx_info {
      wtxh?: string;
      htxh?: string;
    }
    interface rzrq_cybph_ptjyxd_rsp {
      ret_code?: string;
      ret_msg?: string;
      htxx?: Array<rzrq_cybph_ptjyxd_htxx_info>;
    }
    interface rzrq_cybph_ptjykmmslcx_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
      jysdm?: string;
      gddm?: string;
      zqdm?: string;
      wtjg?: string;
      mmlb?: string;
    }
    interface rzrq_cybph_ptjykmmslcx_kmmxx_info {
      jysdm?: string;
      gddm?: string;
      splx?: string;
      zqdm?: string;
      zqmc?: string;
      zrspj?: string;
      jrkpj?: string;
      zgcjj?: string;
      zdcjj?: string;
      zjcjj?: string;
      b1jg?: string;
      b1sl?: string;
      b2jg?: string;
      b2sl?: string;
      b3jg?: string;
      b3sl?: string;
      b4jg?: string;
      b4sl?: string;
      b5jg?: string;
      b5sl?: string;
      s1jg?: string;
      s1sl?: string;
      s2jg?: string;
      s2sl?: string;
      s3jg?: string;
      s3sl?: string;
      s4jg?: string;
      s4sl?: string;
      s5jg?: string;
      s5sl?: string;
      kmsl?: string;
      wtdw?: string;
      ztjg?: string;
      dtjg?: string;
      sfjjts?: string;
      sffxjs?: string;
      fxjstx?: string;
      zjkys?: string;
      gfkys?: string;
      fxts?: string;
      hqscdm?: string;
      tpbz?: string;
      wtjg?: string;
      zqlb?: string;
      zqlbsm?: string;
      cybzcz?: string;
      jjzdbz?: string;
      enum_stock_type?: string;
      stock_market?: string;
    }
    interface rzrq_cybph_ptjykmmslcx_rsp {
      ret_code?: string;
      ret_msg?: string;
      kmmxx?: Array<rzrq_cybph_ptjykmmslcx_kmmxx_info>;
    }
    interface rzrq_cybph_ptjyzdjyslcx_req {
      sessionid?: string;
      khbzlx?: string;
      khbz?: string;
      jymm?: string;
      token?: string;
      yybdm?: string;
      lhxx?: string;
      jysdm?: string;
      gddm?: string;
      zqdm?: string;
      wtjg?: string;
      mmlb?: string;
      wtlx?: string;
      zjzh?: string;
      khdm?: string;
      lhxxn?: string;
      lhxxnVer?: string;
    }
    interface rzrq_cybph_ptjyzdjyslcx_kmmxx_info {
      jysdm?: string;
      zqdm?: string;
      zqmcc?: string;
      zqmc?: string;
      gddm?: string;
      kmsl?: string;
      wtdw?: string;
      sfjjts?: string;
      sffxjs?: string;
      zjkys?: string;
      gfkys?: string;
      tsgptx?: string;
      zqlb?: string;
      zqlbsm?: string;
      cybzcz?: string;
      tsrq?: string;
      splx?: string;
      cw?: string;
    }
    interface rzrq_cybph_ptjyzdjyslcx_rsp {
      ret_code?: string;
      ret_msg?: string;
      kmmxx?: Array<rzrq_cybph_ptjyzdjyslcx_kmmxx_info>;
    }
  }
}
export {};