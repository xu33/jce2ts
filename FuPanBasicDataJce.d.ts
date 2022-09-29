﻿// **********************************************************************
// This file was generated by a TAF parser!
// TAF version 8.0.9_20200904091838 by TAF Team.
// Generated from `/data/user/xuzhengwei/upload/FuPanBasicData.jce'
// **********************************************************************

/* tslint:disable */
/* eslint-disable */

import * as TafStream from "@taf/taf-stream";

export namespace FuPan {
    const enum E_STOCK_FILTER_TYPE {
        E_STOCK_ALL = 0,
        E_STOCK_FILTER_ST = 1,
        E_STOCK_FILTER_NEWSTOCK = 2,
        E_STOCK_FILTER_ST_NEWSTOCK = 3
    }
    function etos(enm:E_STOCK_FILTER_TYPE):string;
    function stoe(enm:string):E_STOCK_FILTER_TYPE;

    const enum E_STOCK_POOL_TYPE {
        E_STOCK_ZT_POOL = 1,
        E_STOCK_ONE_POOL = 2,
        E_STOCK_T_POOL = 3,
        E_STOCK_CHANGE_POOL = 4,
        E_STOCK_OPEN_POOL = 5,
        E_STOCK_STRONG_POOL = 6,
        E_STOCK_COMP_POOL = 7,
        E_STOCK_LASTZT_POOL = 8,
        E_STOCK_DT_POOL = 9,
        E_STOCK_DT_OPEN_POOL = 10,
        E_STOCK_FANBAO_ZT_POOL = 11,
        E_STOCK_HIT_BOARD_POOL = 12,
        E_STOCK_BARGAIN_HUNTING_POOL = 13,
        E_STOCK_POOL_TYPE_END = 14
    }
    function etos(enm:E_STOCK_POOL_TYPE):string;
    function stoe(enm:string):E_STOCK_POOL_TYPE;

    const enum E_STOCK_ZT_TYPE {
        E_STOCK_ZT_UNKNOWN = 0,
        E_STOCK_COMP_ZT = 1,
        E_STOCK_ONE_BOARD = 2,
        E_STOCK_T_BOARD = 3,
        E_STOCK_CHANGE_BOARD = 4,
        E_STOCK_OPEN_BOARD = 5
    }
    function etos(enm:E_STOCK_ZT_TYPE):string;
    function stoe(enm:string):E_STOCK_ZT_TYPE;

    const enum E_BLOCK_CLASS_TYPE {
        E_BLOCK_INDUSTRY = 0,
        E_BLOCK_AREA = 1,
        E_BLOCK_CONCEPT = 2,
        E_BLOCK_OTHER = 3
    }
    function etos(enm:E_BLOCK_CLASS_TYPE):string;
    function stoe(enm:string):E_BLOCK_CLASS_TYPE;


    class StockInfo {
        shtSetcode: number;
        sCode: string;

        toObject(): StockInfo.Object;
        readFromObject(json: StockInfo.Object): StockInfo;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): StockInfo;
        static create(is: TafStream.JceInputStream): StockInfo;
    }

    namespace StockInfo {
        interface Object {
            shtSetcode?: number;
            sCode?: string;
        }
    }

    class StkSimpInfo {
        iMarket: number;
        sCode: string;
        sName: string;

        toObject(): StkSimpInfo.Object;
        readFromObject(json: StkSimpInfo.Object): StkSimpInfo;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): StkSimpInfo;
        static create(is: TafStream.JceInputStream): StkSimpInfo;
    }

    namespace StkSimpInfo {
        interface Object {
            iMarket?: number;
            sCode?: string;
            sName?: string;
        }
    }

    class FBlockSimpleInfo {
        iMarket: number;
        sCode: string;
        eType: FuPan.E_BLOCK_CLASS_TYPE;
        sName: string;

        toObject(): FBlockSimpleInfo.Object;
        readFromObject(json: FBlockSimpleInfo.Object): FBlockSimpleInfo;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): FBlockSimpleInfo;
        static create(is: TafStream.JceInputStream): FBlockSimpleInfo;
    }

    namespace FBlockSimpleInfo {
        interface Object {
            iMarket?: number;
            sCode?: string;
            eType?: FuPan.E_BLOCK_CLASS_TYPE;
            sName?: string;
        }
    }

    class FOpenBoardDetail {
        iZDTTime: number;
        iZDTOpenTime: number;
        dLowRatio: number;
        lFirstZDTVol: number;
        dFirstZDTRatio: number;
        lLastZDTVol: number;
        dLastZDTRatio: number;
        lHighZDTVol: number;
        dHighZDTRatio: number;

        toObject(): FOpenBoardDetail.Object;
        readFromObject(json: FOpenBoardDetail.Object): FOpenBoardDetail;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): FOpenBoardDetail;
        static create(is: TafStream.JceInputStream): FOpenBoardDetail;
    }

    namespace FOpenBoardDetail {
        interface Object {
            iZDTTime?: number;
            iZDTOpenTime?: number;
            dLowRatio?: number;
            lFirstZDTVol?: number;
            dFirstZDTRatio?: number;
            lLastZDTVol?: number;
            dLastZDTRatio?: number;
            lHighZDTVol?: number;
            dHighZDTRatio?: number;
        }
    }

    class FBoardPeriod {
        iStrongWeakNum: number;
        iZDTNum: number;
        iOneNum: number;

        toObject(): FBoardPeriod.Object;
        readFromObject(json: FBoardPeriod.Object): FBoardPeriod;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): FBoardPeriod;
        static create(is: TafStream.JceInputStream): FBoardPeriod;
    }

    namespace FBoardPeriod {
        interface Object {
            iStrongWeakNum?: number;
            iZDTNum?: number;
            iOneNum?: number;
        }
    }

    class StockZDTHisDate {
        market: number;
        sCode: string;
        setZtDays: TafStream.List<number>;
        setOneZtDays: TafStream.List<number>;
        setDtDays: TafStream.List<number>;
        setOneDtDays: TafStream.List<number>;

        toObject(): StockZDTHisDate.Object;
        readFromObject(json: StockZDTHisDate.Object): StockZDTHisDate;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): StockZDTHisDate;
        static create(is: TafStream.JceInputStream): StockZDTHisDate;
    }

    namespace StockZDTHisDate {
        interface Object {
            market?: number;
            sCode?: string;
            setZtDays?: Array<number>;
            setOneZtDays?: Array<number>;
            setDtDays?: Array<number>;
            setOneDtDays?: Array<number>;
        }
    }

    class FZDStockInfo {
        iMarket: number;
        sCode: string;
        dNowPrice: number;
        dChgRatio: number;
        dTurnOver: number;
        dAvgTurnOver: number;
        iLastZDTime: number;
        iFirstZDTime: number;
        lLastZDTVol: number;
        dLastZDTRatio: number;
        dFloatValue: number;
        iContinueBoard: number;
        iDetailNum: number;
        vecDetail: TafStream.List<FuPan.FOpenBoardDetail>;
        stBoard: FuPan.FBoardPeriod;
        eType: FuPan.E_STOCK_ZT_TYPE;
        iDate: number;
        dPrevRatio: number;
        bIsZt: boolean;
        bUnOpenNewStock: boolean;
        bIsST: boolean;
        bSubNewStock: boolean;
        strStockZTReason: string;
        vecBlk: TafStream.List<FuPan.FBlockSimpleInfo>;
        dTotalMarketValue: number;
        bIsDt: boolean;
        nStockZTReasonUpdateTime: number;
        vRelatedPlates: TafStream.List<string>;
        dHighPrice: number;
        dLowPrice: number;

        toObject(): FZDStockInfo.Object;
        readFromObject(json: FZDStockInfo.Object): FZDStockInfo;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): FZDStockInfo;
        static create(is: TafStream.JceInputStream): FZDStockInfo;
    }

    namespace FZDStockInfo {
        interface Object {
            iMarket?: number;
            sCode?: string;
            dNowPrice?: number;
            dChgRatio?: number;
            dTurnOver?: number;
            dAvgTurnOver?: number;
            iLastZDTime?: number;
            iFirstZDTime?: number;
            lLastZDTVol?: number;
            dLastZDTRatio?: number;
            dFloatValue?: number;
            iContinueBoard?: number;
            iDetailNum?: number;
            vecDetail?: Array<FuPan.FOpenBoardDetail.Object>;
            stBoard?: FuPan.FBoardPeriod.Object;
            eType?: FuPan.E_STOCK_ZT_TYPE;
            iDate?: number;
            dPrevRatio?: number;
            bIsZt?: boolean;
            bUnOpenNewStock?: boolean;
            bIsST?: boolean;
            bSubNewStock?: boolean;
            strStockZTReason?: string;
            vecBlk?: Array<FuPan.FBlockSimpleInfo.Object>;
            dTotalMarketValue?: number;
            bIsDt?: boolean;
            nStockZTReasonUpdateTime?: number;
            vRelatedPlates?: Array<string>;
            dHighPrice?: number;
            dLowPrice?: number;
        }
    }

    class FPoolMapInfo {
        stockMap: TafStream.Map<string, FuPan.FZDStockInfo>;
        lRefreshTime: number;

        toObject(): FPoolMapInfo.Object;
        readFromObject(json: FPoolMapInfo.Object): FPoolMapInfo;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): FPoolMapInfo;
        static create(is: TafStream.JceInputStream): FPoolMapInfo;
    }

    namespace FPoolMapInfo {
        interface Object {
            stockMap?: Record<string, FuPan.FZDStockInfo.Object>;
            lRefreshTime?: number;
        }
    }

    class FStockZTData {
        dZTPrice: number;
        dDTPrice: number;
        dTurnover: number;
        dZdf: number;

        toObject(): FStockZTData.Object;
        readFromObject(json: FStockZTData.Object): FStockZTData;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): FStockZTData;
        static create(is: TafStream.JceInputStream): FStockZTData;
    }

    namespace FStockZTData {
        interface Object {
            dZTPrice?: number;
            dDTPrice?: number;
            dTurnover?: number;
            dZdf?: number;
        }
    }

    class FupanZTStockLabelInfo {
        iMarket: number;
        sCode: string;
        iContinueBoard: number;
        stBoard: FuPan.FBoardPeriod;
        iDate: number;
        bIsZt: boolean;
        bUnOpenNewStock: boolean;
        bIsDt: boolean;
        iFirstZDTime: number;
        eType: FuPan.E_STOCK_ZT_TYPE;

        toObject(): FupanZTStockLabelInfo.Object;
        readFromObject(json: FupanZTStockLabelInfo.Object): FupanZTStockLabelInfo;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): FupanZTStockLabelInfo;
        static create(is: TafStream.JceInputStream): FupanZTStockLabelInfo;
    }

    namespace FupanZTStockLabelInfo {
        interface Object {
            iMarket?: number;
            sCode?: string;
            iContinueBoard?: number;
            stBoard?: FuPan.FBoardPeriod.Object;
            iDate?: number;
            bIsZt?: boolean;
            bUnOpenNewStock?: boolean;
            bIsDt?: boolean;
            iFirstZDTime?: number;
            eType?: FuPan.E_STOCK_ZT_TYPE;
        }
    }

    class FZTLabelPoolMapInfo {
        stockMap: TafStream.Map<string, FuPan.FupanZTStockLabelInfo>;
        lRefreshTime: number;

        toObject(): FZTLabelPoolMapInfo.Object;
        readFromObject(json: FZTLabelPoolMapInfo.Object): FZTLabelPoolMapInfo;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): FZTLabelPoolMapInfo;
        static create(is: TafStream.JceInputStream): FZTLabelPoolMapInfo;
    }

    namespace FZTLabelPoolMapInfo {
        interface Object {
            stockMap?: Record<string, FuPan.FupanZTStockLabelInfo.Object>;
            lRefreshTime?: number;
        }
    }

    class FupanZTLabelHisData {
        iLastDate: number;
        mapZDtHisDate: TafStream.Map<string, FuPan.StockZDTHisDate>;
        vecPreZTStock: TafStream.List<FuPan.FupanZTStockLabelInfo>;
        mapHisStockInfo: TafStream.Map<string, TafStream.Map<number, FuPan.FStockZTData>>;

        toObject(): FupanZTLabelHisData.Object;
        readFromObject(json: FupanZTLabelHisData.Object): FupanZTLabelHisData;
        toBinBuffer(): TafStream.BinBuffer;
        static new(): FupanZTLabelHisData;
        static create(is: TafStream.JceInputStream): FupanZTLabelHisData;
    }

    namespace FupanZTLabelHisData {
        interface Object {
            iLastDate?: number;
            mapZDtHisDate?: Record<string, FuPan.StockZDTHisDate.Object>;
            vecPreZTStock?: Array<FuPan.FupanZTStockLabelInfo.Object>;
            mapHisStockInfo?: Record<string, Record<number, FuPan.FStockZTData.Object>>;
        }
    }

}


