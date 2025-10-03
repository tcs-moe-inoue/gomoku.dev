import './SizeSelector.css';

export default function SizeSelector({ width, height, sizeOptions, onWidthChange, onHeightChange }) {
  const parseValue = (e) => parseInt(e.target.value, 10);

  const handleWidthChange = (e) => {
  onWidthChange(parseValue(e));
  };

  const handleHeightChange = (e) => {
  onHeightChange(parseValue(e));
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