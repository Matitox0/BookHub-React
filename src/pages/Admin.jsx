import { useState } from 'react';
import MainLayout from '../components/templates/MainLayout';
import AdminForm from '../components/organisms/AdminForm';

export default function Admin({ libros, setLibros, usuarioLogueado }) {
  const [libroId, setLibroId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [precio, setPrecio] = useState('');

  const manejarGuardar = (e) => {
    e.preventDefault();
    const nuevoLibro = {
      id: libroId !== '' ? libros[libroId].id : Date.now(),
      titulo,
      autor,
      precio: parseFloat(precio)
    };

    if (libroId === '') {
      setLibros([...libros, nuevoLibro]);
      alert('Libro agregado exitosamente.');
    } else {
      const inventarioActualizado = [...libros];
      inventarioActualizado[libroId] = nuevoLibro;
      setLibros(inventarioActualizado);
      alert('Libro editado exitosamente.');
    }

    limpiarFormulario();
  };

  const seleccionarEditar = (index) => {
    const libro = libros[index];
    setLibroId(index.toString());
    setTitulo(libro.titulo);
    setAutor(libro.autor);
    setPrecio(libro.precio);
  };

  const eliminarLibro = (index) => {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      const inventarioActualizado = libros.filter((_, i) => i !== index);
      setLibros(inventarioActualizado);
    }
  };

  const limpiarFormulario = () => {
    setLibroId('');
    setTitulo('');
    setAutor('');
    setPrecio('');
  };

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main style={{ padding: '20px 0' }}>
        <input type="hidden" id="libroId" value={libroId} />
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
              libros.map((libro, index) => (
                <div
                  key={libro.id || index}
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
                      onClick={() => seleccionarEditar(index)}
                      style={{ backgroundColor: '#f0ad4e', marginRight: '5px' }}
                    >
                      Editar
                    </button>
                    <button
                      className="boton btn-eliminar-admin eliminar-item"
                      onClick={() => eliminarLibro(index)}
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