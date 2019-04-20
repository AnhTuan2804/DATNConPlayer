const timeSchema = require('./career.schema');
const timeClassMethods = require('./career.classMethods');
const timeInstanceMethods = require('./career.instanceMethods');

class Time {
    getDefinition(sequelize, DataTypes) {
        let schema = timeSchema.getSchema(DataTypes);
        let classMethods = timeClassMethods.getClassMethods(DataTypes);
        let instanceMethods = timeInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('career', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let time = new Time();
    return time.getDefinition(sequelize, DataTypes);
}