const model = require("../models");

const obterTodosRoles = async () => {
  return await model.Role.findAll();
};

const obterRolePorId = async (role) => {
  return await model.Role.findByPk(role.id);
};

const criarRole = async (role) => {
  await model.Role.create(role);
  return role;
};

const atualizarRole = async (role) => {
  await model.Role.update(role, { where: { id: role.id } });
  return await model.Role.findByPk(role.id);
};

const deletarRole = async (role) => {
  await model.Role.destroy({ where: { id: role.id } });
  return role;
};

module.exports = {
  obterTodosRoles,
  obterRolePorId,
  criarRole,
  atualizarRole,
  deletarRole,
};
