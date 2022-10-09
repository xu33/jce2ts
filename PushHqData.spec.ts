declare global {
  namespace IC {
    interface SShortLineStrategyNew {
      m_uMsgType?: string;
      m_nTime?: string;
      m_nSerialId?: string;
      m_dwStockID?: string;
      m_strMsg?: string;
      shtMarket?: string;
      sCode?: string;
    }
    interface SPushShortLineData {
      mData?: Record<string, Array<SShortLineStrategyNew>>;
    }
    enum BLOCKCHANGE_TYPE {
      E_TYPE_BKALL,
      E_TYPE_BKUP,
      E_TYPE_BKDOWN,
      E_TYPE_BKRAPIDLYUP,
      E_TYPE_BKQUICKLYBACKUP,
      E_TYPE_BKQUICKLYDOWN,
    }
    interface SStocksInfo {
      iMarket?: string;
      sCode?: string;
      sName?: string;
      fRise?: string;
    }
    interface SBlockChange {
      shtMarket?: string;
      sCode?: string;
      iTime?: string;
      eType?: BLOCKCHANGE_TYPE;
      fRiseSpeed?: string;
      fRise?: string;
      fPre5MinRise?: string;
      fPre30MinRise?: string;
      fRiseSpeed30?: string;
      sName?: string;
      vLeadStocks?: Array<SStocksInfo>;
      iBlockType?: string;
      iDate?: string;
      lTimestamp?: string;
    }
    interface SPushBlockChangeData {
      vData?: Array<SBlockChange>;
    }
    interface SPushBlockChangeDataNew {
      mData?: Record<string, Array<SBlockChange>>;
    }
    interface SLeadBlkInfo {
      iMarket?: string;
      sCode?: string;
      sName?: string;
      iTime?: string;
      iBlockType?: string;
      iDate?: string;
      eType?: BLOCKCHANGE_TYPE;
    }
    interface SPushLeadBlkInfo {
      mData?: Record<string, Array<SLeadBlkInfo>>;
    }
    interface SQtRec {
      iMarket?: string;
      sCode?: string;
      sName?: string;
      iTime?: string;
      fPreClose?: string;
      fOpen?: string;
      fHigh?: string;
      fLow?: string;
      fPrice?: string;
      fPercent?: string;
    }
    interface SPushQtRec {
      mData?: Record<string, SQtRec>;
    }
  }
}
export {};