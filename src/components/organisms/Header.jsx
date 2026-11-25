import { useState } from 'react';
import { Link } from 'react-router-dom';
import { esAdmin } from '../../service/authService';
import "../../styles/Header.css";

export default function Header({ usuarioLogueado }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">BookHub</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setAbierto(!abierto)}
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={abierto ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'}>
          <nav className="navbar-nav ms-auto">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/categorias" className="nav-link">Categorías</Link>
            <Link to="/ofertas" className="nav-link">Ofertas</Link>
            <Link to="/cart" className="nav-link">Carrito de Compras</Link>
            {esAdmin(usuarioLogueado) && (
              <Link to="/admin" className="nav-link">Administrador</Link>
            )}
            <Link to="/login" id="linkPerfil" className="nav-link">
              {usuarioLogueado ? 'Mi Perfil' : 'Acceder / Registrarse'}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
