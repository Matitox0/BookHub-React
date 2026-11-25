export default function QuantySelector({ id, value, onChange }) {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label small me-2">
        Cantidad:
      </label>
      <input
        type="number"
        id={id}
        className="form-control form-control-sm input-cantidad d-inline-block"
        style={{ width: '80px' }}
        value={value}
        min="1"
        onChange={onChange}
      />
    </div>
  );
}
