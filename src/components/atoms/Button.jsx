import '../../styles/atoms/Button.css';

export default function Button({ children, type = 'button', onClick, className = 'boton', style }) {
  return (
    <button type={type} onClick={onClick} className={className} style={style}>
      {children}
    </button>

  );
}
