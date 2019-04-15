class PriceOnTimeSchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            time_id: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.FLOAT,
            },
            size_gridiron_id: {
                type: DataTypes.STRING,
            },
            gridiron_id: {
                type: DataTypes.STRING,
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