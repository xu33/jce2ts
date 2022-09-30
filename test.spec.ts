declare global {
  namespace ABC {
    interface HCWVerData {
      shtSetCode?: short;
      stringCode?: string;
      lCWVersion?: long;
      lQXVersion?: long;
      lLTGChgVersion?: long;
    }
    enum E_STOCK_TYPE {
      E_STOCK_TYPE_A,
      E_STOCK_TYPE_B,
    }
  }
}
export {};