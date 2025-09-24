import { useState } from 'react';
import Square from './Square';
import { calculateWinner } from '../utils/calculateWinner';

const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 6;
const winLength = BOARD_WIDTH;

export default function Board() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [squares, setSquares] = useState(
    Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null))
  );

  const winner = calculateWinner(squares, BOARD_WIDTH, BOARD_HEIGHT, winLength);
  const isDraw = squares.flat().every(square => square !== null) && !winner;

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "Draw"
      : `Next player: ${currentPlayer}`;

  function handleClick(row, col) {
    if (squares[row][col] || winner) return;
    
    const nextSquares = squares.map((r, rowIndex) =>
      rowIndex === row ? [...r] : [...r]
    );
      nextSquares[row][col] = currentPlayer;
    setSquares(nextSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function renderRow(rowIndex) {
    return (
      <div key={rowIndex} className="board-row">
        {squares[rowIndex].map((value, colIndex) => (
          <Square
            key={`square-${rowIndex}-${colIndex}`}
            value={value}
            onSquareClick={() => handleClick(rowIndex, colIndex)}
          />
        ))}
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