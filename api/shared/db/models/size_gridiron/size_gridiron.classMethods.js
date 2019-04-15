const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createSizeGridiron: (body) => { return this.createSizeGridiron(body) },
            getListSizeGridiron: () => { return this.getListSizeGridiron() },
        };
    }

    createSizeGridiron(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.size_gridiron.create(body.size_gridiron, db.getTransaction(transaction)).then((createdSizeGridiron) => {
                return createdSizeGridiron;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListSizeGridiron() {
        return db.size_gridiron.findAll();
    }
}

module.exports = new ClassMethods();