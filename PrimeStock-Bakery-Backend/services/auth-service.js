const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models");

const SECRET = process.env.JWT_SECRET || "your-secret-key";

const configureLocalStrategy = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await model.User.findOne({ where: { email: username } });

          if (!user) return done(null, false, { message: "Usuário incorreto." });

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return done(null, user);
          }

          return done(null, false, { message: "Senha incorreta." });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};

const configureJwtStrategy = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET,
      },
      async (payload, done) => {
        try {
          const user = await model.User.findByPk(payload.id);
          if (user) done(null, user);
          else done(null, false);
        } catch (error) {
          done(error, false);
        }
      },
    ),
  );
};

const configureSerialization = () => {
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, { id: user.id, email: user.email });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

const criarNovoUsuario = async ({ username, passwd, nome, role_id = 2 }) => {
  const saltRounds = 10;
  const userEmail = username;
  const userName = nome || userEmail;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPasswd = bcrypt.hashSync(passwd, salt);

  const created = await model.User.create({
    name: userName,
    email: userEmail,
    password: hashedPasswd,
    role_id,
  });

  return created;
};

const gerarToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role_id: user.role_id }, SECRET, { expiresIn: "1h" });
};

const requireJWTAuth = passport.authenticate("jwt", { session: false });

const obterPermissoesUsuario = async (user) => {
  try {
    if (!user || !user.role_id) return [];
    const role = await model.Role.findByPk(user.role_id);
    if (!role) return [];
    const perms = role.permissions || [];
    return Array.isArray(perms) ? perms : [];
  } catch (err) {
    console.error("Erro ao obter permissões:", err);
    return [];
  }
};

module.exports = {
  configureLocalStrategy,
  configureJwtStrategy,
  configureSerialization,
  criarNovoUsuario,
  gerarToken,
  requireJWTAuth,
  obterPermissoesUsuario,
};
