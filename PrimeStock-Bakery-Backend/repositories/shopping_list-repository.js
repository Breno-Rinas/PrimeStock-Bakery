const model = require("../models");

const obterTodasShoppingLists = async () => {
  return await model.ShoppingList.findAll();
};

const obterShoppingListPorId = async (item) => {
  return await model.ShoppingList.findByPk(item.id);
};

const criarShoppingListItem = async (item) => {
  await model.ShoppingList.create(item);
  return item;
};

const atualizarShoppingListItem = async (item) => {
  await model.ShoppingList.update(item, { where: { id: item.id } });
  return await model.ShoppingList.findByPk(item.id);
};

const deletarShoppingListItem = async (item) => {
  await model.ShoppingList.destroy({ where: { id: item.id } });
  return item;
};

module.exports = {
  obterTodasShoppingLists,
  obterShoppingListPorId,
  criarShoppingListItem,
  atualizarShoppingListItem,
  deletarShoppingListItem,
};
