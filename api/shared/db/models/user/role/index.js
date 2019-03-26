const roleSchema = require('./role.schema');
const roleClassMethods = require('./role.classMethods');
const roleInstanceMethods = require('./role.instanceMethods');

class Role {
    getDefinition(sequelize, DataTypes) {
        let schema = roleSchema.getSchema(DataTypes);
        let classMethods = roleClassMethods.getClassMethods(DataTypes);
        let instanceMethods = roleInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('role', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let role = new Role();
    return role.getDefinition(sequelize, DataTypes);
}