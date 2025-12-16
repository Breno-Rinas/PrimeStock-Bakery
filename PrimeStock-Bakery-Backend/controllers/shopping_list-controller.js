const express = require("express");
const shoppingService = require("../services/shopping_list-service");

const shoppingRouter = express.Router();

shoppingRouter.post("/", shoppingService.criaShoppingItem);

shoppingRouter.get("/todos", shoppingService.retornaTodasShoppingLists);

shoppingRouter.get("/:id", shoppingService.retornaShoppingItemPorId);

shoppingRouter.put("/:id", shoppingService.atualizaShoppingItem);

shoppingRouter.delete("/:id", shoppingService.deletaShoppingItem);

module.exports = shoppingRouter;
