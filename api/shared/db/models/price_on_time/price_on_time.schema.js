class PriceOnTimeSchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            time_start: {
                type: DataTypes.TIME,
            },
            time_end: {
                type: DataTypes.TIME,
            },
            price: {
                type: DataTypes.FLOAT,
            },
            id_date_of_week: {
                type: DataTypes.VARCHAR,
            },
            id_sub_gridiron: {
                type: DataTypes.VARCHAR,
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

module.exports = new PriceOnTimeSchema();