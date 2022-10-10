declare global {
  namespace ABC {
    interface HStockCompetitionReq {
      shtSetCode?: string;
      stringCode?: string;
      lCWVersion?: string;
      lQXVersion?: string;
      lLTGChgVersion?: string;
    }
    interface SimulationTransaction {
      getStockCompetition: () => void;
    }
  }
}
export {};