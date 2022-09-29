const Taf = require('@taf/taf-rpc').client;
Taf.setProperty('timeout', 10000);
const FuPan = require('./ZTQueryProxy').FuPan;
const logger = require('../../lib/logger');
let servant = 'FuPan.ZTQuerySvr.ZTQueryObj';
if (!process.env.TAF_CONFIG) {
    // servant += '@tcp -h 172.16.8.150 -t 60000 -p 10013';
    servant += '@tcp -h 118.178.30.136 -t 60000 -p 8888';
}
const prx = Taf.stringToProxy(FuPan.ZTQueryProxy, servant);
const hq = require('@up/hq');

function handleError(err) {
    logger.error.error(err);
    let msg = err;
    if (err && err.response && err.response.error) {
        msg = err.response.error;
    }
    return Promise.reject(new Error(`Error: ${JSON.stringify(msg)}`));
}

const getHisFactorData = ({
    nStartDate,
    nEndDate,
    nDayNum = 1,
    eHisFactorType = 20
}) => {
    var req = new FuPan.FHisFactorReq();
    var obj = {
        eHisFactorType: eHisFactorType, // E_HIS_FACTOR_DATA_ANALYSE = 20 E_HIS_FACTOR_HOT_SUBJECT = 3
        nStartDate: nStartDate || 0,
        nEndDate: nEndDate || 0,
        nDayNum: nDayNum
    };

    req.readFromObject(obj);

    return prx
        .getHisFactorData(req)
        .then(function(rsp) {
            return rsp.response.arguments.stRsp.toObject();
        })
        .catch(handleError);
};

const getHisFactorDataSingle = ({
    nStartDate,
    nEndDate,
    nDayNum = 1,
    eHisFactorType = 20
}) => {
    var req = new FuPan.FHisFactorReq();
    var obj = {
        eHisFactorType: eHisFactorType, // E_HIS_FACTOR_DATA_ANALYSE = 20 E_HIS_FACTOR_HOT_SUBJECT = 3
        nStartDate: nStartDate || 0,
        nEndDate: nEndDate || 0,
        nDayNum: nDayNum
    };

    if (nStartDate || nEndDate) {
        obj.nDayNum = 0;
    }

    req.readFromObject(obj);

    return prx
        .getHisFactorData(req)
        .then(function(rsp) {
            return rsp.response.arguments.stRsp.toObject();
        })
        .catch(handleError);
};

const stockPool = async ({ iDate }) => {
    try {
        var req = new FuPan.FStockPoolReq();
        req.readFromObject({
            eStockType: 0, // E_STOCK_ZT_POOL
            bGetDetail: true,
            iDate: iDate
        });

        var rsp = await prx.stockPool(req);
        var stRsp = rsp.response.arguments.stRsp.toObject();
        var hqargs = stRsp.vecStock.map(o => {
            return {
                market: o.iMarket,
                stockCode: o.sCode
            };
        });

        var dict = await hq.getStockName(hqargs);
        var hash = {};

        dict.vStock.forEach(s => {
            hash[s.stockCode] = s.stockName;
        });

        stRsp.vecStock.forEach(stk => {
            stk.sName = hash[stk.sCode];
        });

        return stRsp;
    } catch (err) {
        return handleError(err);
    }
};

const getLeadBlkByDate = ({}) => {
    var req = new FuPan.FLeadBlkReq();
    req.readFromObject({});

    return prx
        .getLeadBlkByDate(req)
        .then(function(rsp) {
            return rsp.response.arguments.stRsp.toObject();
        })
        .catch(handleError);
};

const batchSubDragonHeadStock = ({ vecSubject = [] }) => {
    var req = new FuPan.FBatchSubDragonHeadStockReq();

    req.readFromObject({
        vecSubject: vecSubject.map(o => {
            return {
                blk: o
            };
        })
    });

    return prx
        .batchSubDragonHeadStock(req)
        .then(function(rsp) {
            return rsp.response.arguments.stRsp.toObject();
        })
        .catch(handleError);
};

const marketTrend = vecType => {
    const reqObj = new FuPan.FMarketTrendReq();
    reqObj.readFromObject({
        stHeader: {},
        vecType
    });

    console.log(reqObj.toObject());

    return new Promise((resolve, reject) => {
        prx.marketTrend(reqObj)
            .then(rsp => {
                const rspObj = rsp.response.arguments.stRsp.toObject();
                if (rspObj) {
                    const rspdata = rspObj;
                    resolve(rspdata);
                } else {
                    reject(
                        new Error(
                            `marketTrend Error: ${JSON.stringify(rspObj)}`
                        )
                    );
                }
            })
            .catch(handleError);
    });
};

async function getTagTypeData({
    vecTagType,
    eDataType = 1, // 0 盘面亮点 1 涨停分析
    nStartDate = 0,
    nEndDate = 0
}) {
    const req = new FuPan.FZTTagReq();
    req.readFromObject({
        vecTagType,
        eDataType,
        nStartDate,
        nEndDate
    });

    const rsp = await prx.getTagTypeData(req);
    const rspObj = rsp.response.arguments.stRsp.toObject();

    return rspObj;
}

async function getAllTagType({ eTagType }) {
    const req = new FuPan.FZTAllTagTypeReq();
    req.readFromObject({
        eTagType
    });

    const rsp = await prx.getAllTagType(req);
    const rspObj = rsp.response.arguments.stRsp.toObject();

    return rspObj;
}

// getHisFactorData({
//   nEndDate: 0,
//   nDayNum: 30,
//   eHisFactorType: 18
// }).then(console.log);

// getTagTypeData({ vecTagType: [] }).catch(err => {
//   console.log(err);
// });

// getAllTagType({ eTagType: 3 }).catch(err => {
//   console.log(err);
// });

module.exports = {
    marketTrend,
    getHisFactorData,
    getHisFactorDataSingle,
    stockPool,
    getLeadBlkByDate,
    batchSubDragonHeadStock,
    getTagTypeData,
    getAllTagType
};
