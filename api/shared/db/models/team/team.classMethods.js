const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createTeam: (body) => { return this.createTeam(body) },
            getListTeam: () => { return this.getListTeam() },
            updateTeam: (body) => { return this.updateTeam(body) },
            deleteTeam: (body) => { return this.deleteTeam(body) }
        };
    }

    createTeam(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.team.create(body.team, db.getTransaction(transaction)).then((createdTeam) => {
                return createdTeam;
            }).catch((err) => {
                throw err
            });
        })
    }

    getListTeam() {
        return db.team.findAll();
    }

    updateTeam(body) {
        return db.team.update(body, { where: { id: body.id } })
            .then((team) => {
                return team
            })
    }

    deleteTeam(body) {
        return db.team.destroy({
            where: {
                id: body.id
            }
        });
    }
}

module.exports = new ClassMethods();