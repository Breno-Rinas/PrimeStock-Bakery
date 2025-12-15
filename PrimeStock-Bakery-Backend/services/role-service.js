const roleRepository = require("../repositories/role-repository");

const retornaTodasRoles = async (req, res) => {
  try {
    const roles = await roleRepository.obterTodosRoles();
    res.status(200).json({ roles });
  } catch (error) {
    console.error("Erro ao buscar roles:", error);
    res.sendStatus(500);
  }
};

const criaRole = async (req, res) => {
  const { id, name, description, permissions } = req.body;
  try {
    if (!id || !name) {
      return res.status(400).json({ message: "ID e name são obrigatórios." });
    }
    const role = await roleRepository.criarRole({ id, name, description, permissions });
    res.status(201).json(role);
  } catch (error) {
    console.error("Erro ao criar role:", error);
    res.sendStatus(500);
  }
};

const atualizaRole = async (req, res) => {
  const { name, description, permissions } = req.body;
  const id = parseInt(req.params.id);
  try {
    const roleAtualizada = await roleRepository.atualizarRole({ id, name, description, permissions });
    if (roleAtualizada) {
      res.status(200).json(roleAtualizada);
    } else {
      res.status(404).json({ message: "Role não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao atualizar role:", error);
    res.sendStatus(500);
  }
};

const deletaRole = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const roleRemovida = await roleRepository.deletarRole({ id });
    if (roleRemovida) {
      res.status(200).json({ message: "Role removida com sucesso.", role: roleRemovida });
    } else {
      res.status(404).json({ message: "Role não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao deletar role:", error);
    res.status(500).json({ message: "Erro ao deletar role" });
  }
};

const retornaRolePorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const role = await roleRepository.obterRolePorId({ id });
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: "Role não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao buscar role:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  retornaTodasRoles,
  criaRole,
  atualizaRole,
  deletaRole,
  retornaRolePorId,
};
