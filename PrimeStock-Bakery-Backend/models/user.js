"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
  tableName: "user",
      schema: "public",
      freezeTableName: true,
      timestamps: false,
    },
  );

  User.associate = function (models) {
    // Associação: cada usuário pertence a um Role (role_id)
    User.belongsTo(models.Role, { foreignKey: 'role_id', targetKey: 'id' });
  };

  return User;
};
