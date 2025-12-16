const shoppingRepository = require("../repositories/shopping_list-repository");

const retornaTodasShoppingLists = async (req, res) => {
  try {
    const items = await shoppingRepository.obterTodasShoppingLists();
    res.status(200).json({ items });
  } catch (error) {
    console.error("Erro ao buscar shopping list:", error);
    res.sendStatus(500);
  }
};

const criaShoppingItem = async (req, res) => {
  try {
    const {
      id,
      product_id,
      product_name,
      product_unit = null,
      status = 'pending'
    } = req.body;

    let { quantity, priority } = req.body;

    if (!product_id || !product_name) {
      return res.status(400).json({ message: "Campos obrigatórios: product_id, product_name." });
    }

    if (quantity === undefined || quantity === null) quantity = 10;
    if (!priority) priority = 'normal';

    const itemToCreate = {
      ...(id ? { id } : {}),
      product_id,
      product_name,
      quantity,
      product_unit,
      priority,
      status
    };

    const item = await shoppingRepository.criarShoppingListItem(itemToCreate);
    res.status(201).json(item);
  } catch (error) {
    console.error("Erro ao criar item na shopping list:", error);
    res.sendStatus(500);
  }
};

const atualizaShoppingItem = async (req, res) => {
  const { product_id, product_name, quantity, product_unit, priority, status } = req.body;
  const id = parseInt(req.params.id);
  try {
    const itemAtualizado = await shoppingRepository.atualizarShoppingListItem({ id, product_id, product_name, quantity, product_unit, priority, status });
    if (itemAtualizado) {
      res.status(200).json(itemAtualizado);
    } else {
      res.status(404).json({ message: "Item não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    res.sendStatus(500);
  }
};

const deletaShoppingItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const itemRemovido = await shoppingRepository.deletarShoppingListItem({ id });
    if (itemRemovido) {
      res.status(200).json({ message: "Item removido com sucesso.", item: itemRemovido });
    } else {
      res.status(404).json({ message: "Item não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    res.status(500).json({ message: "Erro ao deletar item" });
  }
};

const retornaShoppingItemPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await shoppingRepository.obterShoppingListPorId({ id });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar item:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  retornaTodasShoppingLists,
  criaShoppingItem,
  atualizaShoppingItem,
  deletaShoppingItem,
  retornaShoppingItemPorId,
};
