const model = require("../models");

const obterTodosUsers = async () => {
  return await model.User.findAll();
};

const obterUserPorId = async (user) => {
  return await model.User.findByPk(user.id);
};

const criarUser = async (user) => {
  const created = await model.User.create(user);
  return created;
};

const atualizarUser = async (user) => {
  await model.User.update(user, { where: { id: user.id } });
  return await model.User.findByPk(user.id);
};

const deletarUser = async (user) => {
  await model.User.destroy({ where: { id: user.id } });
  return user;
};

module.exports = {
  obterTodosUsers,
  obterUserPorId,
  criarUser,
  atualizarUser,
  deletarUser,
};
