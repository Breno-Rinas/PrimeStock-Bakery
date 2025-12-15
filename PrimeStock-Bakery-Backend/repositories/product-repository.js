const model = require("../models");

const obterTodosProducts = async () => {
  return await model.Product.findAll();
};

const obterProductPorId = async (product) => {
  return await model.Product.findByPk(product.id);
};

const criarProduct = async (product) => {
  await model.Product.create(product);
  return product;
};

const atualizarProduct = async (product) => {
  await model.Product.update(product, { where: { id: product.id } });
  return await model.Product.findByPk(product.id);
};

const deletarProduct = async (product) => {
  await model.Product.destroy({ where: { id: product.id } });
  return product;
};

module.exports = {
  obterTodosProducts,
  obterProductPorId,
  criarProduct,
  atualizarProduct,
  deletarProduct,
};
