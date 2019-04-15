const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createGridiron: (body, token) => { return this.createGridiron(body, token) },
            getDetail: (id, token) => { return this.getDetail(id, token) },
            getListForUser: (token) => { return this.getListForUser(token) },
            getListForAdmin: (token) => { return this.getListForAdmin(token) },
            updateGridiron: (body, token) => { return this.updateGridiron(body, token) },
            deleteGridiron: (body) => { return this.deleteGridiron(body) }
        };
    }

    createGridiron(body, token) {
        return db.user.find({ where: { token: token } }).then((user) => {
            return db.gridiron.find({ where: { name: body.gridiron.name } }).then((result) => {
                if (result) {
                    throw new Error('Tên sân này đã tồn tại!')
                } else {
                    body.gridiron['user_id'] = user.id
                    return db.gridiron.create(body.gridiron).then((gridiron) => {
                        return gridiron;
                    }).catch((err) => {
                        throw err
                    });
                }
            });
        })
    }

    getListForUser(token) {
        return db.user.find({ where: { token: token } }).then((user) => {
            return db.gridiron.findAll({
                where: {
                    user_id: user.id
                },
                include: [{
                    model: db.area,
                    attributes: ['id', 'name']
                }]
            });
        })
    }

    getDetail(id, token) {
        return db.gridiron.find({
            where: {
                id: id
            },
            include: [{
                model: db.area,
                attributes: ['id', 'name']
            }, {
                model: db.sub_gridiron,
                include: [{
                    model: db.size_gridiron,
                    attributes: ['id', 'name']
                }]
            }, {
                model: db.price_on_time,
                include: [{
                    model: db.time
                }, {
                    model: db.size_gridiron
                }]
            }]
        });
    }


    getListForAdmin(token) {
        return db.gridiron.findAll({
            include: [{
                model: db.area,
                attributes: ['id', 'name']
            }]
        });
    }

    updateGridiron(body, token) {
        return db.gridiron.find({ where: { name: body.name } }).then((result) => {
            if (result.id != body.id) {
                throw new Error('Tên sân này đã tồn tại!')
            }
            return db.gridiron.update(body, { where: { id: body.id } })
                .then((gridiron) => {
                    return gridiron
                })
        })
    }

    deleteGridiron(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.sub_gridiron.destroy({ where: { gridiron_id: body.id } }, db.getTransaction(transaction)).then((result) => {
                return db.price_on_time.destroy({ where: { gridiron_id: body.id } }, db.getTransaction(transaction)).then(() => {
                    return db.gridiron.destroy({
                        where: {
                            id: body.id
                        }
                    });
                })
            })
        })
    }
}

module.exports = new ClassMethods();