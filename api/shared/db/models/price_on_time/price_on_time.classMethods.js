const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createPriceOnTime: (body) => { return this.createPriceOnTime(body) },
            getListPriceOnTime: () => { return this.getListPriceOnTime() },
            updatePriceOnTime: (body) => { return this.updatePriceOnTime(body) },
            deletePriceOnTime: (body) => { return this.deletePriceOnTime(body) }
        };
    }

    createPriceOnTime(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.price_on_time.find({
                where:
                {
                    gridiron_id: body.price_on_time.gridiron_id,
                    size_gridiron_id: body.price_on_time.size_gridiron_id,
                    time_id: body.price_on_time.time_id
                }
            }).then((result) => {
                if(result){
                    throw new Error(`Price for this time and this type of gridiron is exist already!`)
                }
                return db.price_on_time.create(body.price_on_time, db.getTransaction(transaction)).then((result) => {
                    return result;
                }).catch((err) => {
                    throw err
                });
            })
        })
    }

    getListPriceOnTime() {
        return db.price_on_time.findAll();
    }

    updatePriceOnTime(body) {
        return db.price_on_time.update(body, { where: { id: body.id } })
            .then((priceOnTime) => {
                return priceOnTime
            })
    }

    deletePriceOnTime(body) {
        return db.price_on_time.destroy({
            where: {
                id: body.id
            }
        });
    }
}

module.exports = new ClassMethods();