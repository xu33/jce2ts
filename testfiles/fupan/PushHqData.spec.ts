declare global {
  namespace IC {
    interface SShortLineStrategyNew {
      m_uMsgType?: number;
      m_nTime?: number;
      m_nSerialId?: number;
      m_dwStockID?: number;
      m_strMsg?: string;
      shtMarket?: string;
      sCode?: string;
    }
    interface SPushShortLineData {
      mData?: Record<number, Array<SShortLineStrategyNew>>;
    }
    enum BLOCKCHANGE_TYPE {
      E_TYPE_BKALL = 0,
      E_TYPE_BKUP = 1,
      E_TYPE_BKDOWN = 2,
      E_TYPE_BKRAPIDLYUP = 3,
      E_TYPE_BKQUICKLYBACKUP = 4,
      E_TYPE_BKQUICKLYDOWN = 5,
    }
    interface SStocksInfo {
      iMarket?: number;
      sCode?: string;
      sName?: string;
      fRise?: string;
    }
    interface SBlockChange {
      shtMarket?: string;
      sCode?: string;
      iTime?: number;
      eType?: BLOCKCHANGE_TYPE;
      fRiseSpeed?: string;
      fRise?: string;
      fPre5MinRise?: string;
      fPre30MinRise?: string;
      fRiseSpeed30?: string;
      sName?: string;
      vLeadStocks?: Array<SStocksInfo>;
      iBlockType?: number;
      iDate?: number;
      lTimestamp?: string;
    }
    interface SPushBlockChangeData {
      vData?: Array<SBlockChange>;
    }
    interface SPushBlockChangeDataNew {
      mData?: Record<number, Array<SBlockChange>>;
    }
    interface SLeadBlkInfo {
      iMarket?: number;
      sCode?: string;
      sName?: string;
      iTime?: number;
      iBlockType?: number;
      iDate?: number;
      eType?: BLOCKCHANGE_TYPE;
    }
    interface SPushLeadBlkInfo {
      mData?: Record<number, Array<SLeadBlkInfo>>;
    }
    interface SQtRec {
      iMarket?: number;
      sCode?: string;
      sName?: string;
      iTime?: number;
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