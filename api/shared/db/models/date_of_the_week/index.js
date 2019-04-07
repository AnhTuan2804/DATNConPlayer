const dateOfTheWeekSchema = require('./date_of_the_week.schema');
const dateOfTheWeekClassMethods = require('./date_of_the_week.classMethods');
const dateOfTheWeekInstanceMethods = require('./date_of_the_week.instanceMethods');

class DateOfTheWeek {
    getDefinition(sequelize, DataTypes) {
        let schema = dateOfTheWeekSchema.getSchema(DataTypes);
        let classMethods = dateOfTheWeekClassMethods.getClassMethods(DataTypes);
        let instanceMethods = dateOfTheWeekInstanceMethods.getInstanceMethods(DataTypes);
        let options = { classMethods, instanceMethods, freezeTableName: true, underscored: true };
        return sequelize.define('date_of_the_week', schema, options);
    }
}

module.exports = (sequelize, DataTypes) => {
    let dateOfTheWeek = new DateOfTheWeek();
    return dateOfTheWeek.getDefinition(sequelize, DataTypes);
}