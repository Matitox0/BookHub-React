import { useState } from 'react';
import MainLayout from '../components/templates/MainLayout';
import BookGrid from '../components/organisms/BookGrid';
import { dataService } from '../service/dataService';
import { aplicarOferta } from '../service/ofertaService';

export default function Categorias({ libros, alAgregarAlCarrito, usuarioLogueado }) {
  const [categorias] = useState(() => dataService.obtenerCategorias());
  const [ofertas] = useState(() => dataService.obtenerOfertas());
  const [seleccionada, setSeleccionada] = useState('');

  const librosConOferta = libros.map((libro) => aplicarOferta(libro, ofertas));
  const librosFiltrados = seleccionada
    ? librosConOferta.filter((libro) => libro.categoria === seleccionada)
    : librosConOferta;

  const contarLibros = (categoria) =>
    libros.filter((libro) => libro.categoria === categoria).length;

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main className="container">
        <h1 className="my-4">Categorías</h1>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            className={`btn ${seleccionada === '' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSeleccionada('')}
          >
            Todas ({libros.length})
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              className={`btn ${seleccionada === categoria ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSeleccionada(categoria)}
            >
              {categoria} ({contarLibros(categoria)})
            </button>
          ))}
        </div>

        <p className="fw-bold">
          {seleccionada ? `Categoría: ${seleccionada} — ` : ''}
          Resultados: {librosFiltrados.length} libros
        </p>

        {librosFiltrados.length === 0 ? (
          <p className="text-muted">No hay libros en esta categoría.</p>
        ) : (
          <BookGrid libros={librosFiltrados} alAgregarAlCarrito={alAgregarAlCarrito} />
        )}
      </main>
    </MainLayout>
  );
}
