"use strict";

module.exports = (sequelize, DataTypes) => {
  const ShoppingList = sequelize.define(
    "ShoppingList",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "shopping_list",
      schema: "public",
      freezeTableName: true,
      timestamps: false,
    },
  );

  ShoppingList.associate = function (models) {
    ShoppingList.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'id' });
  };

  return ShoppingList;
};
