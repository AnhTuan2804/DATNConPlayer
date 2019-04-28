'use strict';
const db = require('../shared/db/db');
class RoleHandler {

    create(body, token) {
        return db.team.createTeam(body, token).then((result) => {
            return result;
        });
    }

    addMember(body, token) {
        return db.team.addMember(body, token).then((result) => {
            return result;
        });
    }

    getListForUser(token, isCaptain) {
        return db.team.getListForUser(token, isCaptain).then((result) => {
            return result;
        })
    }

    getDetail(id, token) {
        return db.team.getDetail(id, token).then((result) => {
            return result;
        })
    }

    getListForAdmin(token) {
        return db.team.getListForAdmin(token).then((result) => {
            return result;
        })
    }
    getListByCaptain(token) {
        return db.team.getListByCaptain(token).then((result) => {
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

    deleteMember(body, token) {
        return db.teamUser.deleteTeamUser(body.id).then((result) => {
            return result;
        });
    }
}
module.exports = new RoleHandler();