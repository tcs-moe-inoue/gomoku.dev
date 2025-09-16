import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  return (
    <div className="board">
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
