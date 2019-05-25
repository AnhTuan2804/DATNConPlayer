'use strict';
const db = require('../shared/db/db');
class CareerHandler {

    create(body) {
        return db.career.createCareer(body).then((result) => {
            return result;
        });
    }

    getList() {
        return db.career.getListCareer().then((result) => {
            return result;
        })
    }

    update(body) {
        return db.career.updateCareer(body).then((result) => {
            return result;
        });
    }

    delete(body) {
        return db.career.deleteCareer(body).then((result) => {
            return result;
        });
    }

}
module.exports = new CareerHandler();