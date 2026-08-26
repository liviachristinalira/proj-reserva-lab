import { useState, useEffect } from "react";

function ListaLaboratorios() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Executa assim que a tela de laboratórios é aberta
  useEffect(() => {
    buscarLaboratorios();
  }, []);

  const buscarLaboratorios = async () => {
    setCarregando(true);
    try {
      const resposta = await fetch("http://localhost:3000/laboratorios");
      const dados = await resposta.json();
      setLaboratorios(dados);
    } catch (erro) {
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="card">
      <h2>Laboratórios Disponíveis</h2>
      <p className="subtitulo">Confira os espaços que podem ser reservados</p>

      {carregando ? (
        <p style={{ textAlign: "center" }}>Carregando laboratórios...</p>
      ) : (
        <div className="grid-laboratorios">
          {laboratorios.length === 0 ? (
            <p>Nenhum laboratório encontrado.</p>
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
