import { useState, useEffect } from "react";

function ListaLaboratorios() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [busca, setBusca] = useState(""); // Estado para guardar o que o usuário digita

  // Busca inicial quando a tela abre
  useEffect(() => {
    buscarLaboratorios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buscarLaboratorios = async () => {
    setCarregando(true);
    try {
      // MÁGICA DO FILTRO: Se tiver texto na busca, adiciona o ?nome= na URL
      const url = busca
        ? `http://localhost:3000/laboratorios?nome=${busca}`
        : "http://localhost:3000/laboratorios";

      const resposta = await fetch(url);
      const dados = await resposta.json();
      setLaboratorios(dados);
    } catch (erro) {
      console.error("Erro ao buscar laboratórios:", erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="card">
      <h2>Laboratórios Disponíveis</h2>
      <p className="subtitulo">Confira os espaços que podem ser reservados</p>

      {/* Barra de Pesquisa */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar laboratório por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarLaboratorios()} // Permite buscar apertando Enter
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            outline: "none",
          }}
        />
        <button
          onClick={buscarLaboratorios}
          className="botao-primario"
          style={{ margin: 0 }} // Remove a margem extra do botão
        >
          Buscar
        </button>
      </div>

      {carregando ? (
        <p style={{ textAlign: "center" }}>Carregando laboratórios...</p>
      ) : (
        <div className="grid-laboratorios">
          {laboratorios.length === 0 ? (
            <p>Nenhum laboratório encontrado com esse nome.</p>
          ) : (
            laboratorios.map((lab) => (
              <div key={lab.id} className="item-laboratorio">
                <h3>{lab.nome}</h3>
                <p>
                  Capacidade: <strong>{lab.capacidade}</strong> pessoas
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ListaLaboratorios;
