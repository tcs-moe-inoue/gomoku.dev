import { useState } from 'react';
import Square from './Square';
import { calculateWinner } from '../utils/calculateWinner';

export default function Board() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  const isDraw = squares.every(square => square !== null) && !winner;

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "Draw"
      : `Next player: ${currentPlayer}`;

  function handleClick(i) {
    if (squares[i] || winner) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  return (
    <div className="board">
      <div className="status">{status}</div>

      {[0, 1, 2].map(row => (
        <div key={row} className="board-row">
          {squares.slice(row * 3, row * 3 + 3).map((value, i) => (
            <Square
              key={row * 3 + i}
              value={value}
              onSquareClick={() => handleClick(row * 3 + i)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}