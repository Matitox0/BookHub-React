export default function QuantySelector({ id, value, onChange }) {
  return (
    <div style={{ margin: '8px 0' }}>
      <label htmlFor={id} style={{ fontSize: '13px', marginRight: '5px' }}>
        Cantidad:
      </label>
      <input
        type="number"
        id={id}
        className="input-cantidad"
        value={value}
        min="1"
        onChange={onChange}
        style={{ width: '60px', padding: '4px' }}
      />
    </div>
  );
}
