const gridironSchema = require('./gridiron.schema');
const gridironClassMethods = require('./gridiron.classMethods');
const gridironInstanceMethods = require('./gridiron.instanceMethods');

class Gridiron {
    getDefinition(sequelize, DataTypes) {
        let schema = gridironSchema.getSchema(DataTypes);
        let classMethods = gridironClassMethods.getClassMethods(DataTypes);
        let instanceMethods = gridironInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('gridiron', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let gridiron = new Gridiron();
    return gridiron.getDefinition(sequelize, DataTypes);
}