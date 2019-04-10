'use strict';
const db = require('../shared/db/db');
class RoleHandler {

    create(body) {
        return db.team.createTeam(body).then((result) => {
            return result;
        });
    }

    getList() {
        return db.team.getListTeam().then((result) => {
            return result;
        })
    }

    update(body) {
        return db.team.updateTeam(body).then((result) => {
            return result;
        });
    }

    delete(body) {
        return db.team.deleteTeam(body).then((result) => {
            return result;
        });
    }

}
module.exports = new RoleHandler();