const db = require('../shared/db/db');
const matchHandle = require('../core/match.handler');
const _ = require('lodash');
const timeUtil = require('../shared/timeUntil.js');
const appConstant = require('../shared/appConstant');

async function trackingTimeExpiry() {
    setInterval(async function () {
        const listMatch = await matchHandle.getList();
        _.forEach(listMatch, (value, key) => {
            const toDay = timeUtil.getDateWithoutTime();
            if ((value.status == appConstant.STATUS_NEW || value.status == appConstant.STATUS_WAITTING) && value.date_of_match <= timeUtil.getTimesUnixFromTimeFormat(toDay)) {
                let expiryDate = false;
                if (value.date_of_match < timeUtil.getTimesUnixFromTimeFormat(toDay)) {
                    //match expiried
                    expiryDate = true;
                } else {
                    if (Number(value.time.time_end) <= (new Date()).getHours())
                        expiryDate = true;
                }
                if (expiryDate) {
                    const dataUpdate = {
                        id: key,
                        status: appConstant.STATUS_EXPIRIED
                    }
                    matchHandle.update(dataUpdate, value.date_of_match);
                }
            }
        })
    }, 30000)

}

module.exports = {
    trackingTimeExpiry: trackingTimeExpiry
}