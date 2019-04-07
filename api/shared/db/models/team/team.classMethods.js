const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createTeams: (body) => { return this.createTeams(body) },
            getListTeams: () => { return this.getListTeams() },
            updateTeam: (body) => { return this.updateTeam(body) },
            deleteTeams: (body) => { return this.deleteTeams(body) }
        };
    }

    createTeams(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.team.create(body.team, db.getTransaction(transaction)).then((createdTeams) => {
                return createdTeams;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListTeams() {
        return db.team.findAll();
    }

    updateTeam(body) {
        return db.team.update(body, { where: { id: body.id } })
            .then((team) => {
                return team
            })
    }

    deleteTeams(id) {
        return db.team.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ClassMethods();