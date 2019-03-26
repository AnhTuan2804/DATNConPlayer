class UsersSchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fullname: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.STRING
            },
            token: {
                type: DataTypes.STRING(5000),
            },
            is_lock: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            is_delete: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            created_by: {
                type: DataTypes.STRING
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            },
            role_id: {
                type: DataTypes.UUID
            }
        };
    }
}

module.exports = new UsersSchema();