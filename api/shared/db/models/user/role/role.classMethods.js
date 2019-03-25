const db = require('../../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createRoles: (body) => { return this.createRoles(body) },
            getListRoles: () => { return this.getListRoles() },
            updateRole: (body) => { return this.updateRole(body) },
            deleteRoles: (body) => { return this.deleteRoles(body) }
        };
    }

    createRoles(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.role.create(body.role, db.getTransaction(transaction)).then((createdRoles) => {
                return createdRoles;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListRoles() {
        return db.role.findAll();
    }

    updateRole(body) {
        return db.role.update(body, { where: { id: body.id } })
            .then((role) => {
                return role
            })
    }

    deleteRoles(id) {
        return db.role.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ClassMethods();