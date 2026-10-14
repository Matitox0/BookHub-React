import { Link } from 'react-router-dom';

export default function Header({ usuarioLogueado }) {
  return (
    <header>
      <Link to="/" className="logo">BookHub</Link>
      <nav style={{ display: 'flex', gap: '15px' }}>
        <Link to="/">Inicio</Link>
        <Link to="/cart">Carrito de Compras</Link>
        <Link to="/admin">Administrador</Link>
        <Link to="/login" id="linkPerfil">
          {usuarioLogueado ? 'Mi Perfil' : 'Acceder / Registrarse'}
        </Link>
      </nav>
    </header>
  );
}