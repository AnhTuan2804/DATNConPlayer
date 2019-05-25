'use strict';
const _ = require('lodash');
class TeamInstanceMethods {
    getInstanceMethods(DataTypes) {
        return {
            getLevel: function () {
                return _.pick(this, ['id', 'name', 'description', 'area_id', 'address', 'latitude', 'longititude', 'link_face','phone','picture','user_id','created_at','updated_at']);
            }
        };
    }
}

module.exports = new TeamInstanceMethods();