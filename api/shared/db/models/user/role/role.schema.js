class RoleSchema {
    getSchema(DataTypes) {
        return {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        };
    }
}

module.exports = new RoleSchema();