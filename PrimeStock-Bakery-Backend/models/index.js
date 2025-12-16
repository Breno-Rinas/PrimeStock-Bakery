const sequelize = require('../config/localConnection');
const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;

const Product = require('./product')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);
const ShoppingList = require('./shopping_list')(sequelize, DataTypes);

const models = {
  Product,
  User,
  Role,
  ShoppingList,
};

Object.keys(models).forEach((modelName) => {
  if (typeof models[modelName].associate === 'function') {
    models[modelName].associate(models);
  }
});

module.exports = models;
