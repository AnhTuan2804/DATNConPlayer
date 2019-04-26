const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createLevel: (body) => { return this.createLevel(body) },
            getListLevel: () => { return this.getListLevel() },
            updateLevel: (body) => { return this.updateLevel(body) },
            deleteLevel: (body) => { return this.deleteLevel(body) }
        };
    }

    createLevel(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.level.create(body.level, db.getTransaction(transaction)).then((createdLevel) => {
                return createdLevel;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListLevel() {
        return db.level.findAll({
            attributes: ['id', 'name']
        });
    }

    updateLevel(body) {
        return db.level.update(body, { where: { id: body.id } })
            .then((level) => {
                return level
            })
    }

    deleteLevel(body) {
        return db.level.destroy({
            where: {
                id: body.id
            }
        });
    }
}

module.exports = new ClassMethods();