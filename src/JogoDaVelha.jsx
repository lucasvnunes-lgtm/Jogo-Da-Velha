import React, { useState, useEffect } from "react";
import "./JogoDaVelha.css";
import video from "./midia/tutorial.mp4";
import imagem from "./midia/exemplo.jpg";

export default function JogoDaVelha() {
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));
  const [xProximo, setXProximo] = useState(true);
  const [todosTimes, setTimesGeral] = useState([]);
  const [busca, setBusca] = useState("");
  const [ladosTimes, setTimes] = useState(["X", "O"]);
  const vencedor = calcularVencedor(quadrados);
  const [iconeTrocado, setTrocaIcone] = useState(true);

  // Buscar times quando o componente carrega
  useEffect(() => {
    ProcurarTime();
  }, []);

  function handleClick(i) {
    if (quadrados[i] || vencedor) return;
    const novo = quadrados.slice();
    novo[i] = xProximo ? "X" : "O";
    setQuadrados(novo);
    setXProximo(!xProximo);
  }

  function reiniciar() {
    setQuadrados(Array(9).fill(null));
    setXProximo(true);
  }

  async function ProcurarTime() {
    try {
      console.log("📡 Buscando todos os times...");
      const resposta = await fetch("http://localhost:4000/teams/brazil");

      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      const dados = await resposta.json();
      console.log("✅ Times recebidos:", dados.length);
      setTimesGeral(dados);
    } catch (error) {
      console.log("❌ Erro ao buscar times:", error);
      // Se der erro, carrega dados de teste
      const timesTeste = [
        { team: { id: 1, name: "Flamengo", country: "Brazil", founded: 1895 } },
        {
          team: { id: 2, name: "São Paulo", country: "Brazil", founded: 1930 },
        },
        {
          team: { id: 3, name: "Palmeiras", country: "Brazil", founded: 1914 },
        },
      ];
      setTimesGeral(timesTeste);
    }
  }

  // Filtrar times baseado na busca
  const timesFiltrados = todosTimes.filter((time) =>
    time.team.name.toLowerCase().includes(busca.toLowerCase())
  );
  function trocarImagemX(valorImagem) {
      ladosTimes[0] = valorImagem;
      setTrocaIcone(!iconeTrocado);
  }

  function trocarImagemO(valorImagem) {
      ladosTimes[1] = valorImagem;
      setTrocaIcone(!iconeTrocado);
  }

  return (
    <div className="container">
      <div className="busca-times">
        <h3>Lado X</h3>
        <h3>Times do Brasil (X)</h3>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Buscar time por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              padding: "10px",
              width: "auto",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          />
          <button onClick={ProcurarTime} className="botao-buscar">
            
          </button>
        </div>

        <div
          className="lista-times"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <strong>
            {busca ? `Times encontrados para "${busca}":` : "Todos os times:"}{" "}
            {timesFiltrados.length}
          </strong>

          {timesFiltrados.length > 0 ? (
            <div className="times-container">
              {timesFiltrados.map((time) => (
                <div
                  key={time.team.id}
                  style={{ cursor: "pointer", border: "1px solid red" }}
                  className="time-item"
                  onClick={() => {
                      alert(`Time X trocado para ${time.team.name}`)
                    trocarImagemX(time.team.logo);
                  }}
                >
                  {time.team.logo && (
                    <img
                      src={time.team.logo}
                      alt={`Logo ${time.team.name}`}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                  <strong>{time.team.name}</strong>
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhum time encontrado.</p>
          )}
        </div>
      </div>
      <div className="jogo">
        <h1>Jogo da Velha</h1>
        <div className="tabuleiro">
          {quadrados.map((valor, i) => (
            <button key={i} className="quadrado" onClick={() => handleClick(i)}>
              {valor === "X" && ladosTimes[0] && ladosTimes[0]!="X" ? (
                <img src={ladosTimes[0]} alt="Time X" width="50" />
              ) : valor === "O" && ladosTimes[1] && ladosTimes[1]!="O" ? (
                <img src={ladosTimes[1]} alt="Time O" width="50" />
              ) : (
                valor
              )}
            </button>
          ))}
        </div>
        <h2>
          {vencedor
            ? `Vencedor: ${vencedor}`
            : `Próximo jogador: ${xProximo ? "X" : "O"}`}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <button className="reiniciar" onClick={reiniciar}>
            Reiniciar
          </button>
          <button className="reiniciar" onClick={reiniciar}>
            Mudar Times
          </button>
        </div>
      </div>

      <div className="busca-times">
         <h3>Lado O</h3>
        <h3>Times do Brasil</h3>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Buscar time por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              padding: "10px",
              width: "auto",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          />
          <button onClick={ProcurarTime} className="botao-buscar">
            
          </button>
        </div>

        <div
          className="lista-times"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <strong>
            {busca ? `Times encontrados para "${busca}":` : "Todos os times:"}{" "}
            {timesFiltrados.length}
          </strong>

          {timesFiltrados.length > 0 ? (
            <div className="times-container">
              {timesFiltrados.map((time) => (
                <div
                  key={time.team.id}
                  style={{ cursor: "pointer", border: "1px solid red" }}
                  className="time-item"
                  onClick={() => {
                      alert(`Time O trocado para ${time.team.name}`)
                    trocarImagemO(time.team.logo);
                  }}
                >
                  {time.team.logo && (
                    <img
                      src={time.team.logo}
                      alt={`Logo ${time.team.name}`}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                  <strong>{time.team.name}</strong>
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhum time encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function calcularVencedor(q) {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of linhas) {
    if (q[a] && q[a] === q[b] && q[a] === q[c]) return q[a];
  }
  return null;
}
