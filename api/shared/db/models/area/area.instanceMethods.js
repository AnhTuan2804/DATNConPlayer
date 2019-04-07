'use strict';
const _ = require('lodash');
class AreaInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getArea: function () {
                return _.pick(this, ['id', 'area', 'created_at', 'updated_at']);
            }
        };
    }
}

module.exports = new AreaInstanceMethods();