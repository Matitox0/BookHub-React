import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FormField from '../../components/molecules/FormField';
import { dataService } from '../../service/dataService';

export default function AdminCategories() {
  const { libros } = useOutletContext();

  const [categorias, setCategorias] = useState(() => dataService.obtenerCategorias());
  const [nueva, setNueva] = useState('');

  const contarLibros = (categoria) =>
    libros.filter((l) => l.categoria === categoria).length;

  const agregarCategoria = (e) => {
    e.preventDefault();

    if (nueva.trim() === '') {
      alert('Escribe el nombre de la categoría.');
      return;
    }

    const actualizadas = dataService.crearCategoria(nueva);

    if (actualizadas.length === categorias.length) {
      alert('La categoría ya existe.');
      return;
    }

    setCategorias(actualizadas);
    setNueva('');
  };

  const eliminarCategoria = (categoria) => {
    if (contarLibros(categoria) > 0) {
      alert(`No puedes eliminar "${categoria}" porque tiene libros asignados.`);
      return;
    }

    if (confirm(`¿Eliminar la categoría "${categoria}"?`)) {
      setCategorias(dataService.eliminarCategoria(categoria));
    }
  };

  return (
    <>
      <h2 className="h4 mb-4">Categorías</h2>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card p-4 shadow-sm">
            <h3 className="h5 mb-3">Nueva categoría</h3>
            <form onSubmit={agregarCategoria}>
              <FormField
                label="Nombre:"
                id="nuevaCategoria"
                value={nueva}
                onChange={(e) => setNueva(e.target.value)}
                placeholder="Ej: Poesía"
              />
              <button type="submit" className="btn btn-primary w-100">
                Agregar categoría
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card p-4 shadow-sm">
            <h3 className="h5 mb-3">Categorías registradas</h3>

            {categorias.length === 0 ? (
              <p className="text-muted mb-0">No hay categorías.</p>
            ) : (
              <ul className="list-group">
                {categorias.map((categoria) => (
                  <li
                    key={categoria}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {categoria}
                      <span className="badge bg-primary ms-2">
                        {contarLibros(categoria)} libros
                      </span>
                    </span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarCategoria(categoria)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
