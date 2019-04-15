'use strict';
const _ = require('lodash');
class TimeInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getLevel: function () {
                return _.pick(this, ['id', 'time_start', 'time_end', 'created_at', 'updated_at']);
            }
        };
    }
}

module.exports = new TimeInstanceMethods();