export default function Intput({ type = 'text', id, name, value, placeholder, onChange, required = false, className = '' }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className={`form-control ${className}`}
    />
  );
}