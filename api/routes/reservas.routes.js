// routes/reservas.routes.js
const express = require("express");
const router = express.Router();
const {
  listarReservas,
  criarReserva,
  cancelarReserva,
} = require("../controllers/reservas.controller");

router.get("/", listarReservas);
router.post("/", criarReserva);
router.patch("/:id/cancelar", cancelarReserva);

module.exports = router;
