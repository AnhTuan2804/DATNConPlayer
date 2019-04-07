const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createPriceOnTimes: (body) => { return this.createPriceOnTimes(body) },
            getListPriceOnTimes: () => { return this.getListPriceOnTimes() },
            updatePriceOnTime: (body) => { return this.updatePriceOnTime(body) },
            deletePriceOnTimes: (body) => { return this.deletePriceOnTimes(body) }
        };
    }

    createPriceOnTimes(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.price_on_time.create(body.price_on_time, db.getTransaction(transaction)).then((createdPriceOnTimes) => {
                return createdPriceOnTimes;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListPriceOnTimes() {
        return db.price_on_time.findAll();
    }

    updatePriceOnTime(body) {
        return db.price_on_time.update(body, { where: { id: body.id } })
            .then((priceOnTime) => {
                return priceOnTime
            })
    }

    deletePriceOnTimes(id) {
        return db.price_on_time.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ClassMethods();