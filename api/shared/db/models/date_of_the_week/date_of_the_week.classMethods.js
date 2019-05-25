const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createDateOfTheWeeks: (body) => { return this.createDateOfTheWeeks(body) },
            getListDateOfTheWeeks: () => { return this.getListDateOfTheWeeks() },
            updateDateOfTheWeek: (body) => { return this.updateDateOfTheWeek(body) },
            deleteDateOfTheWeeks: (body) => { return this.deleteDateOfTheWeeks(body) }
        };
    }

    createDateOfTheWeeks(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.dateOfTheWeek.create(body.dateOfTheWeek, db.getTransaction(transaction)).then((createdDateOfTheWeeks) => {
                return createdDateOfTheWeeks;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListDateOfTheWeeks() {
        return db.dateOfTheWeek.findAll();
    }

    updateLevel(body) {
        return db.dateOfTheWeek.update(body, { where: { id: body.id } })
            .then((dateOfTheWeek) => {
                return dateOfTheWeek
            })
    }

    deleteDateOfTheWeeks(id) {
        return db.dateOfTheWeek.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ClassMethods();