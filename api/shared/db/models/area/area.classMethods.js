const db = require('../../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createAreas: (body) => { return this.createAreas(body) },
            getListAreas: () => { return this.getListAreas() },
            updateArea: (body) => { return this.updateArea(body) },
            deleteAreas: (body) => { return this.deleteAreas(body) }
        };
    }

    createAreas(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.area.create(body.area, db.getTransaction(transaction)).then((createdAreas) => {
                return createdAreas;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListAreas() {
        return db.area.findAll();
    }

    updateArea(body) {
        return db.area.update(body, { where: { id: body.id } })
            .then((area) => {
                return area
            })
    }

    deleteAreas(id) {
        return db.area.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ClassMethods();