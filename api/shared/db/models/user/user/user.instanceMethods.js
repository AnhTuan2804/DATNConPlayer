'use strict';
const _ = require('lodash');
class UserInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getUser: function () {
                return _.pick(this, ['id', 'email', 'phone', 'fullname', 'token', 'created_by', 'is_lock', 'is_delete', 'created_at', 'updated_at']);
            }
        };
    }

}

module.exports = new UserInstanceMethods();