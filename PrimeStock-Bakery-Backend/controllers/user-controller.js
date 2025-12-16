const express = require("express");
const userService = require("../services/user-service");

const userRouter = express.Router();

userRouter.post("/", userService.criaUser);

userRouter.get("/todos", userService.retornaTodosUsers);

userRouter.get("/:id", userService.retornaUserPorId);

userRouter.put("/:id", userService.atualizaUser);

userRouter.delete("/:id", userService.deletaUser);

module.exports = userRouter;
