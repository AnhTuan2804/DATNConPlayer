'use strict';
const db = require('../shared/db/db');
class RoleHandler {

    createRoles(body) {
        return db.role.createRoles(body).then((result) => {
            return result;
        });
    }

    getListRoles() {
        return db.role.getListRoles().then((result) => {
            return result;
        })
    }

    updateRole(body) {
        return db.role.updateRole(body).then((result) => {
            return result;
        });
    }

    deleteRoles(body) {
        return db.role.deleteRoles(body).then((result) => {
            return result;
        });
    }

}
module.exports = new RoleHandler();