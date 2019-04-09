'use strict';
const db = require('../shared/db/db');
class RoleHandler {

    create(body) {
        return db.area.createArea(body).then((result) => {
            return result;
        });
    }

    getList() {
        return db.area.getListArea().then((result) => {
            return result;
        })
    }

    update(body) {
        return db.area.updateArea(body).then((result) => {
            return result;
        });
    }

    delete(body) {
        return db.area.deleteArea(body).then((result) => {
            return result;
        });
    }

}
module.exports = new RoleHandler();