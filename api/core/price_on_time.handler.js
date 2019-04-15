'use strict';
const db = require('../shared/db/db');
class PriceOnTimeHandler {

    create(body) {
        return db.price_on_time.createPriceOnTime(body).then((result) => {
            return result;
        });
    }

    getList() {
        return db.price_on_time.getListPriceOnTime().then((result) => {
            return result;
        })
    }

    update(body) {
        return db.price_on_time.updatePriceOnTime(body).then((result) => {
            return result;
        });
    }

    delete(body) {
        return db.price_on_time.deletePriceOnTime(body).then((result) => {
            return result;
        });
    }

}
module.exports = new PriceOnTimeHandler();