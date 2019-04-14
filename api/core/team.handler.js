'use strict';
const db = require('../shared/db/db');
class RoleHandler {

    create(body, token) {
        return db.team.createTeam(body, token).then((result) => {
            return result;
        });
    }

    getListForUser(token) {
        return db.team.getListForUser(token).then((result) => {
            return result;
        })
    }

    getListForAdmin(token) {
        return db.team.getListForAdmin(token).then((result) => {
            return result;
        })
    }

    update(body, token) {
        return db.team.updateTeam(body, token).then((result) => {
            return result;
        });
    }

    delete(body, token) {
        return db.team.deleteTeam(body, token).then((result) => {
            return result;
        });
    }

}
module.exports = new RoleHandler();