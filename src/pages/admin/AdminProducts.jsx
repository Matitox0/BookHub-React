import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AdminForm from '../../components/organisms/AdminForm';
import { dataService } from '../../service/dataService';

export default function AdminProducts() {
  const { libros, setLibros } = useOutletContext();

  const [libroId, setLibroId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [precio, setPrecio] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const manejarGuardar = (e) => {
    e.preventDefault();

    if (libroId === '') {
      setLibros(dataService.crearLibro({ titulo, autor, precio: parseFloat(precio) }));
      alert('Libro agregado exitosamente.');
    } else {
      setLibros(
        dataService.actualizarLibro(libroId, { titulo, autor, precio: parseFloat(precio) })
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

  const librosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (texto === '') return libros;
    return libros.filter((l) =>
      `${l.titulo} ${l.autor}`.toLowerCase().includes(texto)
    );
  }, [libros, busqueda]);

  return (
    <>
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

      <div className="card p-4 shadow-sm">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <h2 className="h4 mb-0">Inventario de Libros</h2>
          <input
            type="search"
            className="form-control w-auto"
            placeholder="Buscar en el inventario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {librosFiltrados.length === 0 ? (
          <p className="text-center text-muted mb-0">No hay libros que coincidan.</p>
        ) : (
          <div id="lista-inventario" className="list-group">
            {librosFiltrados.map((libro) => (
              <div
                key={libro.id}
                className="item-carrito list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="info-item">
                  <h3 className="h6 mb-1">{libro.titulo}</h3>
                  <p className="mb-1">{libro.autor}</p>
                  <p className="precio mb-0">
                    ${libro.precio}
                    {libro.categoria && (
                      <span className="badge bg-secondary ms-2">{libro.categoria}</span>
                    )}
                  </p>
                </div>
                <div className="text-end">
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
            ))}
          </div>
        )}
      </div>
    </>
  );
}
