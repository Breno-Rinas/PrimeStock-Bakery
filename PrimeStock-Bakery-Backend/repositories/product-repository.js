const model = require("../models");
const { Op } = require('sequelize');

const obterTodosProducts = async () => {
  return await model.Product.findAll();
};

const obterProductPorId = async (product) => {
  return await model.Product.findByPk(product.id);
};

const obterProductPorName = async (product) => {
  return await model.Product.findOne({ where: { name: { [Op.iLike]: product.name } } });
};

const criarProduct = async (product) => {
  try {
    console.log('product-repository: criando produto no DB ->', product);
    const created = await model.Product.create(product);
    console.log('product-repository: criado ->', created && created.toJSON ? created.toJSON() : created);
    return created;
  } catch (err) {
    console.error('product-repository: erro ao criar produto ->', err);
    throw err;
  }
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
  obterProductPorName,
  criarProduct,
  atualizarProduct,
  deletarProduct,
};
