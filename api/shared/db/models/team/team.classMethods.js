const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createTeam: (body, token) => { return this.createTeam(body, token) },
            addMember: (body, token) => { return this.addMember(body, token) },
            getListTeam: (token) => { return this.getListTeam(token) },
            getDetail: (id, token) => { return this.getDetail(id, token) },
            getListForUser: (token) => { return this.getListForUser(token) },
            getListForAdmin: (token) => { return this.getListForAdmin(token) },
            updateTeam: (body, token) => { return this.updateTeam(body, token) },
            deleteTeam: (body, token) => { return this.deleteTeam(body, token) }
        };
    }

    createTeam(body, token) {
        return db.user.find({ where: { token: token } }).then((user) => {
            return db.team.find({ where: { name: body.team.name } }).then((result) => {
                if (result) {
                    throw new Error('Tên đội này đã tồn tại!')
                } else {
                    return db.team.create(body.team).then((team) => {
                        const teamUser = {
                            is_captain: 1,
                            user_id: user.id,
                            team_id: team.id
                        }
                        return db.teamUser.createTeamUser({ teamUser: teamUser }).then((result) => {
                            return team;
                        });
                    }).catch((err) => {
                        throw err
                    });
                }
            });
        })
    }

    addMember(body, token) {
        body.teamUser['is_captain'] = 0;
        return db.user.find({ where: { email: body.teamUser.member } }).then((userMail) => {
            if (!userMail) {
                return db.user.find({ where: { email: body.teamUser.member } }).then((userPhone) => {
                    if (!userPhone) {
                        throw new Error('Người dùng không tồn tại!')
                    } else {
                        return db.teamUser.find({
                            where: { user_id: userPhone.id, team_id: body.teamUser.team_id }
                        }).then((result) => {
                            if (result) {
                                throw new Error('Người dùng đang có trong đội!')
                            } else {
                                body.teamUser['user_id'] = userPhone.id;
                                return db.teamUser.createTeamUser({ teamUser: body.teamUser }).then((result) => {
                                    return result;
                                });
                            }
                        })
                    }
                })
            } else {
                return db.teamUser.find({
                    where: { user_id: userMail.id, team_id: body.teamUser.team_id }
                }).then((result) => {
                    if (result) {
                        throw new Error('Người dùng đang có trong đội!')
                    } else {
                        body.teamUser['user_id'] = userMail.id;
                        return db.teamUser.createTeamUser({ teamUser: body.teamUser }).then((result) => {
                            return result;
                        });
                    }
                })
            }
        })
    }

    getListTeam(token) {
        return db.team.findAll();
    }

    getListForUser(token) {
        return db.user.find({ where: { token: token } }).then((user) => {
            return db.teamUser.findAll({
                where: {
                    user_id: user.id
                },
                include: [{
                    model: db.team,
                    include: [{
                        model: db.level,
                        attributes: ['id', 'level']
                    }, {
                        model: db.area,
                        attributes: ['id', 'area']
                    }]
                }]
            });
        })
    }

    getDetail(id, token) {
        return db.team.find({
            where: {
                id: id
            },
            include: [{
                model: db.level,
                attributes: ['id', 'level']
            }, {
                model: db.area,
                attributes: ['id', 'area']
            }, {
                model: db.teamUser,
                include: [{
                    model: db.user
                }]
            }]
        });
    }


    getListForAdmin(token) {
        return db.teamUser.findAll({
            include: [{
                model: db.team,
                include: [{
                    model: db.level,
                    attributes: ['id', 'level']
                }, {
                    model: db.area,
                    attributes: ['id', 'area']
                }]
            }]
        });
    }

    updateTeam(body, token) {
        return db.team.update(body, { where: { id: body.id } })
            .then((team) => {
                return team
            })
    }

    deleteTeam(body, token) {
        return db.getSequelize().transaction(function (transaction) {
            return db.teamUser.destroy({ where: { team_id: body.id } }, db.getTransaction(transaction)).then((result) => {
                return db.team.destroy({
                    where: {
                        id: body.id
                    }
                });
            })
        })
    }
}

module.exports = new ClassMethods();