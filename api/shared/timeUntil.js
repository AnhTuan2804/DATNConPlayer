'use strict';
const moment = require('moment');
const _ = require('lodash');
class TimeUntil {
    timeLocked(time) {
        return ((moment().utc() - time)) / (1000 * 60);
    }

    compareTwoDatesToGetDay(date1, date2) {
        if (date1 && date2) {
            let date1Unix = moment.unix(date1);
            date1Unix.hour(0)
            date1Unix.minute(0)
            date1Unix.second(0);

            let date2Unix = moment.unix(date2);
            date2Unix.hour(0)
            date2Unix.minute(0)
            date2Unix.second(0);
            return (date1Unix.unix() - date2Unix.unix()) / 86400;
        }
        return 0;
    }

    getTimesUnixFromTimeFormat(val) {
        if (val === null || val === '' || _.isUndefined(val)) {
            return null
        } else {
            return moment(val, 'YYYY/MM/DD').unix();
        }
    }

    getDateWithoutTime(date) {
        date = date || new Date();
        const year = date.getFullYear();
        //january is 0!
        const mm = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return year + '-' + mm + '-' + dd;
    }
}
module.exports = new TimeUntil();