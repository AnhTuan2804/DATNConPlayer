'use strict';
const _ = require('lodash');
class RoleInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getRole: function() {
                return _.pick(this, ['id', 'role', 'created_at','updated_at']);
            }
        };
    }
}

module.exports = new RoleInstanceMethods();