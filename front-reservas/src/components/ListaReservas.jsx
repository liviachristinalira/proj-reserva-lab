import { useState, useEffect } from "react";

function ListaReservas() {
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscarReservas();
  }, []);

  const buscarReservas = async () => {
    setCarregando(true);
    try {
      const resposta = await fetch("http://localhost:3000/reservas");
      const dados = await resposta.json();
      setReservas(dados);
    } catch (erro) {
      console.error("Erro ao buscar reservas:", erro);
    } finally {
      setCarregando(false);
    }
  };

  const cancelarReserva = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar esta reserva?",
    );
    if (!confirmar) return;

    try {
      // OLHA A MÁGICA AQUI: adicionamos o /cancelar no final da URL!
      const resposta = await fetch(
        `http://localhost:3000/reservas/${id}/cancelar`,
        {
          method: "PATCH",
        },
      );

      if (resposta.ok) {
        alert("Reserva cancelada com sucesso!");
        buscarReservas(); // Atualiza a lista instantaneamente
      } else {
        const dados = await resposta.json();
        alert(`Erro: ${dados.erro}`);
      }
    } catch (erro) {
      alert("Erro ao conectar com o servidor para cancelar.");
    }
  };

  return (
    <div className="card">
      <h2>Reservas Agendadas</h2>
      <p className="subtitulo">Confira o cronograma dos laboratórios</p>

      {carregando ? (
        <p style={{ textAlign: "center" }}>Carregando reservas...</p>
      ) : (
        <div className="grid-laboratorios">
          {reservas.length === 0 ? (
            <p>Nenhuma reserva encontrada.</p>
          ) : (
            reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="item-laboratorio"
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <h3>
                    {reserva.laboratorio_nome ||
                      `Lab ID: ${reserva.laboratorio_id}`}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor:
                          reserva.status === "confirmada"
                            ? "#d1fae5"
                            : "#fee2e2",
                        color:
                          reserva.status === "confirmada"
                            ? "#065f46"
                            : "#991b1b",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {reserva.status.toUpperCase()}
                    </span>

                    {/* Botão de Cancelar - Só aparece se a reserva estiver ativa/confirmada */}
                    {reserva.status === "confirmada" && (
                      <button
                        onClick={() => cancelarReserva(reserva.id)}
                        style={{
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>

                <p>
                  <strong>Início:</strong>{" "}
                  {new Date(reserva.data_inicio).toLocaleString("pt-BR")}
                </p>
                <p>
                  <strong>Fim:</strong>{" "}
                  {new Date(reserva.data_fim).toLocaleString("pt-BR")}
                </p>
                {reserva.descricao && (
                  <p>
                    <strong>Motivo:</strong> {reserva.descricao}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ListaReservas;
