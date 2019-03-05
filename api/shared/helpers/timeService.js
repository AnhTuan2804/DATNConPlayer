const moment = require('moment');

/**
 * Function get time unix of current day
 */
const getTimeUnixBeginOfCurrentDate = () => {
    const dateString = moment().utc().format('YYYY-MM-DD');
    const beginDay = moment.utc(`${dateString}T00:00:00`)
    return moment(beginDay).unix();
}

/**
 * Function get time unix begin date of any timw unix
 * @param {timestamp} date
 */
const getTimeUnixBeginOfDate = (date) => {
    const dateString = moment(date * 1000).utc().format('YYYY-MM-DD');
    const beginDay = moment.utc(`${dateString}T00:00:00`)
    return moment(beginDay).unix();
}
module.exports = {
    getTimeUnixBeginOfCurrentDate,
    getTimeUnixBeginOfDate
}
