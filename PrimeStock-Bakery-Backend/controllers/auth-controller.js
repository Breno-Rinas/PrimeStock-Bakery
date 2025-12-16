const express = require("express");
const passport = require("passport");
const authService = require("../services/auth-service");

const authRouter = express.Router();

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = authService.gerarToken(req.user);
    res.json({ message: "Login successful", token, user: { id: req.user.id, email: req.user.email, name: req.user.name, role_id: req.user.role_id } });
  },
);

authRouter.post("/register", async (req, res) => {
  try {
    const created = await authService.criarNovoUsuario({ username: req.body.username, passwd: req.body.password, nome: req.body.name, role_id: req.body.role_id });
    res.status(201).json({ id: created.id, email: created.email, name: created.name });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(400).json({ message: "Erro ao criar usuário" });
  }
});

authRouter.get("/me", authService.requireJWTAuth, async (req, res) => {
  try {
    const user = req.user;
    const permissions = await authService.obterPermissoesUsuario(user);
    res.json({ user: { id: user.id, name: user.name, email: user.email, role_id: user.role_id }, permissions });
  } catch (err) {
    console.error("Erro em /me:", err);
    res.status(500).json({ message: "Erro interno" });
  }
});

module.exports = authRouter;
