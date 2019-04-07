const sizeGridironSchema = require('./size_gridiron.schema');
const sizeGridironClassMethods = require('./size_gridiron.classMethods');
const sizeGridironInstanceMethods = require('./size_gridiron.instanceMethods');

class SizeGridiron {
    getDefinition(sequelize, DataTypes) {
        let schema = sizeGridironSchema.getSchema(DataTypes);
        let classMethods = sizeGridironClassMethods.getClassMethods(DataTypes);
        let instanceMethods = sizeGridironInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('size_gridiron', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let sizeGridiron = new SizeGridiron();
    return sizeGridiron.getDefinition(sequelize, DataTypes);
}