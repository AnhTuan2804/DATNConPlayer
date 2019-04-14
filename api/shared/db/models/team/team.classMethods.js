const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createTeam: (body, token) => { return this.createTeam(body, token) },
            getListTeam: (token) => { return this.getListTeam(token) },
            getListForUser: (token) => { return this.getListForUser(token) },
            getListForAdmin: (token) => { return this.getListForAdmin(token) },
            updateTeam: (body, token) => { return this.updateTeam(body, token) },
            deleteTeam: (body, token) => { return this.deleteTeam(body, token) }
        };
    }

    createTeam(body, token) {
        return db.user.find({ where: { token: token } }).then((user) => {
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