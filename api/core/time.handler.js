'use strict';
const db = require('../shared/db/db');
class TimeHandler {

    create(body) {
        return db.time.createTime(body).then((result) => {
            return result;
        });
    }

    getList() {
        return db.time.getListTime().then((result) => {
            return result;
        })
    }

    update(body) {
        return db.time.updateTime(body).then((result) => {
            return result;
        });
    }

    delete(body) {
        return db.time.deleteTime(body).then((result) => {
            return result;
        });
    }

}
module.exports = new TimeHandler();