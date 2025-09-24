export default function Square({ value, onSquareClick }) {
  return (
    <button type="button" className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
