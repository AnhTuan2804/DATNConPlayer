const levelSchema = require('./level.schema');
const levelClassMethods = require('./level.classMethods');
const levelInstanceMethods = require('./level.instanceMethods');

class Level {
    getDefinition(sequelize, DataTypes) {
        let schema = levelSchema.getSchema(DataTypes);
        let classMethods = levelClassMethods.getClassMethods(DataTypes);
        let instanceMethods = levelInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('level', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let level = new Level();
    return level.getDefinition(sequelize, DataTypes);
}