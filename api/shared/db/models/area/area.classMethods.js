const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createArea: (body) => { return this.createArea(body) },
            getListArea: () => { return this.getListArea() },
            updateArea: (body) => { return this.updateArea(body) },
            deleteArea: (body) => { return this.deleteArea(body) }
        };
    }

    createArea(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.area.create(body.area, db.getTransaction(transaction)).then((result) => {
                return result;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListArea() {
        return db.area.findAll();
    }

    updateArea(body) {
        return db.area.update(body, { where: { id: body.id } })
            .then((area) => {
                return area
            })
    }

    deleteArea(body) {
        return db.area.destroy({
            where: {
                id: body.id
            }
        });
    }
}

module.exports = new ClassMethods();