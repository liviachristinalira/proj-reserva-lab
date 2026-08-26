import { useState, useEffect } from "react";
import "./App.css";

import CadastroUsuario from "./components/CadastroUsuario";
import ListaLaboratorios from "./components/ListaLaboratorios";
import NovaReserva from "./components/NovaReserva";
import ListaReservas from "./components/ListaReservas";
import LoginUsuario from "./components/LoginUsuario"; // Importa o novo componente!

function App() {
  const [telaAtual, setTelaAtual] = useState("login");
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Assim que o App abre, ele verifica se tem alguém salvo na memória do navegador
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario_reserva_lab");
    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    }
  }, []);

  // Função para salvar o login
  const fazerLogin = (usuario) => {
    setUsuarioLogado(usuario);
    localStorage.setItem("usuario_reserva_lab", JSON.stringify(usuario));
    setTelaAtual("reservas"); // Leva pra tela de reservas logo após logar
  };

  // Função para deslogar
  const fazerLogout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem("usuario_reserva_lab");
    setTelaAtual("login");
  };

  return (
    <div className="container-principal">
      <div className="conteudo-app">
        {/* Cabeçalho de Boas-vindas (Só aparece se estiver logado) */}
        {usuarioLogado && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "15px 20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#374151" }}>
              Olá, {usuarioLogado.nome} 👋
            </span>
            <button
              onClick={fazerLogout}
              style={{
                backgroundColor: "#fee2e2",
                color: "#991b1b",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sair
            </button>
          </div>
        )}

        <nav className="menu" style={{ flexWrap: "wrap" }}>
          {/* Se NÃO tiver logado, mostra o botão de Entrar */}
          {!usuarioLogado && (
            <button
              className={telaAtual === "login" ? "ativo" : ""}
              onClick={() => setTelaAtual("login")}
            >
              Entrar
            </button>
          )}

          <button
            className={telaAtual === "laboratorios" ? "ativo" : ""}
            onClick={() => setTelaAtual("laboratorios")}
          >
            Laboratórios
          </button>

          {/* Se estiver logado, libera os botões de reserva */}
          {usuarioLogado && (
            <>
              <button
                className={telaAtual === "reservas" ? "ativo" : ""}
                onClick={() => setTelaAtual("reservas")}
              >
                Nova Reserva
              </button>
              <button
                className={telaAtual === "listagem-reservas" ? "ativo" : ""}
                onClick={() => setTelaAtual("listagem-reservas")}
              >
                Ver Reservas
              </button>
            </>
          )}
        </nav>

        {/* TELAS */}
        {telaAtual === "login" && <LoginUsuario onLogin={fazerLogin} />}
        {telaAtual === "laboratorios" && <ListaLaboratorios />}

        {/* Passando o usuário logado para a tela de reservas */}
        {telaAtual === "reservas" && usuarioLogado && (
          <NovaReserva usuarioLogado={usuarioLogado} />
        )}
        {telaAtual === "listagem-reservas" && usuarioLogado && (
          <ListaReservas />
        )}
      </div>
    </div>
  );
}

export default App;
