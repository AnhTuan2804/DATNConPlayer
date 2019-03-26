const userSchema = require('./user.schema');
const userClassMethods = require('./user.classMethods');
const userInstanceMethods = require('./user.instanceMethods');

class User {
    getDefinition(sequelize, DataTypes) {
        let schema = userSchema.getSchema(DataTypes);
        let classMethods = userClassMethods.getClassMethods(DataTypes);
        let instanceMethods = userInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true, individualHooks: true };
        return sequelize.define('users', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let user = new User();
    return user.getDefinition(sequelize, DataTypes);
}