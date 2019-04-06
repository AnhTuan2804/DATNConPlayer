const priceOnTimeSchema = require('./price_on_time.schema');
const priceOnTimeClassMethods = require('./price_on_time.classMethods');
const priceOnTimeInstanceMethods = require('./price_on_time.instanceMethods');

class PriceOnTime {
    getDefinition(sequelize, DataTypes) {
        let schema = priceOnTimeSchema.getSchema(DataTypes);
        let classMethods = priceOnTimeClassMethods.getClassMethods(DataTypes);
        let instanceMethods = priceOnTimeInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('price_on_time', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let priceOnTime = new PriceOnTime();
    return priceOnTime.getDefinition(sequelize, DataTypes);
}