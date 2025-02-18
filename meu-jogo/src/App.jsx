import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [targetPosition, setTargetPosition] = useState({ top: 0, left: 0 });
  const [gameActive, setGameActive] = useState(false);

  // Gera uma posição aleatória para o alvo
  const generateTargetPosition = () => {
    const maxWidth = window.innerWidth - 100; // 100 é o tamanho do alvo
    const maxHeight = window.innerHeight - 100;
    const top = Math.floor(Math.random() * maxHeight);
    const left = Math.floor(Math.random() * maxWidth);
    setTargetPosition({ top, left });
  };

  // Inicia o jogo
  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameActive(true);
    generateTargetPosition();
  };

  // Contador de tempo
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [gameActive, timeLeft]);

  // Clique no alvo
  const handleTargetClick = () => {
    if (gameActive) {
      setScore(score + 1);
      generateTargetPosition();
    }
  };

  return (
    <div className="App">
      <h1>Jogo do Clique no Alvo</h1>
      {!gameActive && (
        <button onClick={startGame}>Iniciar Jogo</button>
      )}
      {gameActive && (
        <>
          <p>Pontuação: {score}</p>
          <p>Tempo Restante: {timeLeft}s</p>
          <div
            className="target"
            style={{ top: targetPosition.top, left: targetPosition.left }}
            onClick={handleTargetClick}
          ></div>
        </>
      )}
    </div>
  );
}

export default App;