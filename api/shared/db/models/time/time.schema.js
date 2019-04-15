class TimeSchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            time_start: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            time_end: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            },
        };
    }
}

module.exports = new TimeSchema();