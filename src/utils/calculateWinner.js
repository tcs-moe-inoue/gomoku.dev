function generateLine(startRow, startCol, deltaRow, deltaCol, width, winLength) {
  const line = [];
  for (let i = 0; i < winLength; i++) {
    const row = startRow + i * deltaRow;
    const col = startCol + i * deltaCol;
    line.push(row * width + col);
  }
  return line;
}

export function calculateWinner(squares, width, height, winLength = 3) {
  const lines = [];

  for (let row = 0; row < height; row++) {
    for (let col = 0; col <= width - winLength; col++) {
      lines.push(generateLine(row, col, 0, 1, width, winLength));
    }
  }

  for (let col = 0; col < width; col++) {
    for (let row = 0; row <= height - winLength; row++) {
      lines.push(generateLine(row, col, 1, 0, width, winLength));
    }
  }

  for (let row = 0; row <= height - winLength; row++) {
    for (let col = 0; col <= width - winLength; col++) {
      lines.push(generateLine(row, col, 1, 1, width, winLength));
    }
  }
  
  for (let row = 0; row <= height - winLength; row++) {
    for (let col = winLength - 1; col < width; col++) {
      lines.push(generateLine(row, col, 1, -1, width, winLength));
    }
  }

  for (let line of lines) {
    const first = squares[line[0]];
    if (first && line.every(index => squares[index] === first)) {
      return first;
    }
  }

  return null;
}