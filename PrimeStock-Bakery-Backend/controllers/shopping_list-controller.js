const express = require("express");
const shoppingService = require("../services/shopping_list-service");

const shoppingRouter = express.Router();

// POST /shopping-list - Criar novo item na lista
shoppingRouter.post("/", shoppingService.criaShoppingItem);

// GET /shopping-list/todos - Retornar todos os itens
shoppingRouter.get("/todos", shoppingService.retornaTodasShoppingLists);

// GET /shopping-list/:id - Retornar item por ID
shoppingRouter.get("/:id", shoppingService.retornaShoppingItemPorId);

// PUT /shopping-list/:id - Atualizar item
shoppingRouter.put("/:id", shoppingService.atualizaShoppingItem);

// DELETE /shopping-list/:id - Deletar item
shoppingRouter.delete("/:id", shoppingService.deletaShoppingItem);

module.exports = shoppingRouter;
