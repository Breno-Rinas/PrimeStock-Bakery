const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const productRouter = require("./controllers/product-controller");
const shoppingListRouter = require("./controllers/shopping_list-controller");
const userRouter = require("./controllers/user-controller");
const roleRouter = require("./controllers/role-controller");
const authRouter = require("./controllers/auth-controller");
const authService = require("./services/auth-service");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
	session({
		secret: process.env.SESSION_SECRET || "esse_e_o_segredo",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false },
	}),
);

app.use(passport.initialize());
app.use(passport.session());

authService.configureLocalStrategy();
authService.configureJwtStrategy();
authService.configureSerialization();

const PORT = 3002;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}.`));

app.use("/auth", authRouter);

app.use("/product", authService.requireJWTAuth, productRouter);
app.use("/shopping-list", authService.requireJWTAuth, shoppingListRouter);
app.use("/user", authService.requireJWTAuth, userRouter);
app.use("/role", authService.requireJWTAuth, roleRouter);
