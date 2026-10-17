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
      <main style={{ padding: '20px 0' }}>
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

        <div className="contenedor-carrito" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2>Inventario de Libros</h2>
          <div id="lista-inventario">
            {libros.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>No hay libros en el inventario.</p>
            ) : (
              libros.map((libro) => (
                <div
                  key={libro.id}
                  className="item-carrito"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #ddd',
                    padding: '10px 0'
                  }}
                >
                  <div className="info-item">
                    <h3>{libro.titulo}</h3>
                    <p>{libro.autor}</p>
                    <p className="precio">${libro.precio}</p>
                  </div>
                  <div>
                    <button
                      className="boton btn-editar"
                      onClick={() => seleccionarEditar(libro)}
                      style={{ backgroundColor: '#f0ad4e', marginRight: '5px' }}
                    >
                      Editar
                    </button>
                    <button
                      className="boton btn-eliminar-admin eliminar-item"
                      onClick={() => eliminarLibro(libro.id)}
                      style={{ backgroundColor: '#d9534f', color: '#fff' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
