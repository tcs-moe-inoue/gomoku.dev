import "./SizeSelector.css";

export default function SizeSelector({ layoutOptions }) {
  return (
    <div className="controls">
      {layoutOptions.map(({ value, options, onChange, label, keyPrefix }) => (
        <label key={`${keyPrefix}-${value}`}>
          {label}:
          <select
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
          >
            {options.map((val) => (
              <option key={`${keyPrefix}-${val}`} value={val}>
                {val}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
