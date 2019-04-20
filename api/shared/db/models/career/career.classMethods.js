const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createCareer: (body) => { return this.createCareer(body) },
            getListCareer: () => { return this.getListCareer() },
            updateCareer: (body) => { return this.updateCareer(body) },
            deleteCareer: (body) => { return this.deleteCareer(body) }
        };
    }

    createCareer(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.career.find({ where: { name: body.career.name } }).then((result) => {
                if (result) {
                    throw new Error('This career is exist already!')
                }
                return db.career.create(body.career, db.getTransaction(transaction)).then((result) => {
                    return result;
                }).catch((err) => {
                    throw err
                });
            })
        })
    }

    getListCareer() {
        return db.career.findAll();
    }

    updateCareer(body) {
        return db.career.update(body, { where: { id: body.id } })
            .then((Career) => {
                return Career
            })
    }

    deleteCareer(body) {
        return db.career.destroy({
            where: {
                id: body.id
            }
        });
    }
}

module.exports = new ClassMethods();