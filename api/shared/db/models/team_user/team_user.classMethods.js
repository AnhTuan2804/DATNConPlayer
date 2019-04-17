const db = require('../../db');
const _ = require('lodash');

class ClassMethods {

    constructor() { }

    getClassMethods(DataTypes) {
        return {
            createTeamUser: (body) => { return this.createTeamUser(body) },
            getListTeamUser: () => { return this.getListTeamUser() },
            updateTeamUser: (body) => { return this.updateTeamUser(body) },
            deleteTeamUser: (body) => { return this.deleteTeamUser(body) }
        };
    }

    createTeamUser(body) {
        return db.teamUser.create(body.teamUser).then((createdTeamUser) => {
            return createdTeamUser;
        }).catch((err) => {
            throw err
        });
    }

    getListTeamUser() {
        return db.teamUser.findAll();
    }

    updateTeamUser(body) {
        return db.teamUser.update(body, { where: { id: body.id } })
            .then((teamUser) => {
                return teamUser
            })
    }

    deleteTeamUser(id) {
        return db.teamUser.destroy({
            where: {
                id: id
            }
        }).then((result)=>{
            if(result== 0){
                throw new Error('Người dùng không tồn tại trong đội')
            }
        });
    }
}

module.exports = new ClassMethods();