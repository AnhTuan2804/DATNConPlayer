const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createSizeGridirons: (body) => { return this.createSizeGridirons(body) },
            getListSizeGridirons: () => { return this.getListSizeGridirons() },
            updateSizeGridiron: (body) => { return this.updateSizeGridiron(body) },
            deleteSizeGridirons: (body) => { return this.deleteSizeGridirons(body) }
        };
    }

    createSizeGridirons(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.size_gridiron.create(body.size_gridiron, db.getTransaction(transaction)).then((createdSizeGridirons) => {
                return createdSizeGridirons;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListSizeGridirons() {
        return db.size_gridiron.findAll();
    }

    updateSizeGridiron(body) {
        return db.size_gridiron.update(body, { where: { id: body.id } })
            .then((sizeGridiron) => {
                return sizeGridiron
            })
    }

    deleteSizeGridirons(id) {
        return db.size_gridiron.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ClassMethods();