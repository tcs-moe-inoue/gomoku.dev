export default function SizeSelector({ width, height, sizeOptions, onSizeChange }) {
  const parseValue = (e) => parseInt(e.target.value, 10);

  const handleWidthChange = (e) => {
    const newWidth = parseValue(e);
    onSizeChange(newWidth, height);
  };

  const handleHeightChange = (e) => {
    const newHeight = parseValue(e);
    onSizeChange(width, newHeight);
  };

  const renderSelect = (label, value, onChange, keyPrefix) => (
    <label>
      {label}:
      <select value={value} onChange={onChange}>
        {sizeOptions.map((val) => (
          <option key={`${keyPrefix}-${val}`} value={val}>
            {val}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="controls">
      {renderSelect('Width', width, handleWidthChange, 'w')}
      {renderSelect('Height', height, handleHeightChange, 'h')}
    </div>
  );
}