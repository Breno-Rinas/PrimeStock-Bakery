# PrimeStock-Bakery
Lista mínima de dependências e comandos para rodar (Linux)

## Frontend (PrimeStock-Bakery)
Dependências:
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- @mui/x-charts
- react
- react-dom
- react-router-dom
- vite (dev)

Comandos:
```bash
cd PrimeStock-Bakery
npm install
npm run dev
```

## Backend (PrimeStock-Bakery-Backend)
Dependências:
- express
- cors
- express-session
- passport
- passport-local
- passport-jwt
- jsonwebtoken
- bcrypt
- sequelize
- pg-promise
- @sequelize/postgres

Comandos:
```bash
cd PrimeStock-Bakery-Backend
npm install
node server.js
```

Observação: é necessário ter o PostgreSQL rodando e um banco configurado (o arquivo de conexão está em `PrimeStock-Bakery-Backend/config/localConnection.js`).
