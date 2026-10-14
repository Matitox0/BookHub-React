export default function FormField({ label, id, type = 'text', value, onChange, placeholder, required = false }) {
  return (
    <div className="campo-form" style={{ marginBottom: '15px' }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '5px' }}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
    </div>
  );
}