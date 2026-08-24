// controllers/laboratorios.controller.js
const pool = require("../db/pool");

// GET /laboratorios — lista todos os laboratórios ou filtra por nome
async function listarLaboratorios(req, res) {
  const { nome } = req.query; // Captura o parâmetro de busca da URL

  try {
    let query = "SELECT * FROM laboratorios";
    let valores = [];

    // Adiciona o filtro dinamicamente se o usuário enviou um nome
    if (nome) {
      query += " WHERE nome ILIKE $1";
      valores.push(`%${nome}%`);
    }

    query += " ORDER BY id";

    const resultado = await pool.query(query, valores);
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar laboratórios." });
  }
}

// GET /laboratorios/:id — busca um laboratório específico
async function buscarLaboratorio(req, res) {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "SELECT * FROM laboratorios WHERE id = $1",
      [id],
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Laboratório não encontrado." });
    }
    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar laboratório." });
  }
}

// POST /laboratorios — cria um novo laboratório
async function criarLaboratorio(req, res) {
  const { nome, bloco, capacidade } = req.body;

  if (!nome || !capacidade) {
    return res
      .status(400)
      .json({ erro: 'Campos "nome" e "capacidade" são obrigatórios.' });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO laboratorios (nome, bloco, capacidade)
       VALUES ($1, $2, $3) RETURNING *`,
      [nome, bloco, capacidade],
    );
    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao criar laboratório." });
  }
}

module.exports = {
  listarLaboratorios,
  buscarLaboratorio,
  criarLaboratorio,
};
