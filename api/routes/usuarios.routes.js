const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");

router.post("/", usuariosController.criarUsuario);
router.get("/", usuariosController.listarUsuarios);
// Nova rota de login!
router.post("/login", usuariosController.fazerLogin);

module.exports = router;
