const express = require("express");
const roleService = require("../services/role-service");

const roleRouter = express.Router();

roleRouter.post("/", roleService.criaRole);

roleRouter.get("/todos", roleService.retornaTodasRoles);

roleRouter.get("/:id", roleService.retornaRolePorId);

roleRouter.put("/:id", roleService.atualizaRole);

roleRouter.delete("/:id", roleService.deletaRole);

module.exports = roleRouter;
