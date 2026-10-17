import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import AdminForm from '../components/organisms/AdminForm';
import { generarId } from '../service/dataService';

export default function Admin({ libros, setLibros, usuarioLogueado }) {
  const [libroId, setLibroId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [precio, setPrecio] = useState('');

  const manejarGuardar = (e) => {
    e.preventDefault();

    if (libroId === '') {
      const nuevoLibro = {
        id: generarId(),
        titulo,
        autor,
        precio: parseFloat(precio)
      };
      setLibros([...libros, nuevoLibro]);
      alert('Libro agregado exitosamente.');
    } else {
      const inventarioActualizado = libros.map((libro) =>
        libro.id === libroId
          ? { ...libro, titulo, autor, precio: parseFloat(precio) }
          : libro
      );
      setLibros(inventarioActualizado);
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
      setLibros(libros.filter((libro) => libro.id !== id));
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
