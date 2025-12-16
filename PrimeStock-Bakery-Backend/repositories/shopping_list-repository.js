const model = require("../models");

const obterTodasShoppingLists = async () => {
  return await model.ShoppingList.findAll();
};

const obterShoppingListPorId = async (item) => {
  return await model.ShoppingList.findByPk(item.id);
};

const criarShoppingListItem = async (item) => {
  const created = await model.ShoppingList.create(item);
  return created;
};

const atualizarShoppingListItem = async (item) => {
  const { id, product_id, product_name, quantity, product_unit, priority, status } = item;
  await model.ShoppingList.update(
    { product_id, product_name, quantity, product_unit, priority, status },
    { where: { id } }
  );
  return await model.ShoppingList.findByPk(id);
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
