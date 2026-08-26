const pool = require("../db/pool");
const bcrypt = require("bcrypt");

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

    const saltos = 10;
    const senha_hash = await bcrypt.hash(senha, saltos);

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

async function listarUsuarios(req, res) {
  const { nome } = req.query;

  try {
    let query = "SELECT id, nome, email, criado_em FROM usuarios";
    let valores = [];

    if (nome) {
      query += " WHERE nome ILIKE $1";
      valores.push(`%${nome}%`);
    }

    query += " ORDER BY id";

    const resultado = await pool.query(query, valores);
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar usuários." });
  }
}

async function fazerLogin(req, res) {
  const { email, senha } = req.body;

  try {
    // 1. Busca o usuário APENAS pelo e-mail e traz o senha_hash
    const query =
      "SELECT id, nome, email, senha_hash FROM usuarios WHERE email = $1";
    const resultado = await pool.query(query, [email]);

    // Se o resultado for zero, o e-mail não existe no banco
    if (resultado.rows.length === 0) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    const usuario = resultado.rows[0];

    // 2. Compara a senha digitada limpa com o senha_hash do banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    // Se a senha não bater, barra o acesso
    if (!senhaValida) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    // 3. Remove o hash da senha do objeto antes de enviar para o React
    delete usuario.senha_hash;

    // Se achou e a senha está correta, devolve os dados do usuário para o React salvar
    res.json(usuario);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao tentar fazer login." });
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  fazerLogin,
};
