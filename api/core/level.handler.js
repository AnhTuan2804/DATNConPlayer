'use strict';
const db = require('../shared/db/db');
class RoleHandler {

    create(body) {
        return db.level.createLevel(body).then((result) => {
            return result;
        });
    }

    getList() {
        return db.level.getListLevel().then((result) => {
            return result;
        })
    }

    update(body) {
        return db.level.updateLevel(body).then((result) => {
            return result;
        });
    }

    delete(body) {
        return db.level.deleteLevel(body).then((result) => {
            return result;
        });
    }

}
module.exports = new RoleHandler();