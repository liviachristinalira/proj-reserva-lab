// routes/laboratorios.routes.js
const express = require("express");
const router = express.Router();
const {
  listarLaboratorios,
  buscarLaboratorio,
  criarLaboratorio,
} = require("../controllers/laboratorios.controller");

router.get("/", listarLaboratorios);
router.get("/:id", buscarLaboratorio);
router.post("/", criarLaboratorio);

module.exports = router;
