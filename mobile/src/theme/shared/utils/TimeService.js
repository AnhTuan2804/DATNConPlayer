import  moment from 'moment';
import  _ from 'lodash';

export default class TimeService {

    static DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
    static DATE_TIME_IMPORT_FORMAT = 'D/M/YYYY H:m';
    static DATE_TIME_SS_FORMAT = 'YYYY/MM/DD HH:mm:ss'
    static DATE_FORMAT = 'YYYY/MM/DD';
    static DATE_IMPORT_FORMAT = 'DD/MM/YYYY';
    static DATE_IMPORT = 'YYYY/MM/DD';
    static YEAR_MONTH_DATE_FORMAT = 'YYYY-MM-DD';
    static DATE_TIME_SS_FORMAT_CONCAT = 'YYYYMMDDHHmmss'
    static MIN_TIME = '1/1/1700';
    static MAX_TIME = '1/1/50000';

    static getTimeUtcFromTime(time, format) {
        return moment(time, format).utc();
    }

    static getTimeFromTimeFormat(time, fomart) {
        return moment(time, fomart);
    }

    static getTimeFormatFromTime(date, format) {
        return date ? moment(date).format(format) : ''
    }

    static getTimeStampFromDate(date) {
        return moment(date).unix();
    }
    
    static getTimeStampFromDateFormat(date) {
        return this.getTimeFromTimeFormat(date, this.DATE_TIME_FORMAT).unix();
    }

    static compareTwoDate(date1, date2) {
        return this.getTimeStampFromDateFormat(date1) - this.getTimeStampFromDateFormat(date2);
    }

    static getTimeUctCurrent() {
        return moment.utc();
    }

    static getTimeCurrent(format) {
        return moment(new Date()).format(format)
    }

    static convertFormatToFormat(time, format1, format2) {
        return this.getTimeFormatFromTime(this.getTimeFromTimeFormat(time, format1), format2)
    }

    static addTime(time, dateAdd, format) {
        let result = this.getTimeFromTimeFormat(time, format);
        result.add(dateAdd, 'd')
        return this.getTimeFormatFromTime(result, format);
    }

    static getTimeMomentCurrent() {
        return moment(new Date());
    }

    static getDayBetweenTwoDate(date1, date2) {
        if (!date1 || !date2) {
            return 0;
        }
        return Math.floor((date2.getTime() - date1.getTime()) / 86400000);
    }

    static formatDateFromTimeUnix(val, timeFormat) {
        if (val === null || val === '' || _.isUndefined(val)) {
            return '';
        }
        else {
            let d = new Date(val * 1000);
            return moment(d).format(timeFormat);
        }
    }

    static compareTwoDatesToGetDay(date1, date2) {
        if (date1 && date2) {
            let date1Unix = moment.unix(date1);
            date1Unix.hour(0)
            date1Unix.minute(0)
            date1Unix.second(0);

            let date2Unix = moment.unix(date2);
            date2Unix.hour(0)
            date2Unix.minute(0)
            date2Unix.second(0);
            return date1Unix.unix() - date2Unix.unix();
        }
        return 0;
    }

    static getTimeUnixFromTimeFormat(val) {
        if (val === null || val === '' || _.isUndefined(val)) {
            return null
        } else {
            return moment(val, this.DATE_TIME_SS_FORMAT).unix();
        }
    }

    static getTimeUnixCurrent() {
        return moment().unix();
    }

    static validateDateTime(time, format, startTime) {
        let wrongFormat = !moment(time, format, true).isValid();
        if (wrongFormat) {
            return `Invalid date format, please key in date in format ${format}`
        } else if (startTime && this.compareTwoDate(startTime, time) > 0) {
            return 'Invalid Date'
        } else {
            return null;
        }
    }

    static validateDate(time, format) {
        let wrongFormat = !moment(time, format, true).isValid();
        if (wrongFormat) {
            return `Invalid date format, please key in date in format ${format}`
        } else {
            return null;
        }
    }
}