const levelSchema = require('./sub_gridiron.schema');
const levelClassMethods = require('./sub_gridiron.classMethods');
const levelInstanceMethods = require('./sub_gridiron.instanceMethods');

class Level {
    getDefinition(sequelize, DataTypes) {
        let schema = levelSchema.getSchema(DataTypes);
        let classMethods = levelClassMethods.getClassMethods(DataTypes);
        let instanceMethods = levelInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('sub_gridiron', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let level = new Level();
    return level.getDefinition(sequelize, DataTypes);
}