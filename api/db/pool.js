// db/pool.js
// Centraliza a conexão com o Postgres num "pool" — um conjunto de conexões
// reutilizáveis, mais eficiente do que abrir/fechar uma conexão a cada query.

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Testa a conexão assim que o servidor sobe, pra dar erro cedo
// se algo estiver errado (banco fora do ar, credenciais erradas etc)
pool
  .connect()
  .then((client) => {
    console.log("Conectado ao Postgres com sucesso.");
    client.release();
  })
  .catch((err) => {
    console.error("Erro ao conectar no Postgres:", err.message);
  });

module.exports = pool;
