const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createTeamUsers: (body) => { return this.createTeamUsers(body) },
            getListTeamUsers: () => { return this.getListTeamUsers() },
            updateTeamUser: (body) => { return this.updateTeamUser(body) },
            deleteTeamUsers: (body) => { return this.deleteTeamUsers(body) }
        };
    }

    createTeamUsers(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.team_user.create(body.team_user, db.getTransaction(transaction)).then((createdTeamUsers) => {
                return createdTeamUsers;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListTeamUsers() {
        return db.team_user.findAll();
    }

    updateTeamUser(body) {
        return db.team_user.update(body, { where: { id: body.id } })
            .then((teamUser) => {
                return teamUser
            })
    }

    deleteTeamUsers(id) {
        return db.team_user.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ClassMethods();