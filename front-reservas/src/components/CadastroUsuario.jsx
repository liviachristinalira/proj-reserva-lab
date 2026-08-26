import { useState } from "react";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemUser, setMensagemUser] = useState("");
  const [sucessoUser, setSucessoUser] = useState(false);

  const realizarCadastro = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });
      const dados = await resposta.json();
      if (resposta.ok) {
        setMensagemUser("Usuário cadastrado com sucesso!");
        setSucessoUser(true);
        setNome("");
        setEmail("");
        setSenha("");
      } else {
        setMensagemUser(`Erro: ${dados.erro}`);
        setSucessoUser(false);
      }
    } catch (erro) {
      setMensagemUser("Erro ao conectar.");
      setSucessoUser(false);
    }
  };

  return (
    <div className="card">
      <h2>Criar Conta</h2>
      <form onSubmit={realizarCadastro} className="formulario">
        <div className="grupo-input">
          <label>Nome Completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="grupo-input">
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grupo-input">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="botao-primario">
          Cadastrar
        </button>
      </form>
      {mensagemUser && (
        <div className={`mensagem ${sucessoUser ? "sucesso" : "erro"}`}>
          {mensagemUser}
        </div>
      )}
    </div>
  );
}

// Isso permite que o App.jsx consiga "puxar" esse arquivo
export default CadastroUsuario;
