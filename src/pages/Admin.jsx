import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import AdminForm from '../components/organisms/AdminForm';
import { dataService } from '../service/dataService';
import { esAdmin } from '../service/authService';

export default function Admin({ libros, setLibros, usuarioLogueado }) {
  const [libroId, setLibroId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [precio, setPrecio] = useState('');

  const manejarGuardar = (e) => {
    e.preventDefault();

    if (libroId === '') {
      setLibros(
        dataService.crearLibro({ titulo, autor, precio: parseFloat(precio) })
      );
      alert('Libro agregado exitosamente.');
    } else {
      setLibros(
        dataService.actualizarLibro(libroId, {
          titulo,
          autor,
          precio: parseFloat(precio)
        })
      );
      alert('Libro editado exitosamente.');
    }

    limpiarFormulario();
  };

  const seleccionarEditar = (libro) => {
    setLibroId(libro.id);
    setTitulo(libro.titulo);
    setAutor(libro.autor);
    setPrecio(libro.precio);
  };

  const eliminarLibro = (id) => {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      setLibros(dataService.eliminarLibro(id));
    }
  };

  const limpiarFormulario = () => {
    setLibroId('');
    setTitulo('');
    setAutor('');
    setPrecio('');
  };

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
                <p className="mb-0">Solo el administrador puede gestionar el inventario.</p>
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
        <AdminForm
          libroId={libroId}
          titulo={titulo}
          setTitulo={setTitulo}
          autor={autor}
          setAutor={setAutor}
          precio={precio}
          setPrecio={setPrecio}
          onSubmit={manejarGuardar}
          onCancelar={limpiarFormulario}
        />

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <h2>Inventario de Libros</h2>
            <div id="lista-inventario" className="list-group">
              {libros.length === 0 ? (
                <p className="text-center text-muted">No hay libros en el inventario.</p>
              ) : (
                libros.map((libro) => (
                  <div
                    key={libro.id}
                    className="item-carrito list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="info-item">
                      <h3 className="h6 mb-1">{libro.titulo}</h3>
                      <p className="mb-1">{libro.autor}</p>
                      <p className="precio mb-0">${libro.precio}</p>
                    </div>
                    <div>
                      <button
                        className="btn btn-warning btn-sm btn-editar me-2"
                        onClick={() => seleccionarEditar(libro)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm btn-eliminar-admin eliminar-item"
                        onClick={() => eliminarLibro(libro.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
