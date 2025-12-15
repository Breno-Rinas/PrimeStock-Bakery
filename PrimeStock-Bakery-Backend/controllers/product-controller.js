const express = require("express");
const productService = require("../services/product-service");

const productRouter = express.Router();

// POST /product - Criar novo produto
productRouter.post("/", productService.criaProduct);

// GET /product/todos - Retornar todos os produtos
productRouter.get("/todos", productService.retornaTodosProducts);

// GET /product/:id - Retornar produto por ID
productRouter.get("/:id", productService.retornaProductPorId);

// PUT /product/:id - Atualizar produto
productRouter.put("/:id", productService.atualizaProduct);

// DELETE /product/:id - Deletar produto
productRouter.delete("/:id", productService.deletaProduct);

module.exports = productRouter;
