function generateLine(startRow, startCol, deltaRow, deltaCol, winLength) {
  const line = [];
  for (let i = 0; i < winLength; i++) {
    const row = startRow + i * deltaRow;
    const col = startCol + i * deltaCol;
    line.push([row, col]);
  }
  return line;
}

export function calculateWinner(squares, width, height) {
  const lines = [];

  const horizontalWinLength = width;
  const verticalWinLength = height;  
  const diagonalWinLength = Math.min(width, height); 

  for (let row = 0; row < height; row++) {
    for (let col = 0; col <= width - horizontalWinLength; col++) {
      lines.push(generateLine(row, col, 0, 1, horizontalWinLength));
    }
  }

  for (let col = 0; col < width; col++) {
    for (let row = 0; row <= height - verticalWinLength; row++) {
      lines.push(generateLine(row, col, 1, 0, verticalWinLength));
    }
  }

  for (let row = 0; row <= height - diagonalWinLength; row++) {
    for (let col = 0; col <= width - diagonalWinLength; col++) {
      lines.push(generateLine(row, col, 1, 1, diagonalWinLength));
    }
  }
  
  for (let row = 0; row <= height - diagonalWinLength; row++) {
    for (let col = diagonalWinLength - 1; col < width; col++) {
      lines.push(generateLine(row, col, 1, -1, diagonalWinLength));
    }
  }

  for (let line of lines) {
    const [firstRow, firstCol] = line[0];
    const first = squares[firstRow][firstCol];

    if (first && line.every(([r, c]) => squares[r][c] === first)) {
      return first;
    }
  }

  return null;
}