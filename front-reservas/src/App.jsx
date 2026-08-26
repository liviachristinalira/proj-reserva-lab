import { useState } from "react";
import "./App.css";

// Importando todos os componentes
import CadastroUsuario from "./components/CadastroUsuario";
import ListaLaboratorios from "./components/ListaLaboratorios";
import NovaReserva from "./components/NovaReserva";
import ListaReservas from "./components/ListaReservas";

function App() {
  const [telaAtual, setTelaAtual] = useState("cadastro");

  return (
    <div className="container-principal">
      <div className="conteudo-app">
        {/* Menu de Navegação */}
        <nav className="menu" style={{ flexWrap: "wrap" }}>
          <button
            className={telaAtual === "cadastro" ? "ativo" : ""}
            onClick={() => setTelaAtual("cadastro")}
          >
            Usuários
          </button>
          <button
            className={telaAtual === "laboratorios" ? "ativo" : ""}
            onClick={() => setTelaAtual("laboratorios")}
          >
            Laboratórios
          </button>
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
        </nav>

        {/* Renderização Condicional Limpa */}
        {telaAtual === "cadastro" && <CadastroUsuario />}
        {telaAtual === "laboratorios" && <ListaLaboratorios />}
        {telaAtual === "reservas" && <NovaReserva />}
        {telaAtual === "listagem-reservas" && <ListaReservas />}
      </div>
    </div>
  );
}

export default App;
