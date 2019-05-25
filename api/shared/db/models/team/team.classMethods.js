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
            getListForUser: (token, isCaptain) => { return this.getListForUser(token, isCaptain) },
            getListForAdmin: (token) => { return this.getListForAdmin(token) },
            getListByCaptain: (token) => { return this.getListByCaptain(token) },
            updateTeam: (body, token) => { return this.updateTeam(body, token) },
            deleteTeam: (body, token) => { return this.deleteTeam(body, token) }
        };
    }

    createTeam(body, token) {
        return db.user.find({ where: { token: token } }).then((user) => {
            return db.team.find({ where: { name: body.team.name } }).then((result) => {
                if (result) {
                    throw new Error('This name of team is exist already!')
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
                return db.user.find({ where: { phone: body.teamUser.member } }).then((userPhone) => {
                    if (!userPhone) {
                        throw new Error('This user not exist!')
                    } else {
                        return db.teamUser.find({
                            where: { user_id: userPhone.id, team_id: body.teamUser.team_id }
                        }).then((result) => {
                            if (result) {
                                throw new Error('This user is exist in team already!')
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
                        throw new Error('This user is exist in team already!')
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

    getListForUser(token, isCaptain) {
        return db.user.find({ where: { token: token } }).then((user) => {
            let where = isCaptain ? { user_id: user.id, is_captain: 1 } : { user_id: user.id }
            return db.team.findAll({
                include: [{
                    model: db.level,
                    attributes: ['id', 'name']
                }, {
                    model: db.area,
                    attributes: ['id', 'name']
                }, {
                    model: db.career,
                    attributes: ['id', 'name']
                }, {
                    model: db.teamUser,
                    attributes: ['id', 'is_captain', 'user_id', 'team_id'],
                    where: where,
                    include: [{
                        model: db.user,
                        attributes: ['id', 'fullname', 'email', 'phone']
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
                attributes: ['id', 'name']
            }, {
                model: db.area,
                attributes: ['id', 'name']
            }, {
                model: db.career,
                attributes: ['id', 'name']
            }, {
                model: db.teamUser,
                include: [{
                    model: db.user
                }]
            }]
        });
    }


    getListForAdmin(token) {
        return db.team.findAll({
            include: [{
                model: db.level,
                attributes: ['id', 'name']
            }, {
                model: db.area,
                attributes: ['id', 'name']
            }, {
                model: db.career,
                attributes: ['id', 'name']
            }, {
                model: db.teamUser
            }]
        });
    }

    updateTeam(body, token) {
        return db.team.find({ where: { name: body.name } }).then((result) => {
            if (result.id != body.id) {
                throw new Error('This name of team is exist already!')
            }
            return db.team.update(body, { where: { id: body.id } })
                .then((team) => {
                    return team
                })
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