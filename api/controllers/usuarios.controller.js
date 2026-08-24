const pool = require("../db/pool");
const bcrypt = require("bcrypt"); // 1. Importando o bcrypt

async function criarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      erro: 'Campos "nome", "email" e "senha" são obrigatórios.',
    });
  }

  try {
    const usuarioExistente = await pool.query(
      `SELECT id FROM usuarios WHERE email = $1`,
      [email],
    );

    if (usuarioExistente.rows.length > 0) {
      return res.status(409).json({
        erro: "Já existe um usuário cadastrado com este email.",
      });
    }

    // 2. Criptografando a senha
    // O número 10 (saltRounds) define a "força" da criptografia
    const saltos = 10;
    const senha_hash = await bcrypt.hash(senha, saltos);

    // 3. Salvando no banco com a senha protegida
    const resultado = await pool.query(
      `INSERT INTO usuarios (nome, email, senha_hash) 
       VALUES ($1, $2, $3) 
       RETURNING id, nome, email, criado_em`,
      [nome, email, senha_hash],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao criar usuário." });
  }
}

module.exports = { 
  criarUsuario,  
};
