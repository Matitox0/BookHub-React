import { useState } from 'react';
import MainLayout from '../components/templates/MainLayout';
import SearchForm from '../components/molecules/SearchForm';
import BookGrid from '../components/organisms/BookGrid';
import Pagination from '../components/molecules/Pagination';
import { dataService } from '../service/dataService';
import { aplicarOferta } from '../service/ofertaService';
import '../styles/pages/Home.css';

const LIBROS_POR_PAGINA = 6;

export default function Home({ libros, alAgregarAlCarrito, usuarioLogueado }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('');
  const [pagina, setPagina] = useState(1);

  const [ofertas] = useState(() => dataService.obtenerOfertas());

  const librosConOferta = libros.map((libro) => aplicarOferta(libro, ofertas));

  const manejarBuscar = (e) => {
    e.preventDefault();
    const texto = busqueda.trim().toLowerCase();

    if (texto === '') {
      alert('Por favor escribe el nombre de un autor o título.');
      setFiltro('');
      return;
    }

    const encontrados = librosConOferta.filter((libro) => {
      const textoCompleto = `${libro.titulo} ${libro.autor}`.toLowerCase();
      return textoCompleto.includes(texto);
    });

    if (encontrados.length === 0) {
      alert('No se encontraron libros.');
    }

    setFiltro(texto);
    setPagina(1);
  };

  const manejarMostrarTodos = () => {
    setBusqueda('');
    setFiltro('');
    setPagina(1);
  };

  const librosVisibles = filtro
    ? librosConOferta.filter((l) => `${l.titulo} ${l.autor}`.toLowerCase().includes(filtro))
    : librosConOferta;

  const totalPaginas = Math.max(1, Math.ceil(librosVisibles.length / LIBROS_POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const inicio = (paginaActual - 1) * LIBROS_POR_PAGINA;
  const librosPagina = librosVisibles.slice(inicio, inicio + LIBROS_POR_PAGINA);

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      {/* 2. Capa de Overlay tipo marco/pillarbox */}
      <div className="home-frame-overlay" aria-hidden="true">
        <img src="src/assets/marco-overlay.html" alt="" />
      </div>

      {/* 3. Contenido principal */}
      <main className="container home-contenido-encuadrado">
        <section id="bienvenida" className="text-center my-4">
          {/* Título con color fijo: no cambia con el tema claro/oscuro */}
          <h1 className="home-titulo" style={{ color: '#000' }}>
            Bienvenido a BookHub
          </h1>
          <SearchForm
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            onBuscar={manejarBuscar}
            onMostrarTodos={manejarMostrarTodos}
          />
        </section>

        <section className="busqueda mb-3">
          <p id="resultadoBusqueda" className="fw-bold">
            Resultados: {librosVisibles.length} libros encontrados
          </p>
        </section>

        <BookGrid libros={librosPagina} alAgregarAlCarrito={alAgregarAlCarrito} />

        <Pagination
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onChange={setPagina}
        />
      </main>
    </MainLayout>
  );
}
