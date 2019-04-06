const teamUserSchema = require('./team_user.schema');
const teamUserClassMethods = require('./team_user.classMethods');
const teamuserInstanceMethods = require('./team_user.instanceMethods');

class TeamUser {
    getDefinition(sequelize, DataTypes) {
        let schema = teamUserSchema.getSchema(DataTypes);
        let classMethods = teamUserClassMethods.getClassMethods(DataTypes);
        let instanceMethods = teamuserInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('team', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let teamUser = new TeamUser();
    return teamUser.getDefinition(sequelize, DataTypes);
}