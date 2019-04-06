'use strict';
const _ = require('lodash');
class PriceOnTimeInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getLevel: function () {
                return _.pick(this, ['id', 'time_start', 'time_end', 'price', 'id_date_of_the_week', 'id_sub_gridiron', 'created_at', 'updated_at']);
            }
        };
    }
}

module.exports = new PriceOnTimeInstanceMethods();