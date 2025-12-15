const userRepository = require("../repositories/user-repository");

const retornaTodosUsers = async (req, res) => {
  try {
    const users = await userRepository.obterTodosUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.sendStatus(500);
  }
};

const criaUser = async (req, res) => {
  const { id, name, email, password, role_id } = req.body;
  try {
    if (!id || !name || !email || !password || role_id === undefined) {
      return res.status(400).json({ message: "Campos obrigatórios: id, name, email, password, role_id." });
    }
    const user = await userRepository.criarUser({ id, name, email, password, role_id });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.sendStatus(500);
  }
};

const atualizaUser = async (req, res) => {
  const { name, email, password, role_id } = req.body;
  const id = parseInt(req.params.id);
  try {
    const userAtualizado = await userRepository.atualizarUser({ id, name, email, password, role_id });
    if (userAtualizado) {
      res.status(200).json(userAtualizado);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.sendStatus(500);
  }
};

const deletaUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userRemovido = await userRepository.deletarUser({ id });
    if (userRemovido) {
      res.status(200).json({ message: "Usuário removido com sucesso.", usuario: userRemovido });
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
};

const retornaUserPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userRepository.obterUserPorId({ id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  retornaTodosUsers,
  criaUser,
  atualizaUser,
  deletaUser,
  retornaUserPorId,
};
