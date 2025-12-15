"use strict";

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      permissions: {
        // armazenar como array de strings quando o dialeto suportar, ou JSON/text
        type: DataTypes.ARRAY ? DataTypes.ARRAY(DataTypes.STRING) : DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "role",
      schema: "public",
      freezeTableName: true,
      timestamps: false,
    },
  );

  Role.associate = function (models) {
    // Associação: role tem muitos usuários (User)
    Role.hasMany(models.User, { foreignKey: 'role_id', sourceKey: 'id' });
  };

  return Role;
};
