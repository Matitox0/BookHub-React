import { Navigate, Link, NavLink, Outlet } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import { esAdmin } from '../service/authService';

const SECCIONES = [
  { to: '/admin', label: 'Resumen', end: true },
  { to: '/admin/productos', label: 'Productos' },
  { to: '/admin/categorias', label: 'Categorías' },
  { to: '/admin/ofertas', label: 'Ofertas' },
  { to: '/admin/pedidos', label: 'Pedidos' }
];

export default function Admin({ libros, setLibros, usuarioLogueado }) {
  // El panel de administración requiere sesión iniciada
  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  // ...y además ser el administrador
  if (!esAdmin(usuarioLogueado)) {
    return (
      <MainLayout usuarioLogueado={usuarioLogueado}>
        <main className="container my-5 text-center">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <div className="card p-4 shadow-sm border-danger">
                <h2 className="text-danger h4">Acceso restringido</h2>
                <p className="mb-0">Solo el administrador puede gestionar el panel.</p>
                <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    );
  }

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main className="container my-4">
        <h1 className="h3 mb-4">Panel de Administración</h1>

        <div className="row g-4">
          <aside className="col-12 col-lg-3">
            <nav className="list-group shadow-sm">
              {SECCIONES.map((seccion) => (
                <NavLink
                  key={seccion.to}
                  to={seccion.to}
                  end={seccion.end}
                  className={({ isActive }) =>
                    `list-group-item list-group-item-action${isActive ? ' active' : ''}`
                  }
                >
                  {seccion.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          <section className="col-12 col-lg-9">
            <Outlet context={{ libros, setLibros }} />
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
