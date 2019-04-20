const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createSubGridiron: (body) => { return this.createSubGridiron(body) },
            getListSubGridiron: () => { return this.getListSubGridiron() },
            updateSubGridiron: (body) => { return this.updateSubGridiron(body) },
            deleteSubGridiron: (body) => { return this.deleteSubGridiron(body) }
        };
    }

    createSubGridiron(body) {
         return db.getSequelize().transaction(function (transaction) {
            return db.sub_gridiron.bulkCreate(body.sub_gridirons, db.getTransaction(transaction)).then((resutl) => {
                return resutl;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListSubGridiron() {
        return db.sub_gridiron.findAll();
    }

    updateSubGridiron(body) {
        return db.sub_gridiron.update(body, { where: { id: body.id } })
            .then((SubGridiron) => {
                return SubGridiron
            })
    }

    deleteSubGridiron(body) {
        return db.sub_gridiron.destroy({
            where: {
                id: body.id
            }
        });
    }
}

module.exports = new ClassMethods();