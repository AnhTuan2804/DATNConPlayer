const areaSchema = require('./area.schema');
const areaClassMethods = require('./area.classMethods');
const areaInstanceMethods = require('./area.instanceMethods');

class Area {
    getDefinition(sequelize, DataTypes) {
        let schema = areaSchema.getSchema(DataTypes);
        let classMethods = areaClassMethods.getClassMethods(DataTypes);
        let instanceMethods = areaInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('area', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let area = new Area();
    return area.getDefinition(sequelize, DataTypes);
}