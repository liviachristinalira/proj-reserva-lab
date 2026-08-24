const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");

// POST /usuarios - Rota para criar um novo usuário
router.post("/", usuariosController.criarUsuario);

// GET /usuarios - Rota para listar todos os usuários
router.get("/", usuariosController.listarUsuarios);

module.exports = router;
