const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createLevels: (body) => { return this.createLevels(body) },
            getListLevels: () => { return this.getListLevels() },
            updateLevel: (body) => { return this.updateLevel(body) },
            deleteLevels: (body) => { return this.deleteLevels(body) }
        };
    }

    createLevels(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.level.create(body.level, db.getTransaction(transaction)).then((createdLevels) => {
                return createdLevels;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListLevels() {
        return db.level.findAll();
    }

    updateLevel(body) {
        return db.level.update(body, { where: { id: body.id } })
            .then((level) => {
                return level
            })
    }

    deleteLevels(id) {
        return db.level.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ClassMethods();