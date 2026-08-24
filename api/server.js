// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const laboratoriosRoutes = require("./routes/laboratorios.routes");
const reservasRoutes = require("./routes/reservas.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Necessário para o Express conseguir ler JSON no corpo das requisições (req.body)
app.use(express.json());

app.use(cors());

// Monta as rotas em seus respectivos prefixos
app.use("/laboratorios", laboratoriosRoutes);
app.use("/reservas", reservasRoutes);

// Rota simples de teste, útil pra confirmar que a API está no ar
app.get("/", (req, res) => {
  res.json({ status: "API do sistema de reserva de laboratórios está no ar." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Importe a rota lá no topo do arquivo
const usuariosRoutes = require("./routes/usuarios.routes");

// Adicione junto com os outros app.use(...)
app.use("/usuarios", usuariosRoutes);