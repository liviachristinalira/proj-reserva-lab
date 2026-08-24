// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const laboratoriosRoutes = require("./routes/laboratorios.routes");
const reservasRoutes = require("./routes/reservas.routes");
const usuariosRoutes = require("./routes/usuarios.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Necessário para o Express conseguir ler JSON no corpo das requisições (req.body)



// Monta as rotas em seus respectivos prefixos
app.use("/laboratorios", laboratoriosRoutes);
app.use("/reservas", reservasRoutes);
app.use("/usuarios", usuariosRoutes);

// Rota simples de teste, útil pra confirmar que a API está no ar
app.get("/", (req, res) => {
  res.json({ status: "API do sistema de reserva de laboratórios está no ar." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});