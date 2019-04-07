'use strict';
const _ = require('lodash');
class SizeGridironInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getSizeGridiron: function () {
                return _.pick(this, ['id', 'size', 'created_at', 'updated_at']);
            }
        };
    }
}

module.exports = new SizeGridironInstanceMethods();