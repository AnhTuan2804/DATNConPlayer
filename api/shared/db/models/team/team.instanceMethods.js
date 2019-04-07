'use strict';
const _ = require('lodash');
class TeamInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getLevel: function () {
                return _.pick(this, ['id', 'name', 'description', 'picture', 'id_level', 'id_area', 'created_at', 'updated_at']);
            }
        };
    }
}

module.exports = new TeamInstanceMethods();