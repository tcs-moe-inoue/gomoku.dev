import { useState } from "react";
import Square from "./Square";
import SizeSelector from "./SizeSelector";
import { calculateWinner } from "../utils/calculateWinner";

const MIN_SIZE = 3;
const MAX_SIZE = 10;

function createEmptyBoard(width, height) {
  return Array.from({ length: height }, () => Array(width).fill(null));
}

export default function Board() {
  const [width, setWidth] = useState(MIN_SIZE);
  const [height, setHeight] = useState(MIN_SIZE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [squares, setSquares] = useState(createEmptyBoard(MIN_SIZE, MIN_SIZE));

  const sizeOptions = Array.from({ length: MAX_SIZE - MIN_SIZE + 1 }, (_, i) => MIN_SIZE + i);
  const winner = calculateWinner(squares, width, height);
  const isDraw = squares.flat().every((square) => square !== null) && !winner;

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "Draw"
      : `Next player: ${currentPlayer}`;

  function handleClick(row, col) {
    if (squares[row][col] || winner) return;

    const nextSquares = squares.map((r) => [...r]);
    nextSquares[row][col] = currentPlayer;
    setSquares(nextSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function handleSizeChange(newWidth, newHeight) {
    setWidth(newWidth);
    setHeight(newHeight);
    setCurrentPlayer("X");
    setSquares(createEmptyBoard(newWidth, newHeight));
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
    <div className="board-container">
      <SizeSelector width={width} height={height} sizeOptions={sizeOptions} onSizeChange={handleSizeChange} />

      <div className="status">{status}</div>

      <div className="board">{Array.from({ length: height }, (_, row) => renderRow(row))}</div>
    </div>
  );
}