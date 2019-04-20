class LevelSchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            size_gridiron_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            gridiron_id: {
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

module.exports = new LevelSchema();