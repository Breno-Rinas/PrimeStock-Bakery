const express = require("express");
const roleService = require("../services/role-service");

const roleRouter = express.Router();

// POST /role - Criar nova role
roleRouter.post("/", roleService.criaRole);

// GET /role/todos - Retornar todas as roles
roleRouter.get("/todos", roleService.retornaTodasRoles);

// GET /role/:id - Retornar role por ID
roleRouter.get("/:id", roleService.retornaRolePorId);

// PUT /role/:id - Atualizar role
roleRouter.put("/:id", roleService.atualizaRole);

// DELETE /role/:id - Deletar role
roleRouter.delete("/:id", roleService.deletaRole);

module.exports = roleRouter;
