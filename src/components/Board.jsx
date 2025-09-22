import { useState } from 'react';
import Square from './Square';
import { calculateWinner } from '../utils/calculateWinner';

const BOARD_WIDTH = 3;
const BOARD_HEIGHT = 3;
const BOARD_SIZE = BOARD_WIDTH * BOARD_HEIGHT;

export default function Board() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [squares, setSquares] = useState(Array(BOARD_SIZE).fill(null));

  const winner = calculateWinner(squares, BOARD_WIDTH, BOARD_HEIGHT);
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

   function renderRow(row) {
    const start = row * BOARD_WIDTH;
    const rowSquares = squares.slice(start, start + BOARD_WIDTH);

    return (
      <div key={row} className="board-row">
        {rowSquares.map((value, col) => {
          const index = start + col;
          return (
            <Square
              key={`square-${row}-${col}`}
              value={value}
              onSquareClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="board">
      <div className="status">{status}</div>
      {Array.from({ length: BOARD_HEIGHT }, (_, row) => renderRow(row))}
    </div>
  );
}