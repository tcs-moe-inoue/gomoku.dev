function generateLine(startRow, startCol, deltaRow, deltaCol, winLength) {
  const line = [];
  for (let i = 0; i < winLength; i++) {
    const row = startRow + i * deltaRow;
    const col = startCol + i * deltaCol;
    line.push([row, col]);
  }
  return line;
}

export function calculateWinner(squares, width, height, winLength = 3) {
  const lines = [];

  for (let row = 0; row < height; row++) {
    for (let col = 0; col <= width - winLength; col++) {
      lines.push(generateLine(row, col, 0, 1, winLength));
    }
  }

  for (let col = 0; col < width; col++) {
    for (let row = 0; row <= height - winLength; row++) {
      lines.push(generateLine(row, col, 1, 0, winLength));
    }
  }

  for (let row = 0; row <= height - winLength; row++) {
    for (let col = 0; col <= width - winLength; col++) {
      lines.push(generateLine(row, col, 1, 1, winLength));
    }
  }
  
  for (let row = 0; row <= height - winLength; row++) {
    for (let col = winLength - 1; col < width; col++) {
      lines.push(generateLine(row, col, 1, -1, winLength));
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