const express = require("express");
const productService = require("../services/product-service");
const productRepository = require("../repositories/product-repository");

const productRouter = express.Router();

productRouter.post("/", productService.criaProduct);

productRouter.get("/todos", productService.retornaTodosProducts);
productRouter.get("/:id", productService.retornaProductPorId);

productRouter.get("/:id", productService.retornaProductPorId);

productRouter.put("/:id", productService.atualizaProduct);

productRouter.delete("/:id", productService.deletaProduct);

module.exports = productRouter;
