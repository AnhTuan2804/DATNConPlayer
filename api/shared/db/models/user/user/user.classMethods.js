const db = require('../../../db');
const _ = require('lodash');

class ClassMethods {
    constructor() { }
    getClassMethods(DataTypes) {
        return {
            createUser: (data, transaction) => { return this.createUser(data, transaction) },
            deleteUser: (data) => { return this.deleteUser(data) },
            updateToken: (id, token) => { return this.updateToken(id, token); },
            updateUser: (body) => { return this.updateUser(body) },
            getUserByToken: (body) => { return this.getUserByToken(body) },
            getListUser: () => { return this.getListUser() }
        };
    }

    createUser(body, transaction) {
        return db.user.create(body, db.getTransaction(transaction)).then((createdUser) => {
            return createdUser;
        }).catch((err) => {
            throw err
        });
    }

    deleteUser(id) {
        return db.user.destroy({
            where: {
                id: id
            }
        });
    }

    updateToken(id, token) {
        return db.user.find({ where: { id: id } }).then((user => {
            if (!user) {
                throw new Error("User not exist");
            }
            user.token = token;
            return user.save().then((updateUser) => {
                return user.getUser();
            })
        }))
    }

    updateUser(body) {
        return db.user.update(body, { where: { id: body.id } }).then((result) => {
            return db.user.find({ where: { id: body.id } }).then((result) => {
                return result.getUser();
            })
        })
    }

    getUserByToken(token) {
        return db.user.find({ where: { token: token }, include: { model: db.role } }).then((result) => {
            return result;
        })
    }

    getListUser() {
        return db.user.findAll({
            include: {
                model: db.role
            }
        }).then((result) => {
            return result
        })
    }
}

module.exports = new ClassMethods();