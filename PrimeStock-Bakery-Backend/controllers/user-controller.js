const express = require("express");
const userService = require("../services/user-service");

const userRouter = express.Router();

// POST /user - Criar novo usuário
userRouter.post("/", userService.criaUser);

// GET /user/todos - Retornar todos os usuários
userRouter.get("/todos", userService.retornaTodosUsers);

// GET /user/:id - Retornar usuário por ID
userRouter.get("/:id", userService.retornaUserPorId);

// PUT /user/:id - Atualizar usuário
userRouter.put("/:id", userService.atualizaUser);

// DELETE /user/:id - Deletar usuário
userRouter.delete("/:id", userService.deletaUser);

module.exports = userRouter;
