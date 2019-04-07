'use strict';
const _ = require('lodash');
class TeamUserInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getLevel: function () {
                return _.pick(this, ['id', 'is_captain', 'user_id', 'team_id', 'created_at', 'updated_at']);
            }
        };
    }
}

module.exports = new TeamUserInstanceMethods();