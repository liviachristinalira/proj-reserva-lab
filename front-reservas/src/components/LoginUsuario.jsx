import { useState } from "react";

function LoginUsuario({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleEntrar = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      // Agora chamamos a nossa rota nova do back-end!
      const resposta = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        // Login deu certo! Manda os dados pro App.jsx salvar
        onLogin(dados);
      } else {
        // Senha ou e-mail errados
        setMensagem(dados.erro);
      }
    } catch (erro) {
      setMensagem("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="card">
      <h2>Entrar no Sistema</h2>
      <p className="subtitulo">Digite suas credenciais para acessar</p>

      <form onSubmit={handleEntrar} className="formulario">
        <div className="grupo-input">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grupo-input">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Sua senha secreta"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="botao-primario" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {mensagem && <div className="mensagem erro">{mensagem}</div>}
    </div>
  );
}

export default LoginUsuario;
