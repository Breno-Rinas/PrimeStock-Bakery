const express = require("express");
const cors = require("cors");

// Rotas mantidas
const productRouter = require("./controllers/product-controller");
const shoppingListRouter = require("./controllers/shopping_list-controller");
const userRouter = require("./controllers/user-controller");
const roleRouter = require("./controllers/role-controller");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3002;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}.`));

// Rotas exposas pelo servidor (manter apenas as solicitadas)
app.use("/product", productRouter);
app.use("/shopping-list", shoppingListRouter);
app.use("/user", userRouter);
app.use("/role", roleRouter);
