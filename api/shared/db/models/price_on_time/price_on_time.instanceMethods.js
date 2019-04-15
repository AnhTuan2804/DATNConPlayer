'use strict';
const _ = require('lodash');
class PriceOnTimeInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getPriceOnTime: function () {
                return _.pick(this, ['id', 'time_id', 'name_gridiron_id', 'gridiron_id', 'price', 'created_at', 'updated_at']);
            }
        };
    }
}

module.exports = new PriceOnTimeInstanceMethods();