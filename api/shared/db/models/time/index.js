const timeSchema = require('./time.schema');
const timeClassMethods = require('./time.classMethods');
const timeInstanceMethods = require('./time.instanceMethods');

class Time {
    getDefinition(sequelize, DataTypes) {
        let schema = timeSchema.getSchema(DataTypes);
        let classMethods = timeClassMethods.getClassMethods(DataTypes);
        let instanceMethods = timeInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('time', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let time = new Time();
    return time.getDefinition(sequelize, DataTypes);
}