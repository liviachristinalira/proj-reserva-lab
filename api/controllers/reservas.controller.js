// controllers/reservas.controller.js
const pool = require("../db/pool");

// GET /reservas — lista todas as reservas (com nome do laboratório)
async function listarReservas(req, res) {
  try {
    const resultado = await pool.query(`
      SELECT r.*, l.nome AS laboratorio_nome
      FROM reservas r
      JOIN laboratorios l ON l.id = r.laboratorio_id
      ORDER BY r.data_inicio
    `);
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar reservas." });
  }
}


// POST /reservas — cria uma reserva, verificando conflito de horário antes
async function criarReserva(req, res) {
  // 1. 'descricao' adicionada na desestruturação
  const { laboratorio_id, usuario_id, data_inicio, data_fim, descricao } = req.body;

  if (!laboratorio_id || !usuario_id || !data_inicio || !data_fim) {
    return res.status(400).json({
      erro: 'Campos "laboratorio_id", "usuario_id", "data_inicio" e "data_fim" são obrigatórios.',
    });
  }

  if (new Date(data_fim) <= new Date(data_inicio)) {
    return res
      .status(400)
      .json({ erro: "data_fim deve ser posterior a data_inicio." });
  }

  try {
    // Verifica se já existe reserva confirmada que sobreponha o horário pedido
    const conflito = await pool.query(
      `SELECT id FROM reservas
       WHERE laboratorio_id = $1
         AND status = 'confirmada'
         AND data_inicio < $3
         AND data_fim > $2`,
      [laboratorio_id, data_inicio, data_fim],
    );

    if (conflito.rows.length > 0) {
      return res
        .status(409)
        .json({
          erro: "Já existe uma reserva nesse horário para este laboratório.",
        });
    }

    // 2. 'descricao' adicionada no INSERT e '$5' nos valores
    const resultado = await pool.query(
      `INSERT INTO reservas (laboratorio_id, usuario_id, data_inicio, data_fim, descricao)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [laboratorio_id, usuario_id, data_inicio, data_fim, descricao],
    );
    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao criar reserva." });
  }
}

// PATCH /reservas/:id/cancelar — cancela uma reserva existente
async function cancelarReserva(req, res) {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      `UPDATE reservas SET status = 'cancelada' WHERE id = $1 RETURNING *`,
      [id],
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Reserva não encontrada." });
    }
    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao cancelar reserva." });
  }
}

module.exports = {
  listarReservas,
  criarReserva,
  cancelarReserva,
};
