class TeamUserSchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            is_captain: {
                type: DataTypes.INTEGER,
            },
            user_id: {
                type: DataTypes.STRING,
            },
            team_id: {
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

module.exports = new TeamUserSchema();