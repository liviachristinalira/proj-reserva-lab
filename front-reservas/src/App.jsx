import { useState } from "react";
import "./App.css"; // Aqui importamos o nosso visual!

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false); // Para mudar a cor da mensagem

  const realizarCadastro = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        setSucesso(true);
        setNome("");
        setEmail("");
        setSenha("");
      } else {
        setMensagem(`Erro: ${dados.erro}`);
        setSucesso(false);
      }
    } catch (erro) {
      setMensagem("Erro ao conectar com o servidor.");
      setSucesso(false);
    }
  };

  return (
    <div className="container-principal">
      <div className="card-cadastro">
        <h2>Criar Conta</h2>
        <p className="subtitulo">Cadastre-se para acessar os laboratórios</p>

        <form onSubmit={realizarCadastro} className="formulario">
          <div className="grupo-input">
            <label>Nome Completo</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

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
              placeholder="Crie uma senha forte"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="botao-primario">
            Cadastrar
          </button>
        </form>

        {mensagem && (
          <div className={`mensagem ${sucesso ? "sucesso" : "erro"}`}>
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
