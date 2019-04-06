class TeamSchema {
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
            age_min: {
                type: DataTypes.INTEGER,
            },
            age_max: {
                type: DataTypes.INTEGER,
            },
            description: {
                type: DataTypes.STRING,
            },
            picture: {
                type: DataTypes.STRING,
            },
            id_level: {
                type: DataTypes.STRING,
            },
            id_area: {
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

module.exports = new TeamSchema();