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
            description: {
                type: DataTypes.STRING,
            },
            area_id: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            latitude: {
                type: DataTypes.STRING,
            },
            longititude: {
                type: DataTypes.STRING,
            },
            link_face: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            picture: {
                type: DataTypes.STRING,
            },
            user_id: {
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