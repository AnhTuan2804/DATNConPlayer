const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createTime: (body) => { return this.createTime(body) },
            getListTime: () => { return this.getListTime() },
            updateTime: (body) => { return this.updateTime(body) },
            deleteTime: (body) => { return this.deleteTime(body) }
        };
    }

    createTime(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.time.bulkCreate(body.times, db.getTransaction(transaction)).then((result) => {
                return result;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListTime() {
        return db.time.findAll();
    }

    updateTime(body) {
        return db.time.update(body, { where: { id: body.id } })
            .then((Time) => {
                return Time
            })
    }

    deleteTime(body) {
        return db.time.destroy({
            where: {
                id: body.id
            }
        });
    }
}

module.exports = new ClassMethods();