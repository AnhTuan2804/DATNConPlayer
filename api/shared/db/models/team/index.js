const teamSchema = require('./team.schema');
const teamClassMethods = require('./team.classMethods');
const teamInstanceMethods = require('./team.instanceMethods');

class Team {
    getDefinition(sequelize, DataTypes) {
        let schema = teamSchema.getSchema(DataTypes);
        let classMethods = teamClassMethods.getClassMethods(DataTypes);
        let instanceMethods = teamInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('team', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let team = new Team();
    return team.getDefinition(sequelize, DataTypes);
}