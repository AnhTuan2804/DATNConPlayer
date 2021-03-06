'use strict';
const _ = require('lodash');
class AreaInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getLevel: function () {
                return _.pick(this, ['id', 'name', 'created_at', 'updated_at']);
            }
        };
    }
}

module.exports = new AreaInstanceMethods();