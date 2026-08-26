import { useState, useEffect } from "react";

// Agora a tela recebe quem está logado como parâmetro!
function NovaReserva({ usuarioLogado }) {
  const [laboratorioId, setLaboratorioId] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    const buscarLabs = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/laboratorios");
        const dados = await resposta.json();
        setLaboratorios(dados);
      } catch (erro) {
        console.error(erro);
      }
    };
    buscarLabs();
  }, []);

  const realizarReserva = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuarioLogado.id, // Pega o ID automaticamente!
          laboratorio_id: laboratorioId,
          data_inicio: dataInicio,
          data_fim: dataFim,
          descricao: descricao || null,
        }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem("Reserva confirmada com sucesso!");
        setSucesso(true);
        setLaboratorioId("");
        setDataInicio("");
        setDataFim("");
        setDescricao("");
      } else {
        setMensagem(`Erro: ${dados.erro}`);
        setSucesso(false);
      }
    } catch (erro) {
      setMensagem("Erro ao conectar.");
      setSucesso(false);
    }
  };

  return (
    <div className="card">
      <h2>Agendar Laboratório</h2>
      {/* Mostra de quem é a reserva */}
      <p className="subtitulo">
        Reservando em nome de: <strong>{usuarioLogado.nome}</strong>
      </p>

      <form onSubmit={realizarReserva} className="formulario">
        <div className="grupo-input">
          <label>Escolha o Laboratório</label>
          <select
            value={laboratorioId}
            onChange={(e) => setLaboratorioId(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          >
            <option value="">Selecione...</option>
            {laboratorios.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.nome} (Cap: {lab.capacidade})
              </option>
            ))}
          </select>
        </div>
        <div className="grupo-input">
          <label>Início da Reserva</label>
          <input
            type="datetime-local"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            required
          />
        </div>
        <div className="grupo-input">
          <label>Fim da Reserva</label>
          <input
            type="datetime-local"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            required
          />
        </div>
        <div className="grupo-input">
          <label>Descrição (Opcional)</label>
          <input
            type="text"
            placeholder="Ex: Aula de Redes"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <button type="submit" className="botao-primario">
          Confirmar Reserva
        </button>
      </form>
      {mensagem && (
        <div className={`mensagem ${sucesso ? "sucesso" : "erro"}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default NovaReserva;
