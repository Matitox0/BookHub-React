export default function FormField({ label, id, type = 'text', value, onChange, placeholder, required = false }) {
  return (
    <div className="campo-form mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type={type}
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
