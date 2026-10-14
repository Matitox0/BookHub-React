import { useState } from 'react';
import MainLayout from '../components/templates/MainLayout';
import SearchForm from '../components/molecules/SearchForm';
import BookGrid from '../components/organisms/BookGrid';

export default function Home({ libros, alAgregarAlCarrito, usuarioLogueado }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('');

  const manejarBuscar = (e) => {
    e.preventDefault();
    const texto = busqueda.trim().toLowerCase();

    if (texto === '') {
      alert('Por favor escribe el nombre de un autor o título.');
      setFiltro('');
      return;
    }

    const encontrados = libros.filter((libro) => {
      const textoCompleto = `${libro.titulo} ${libro.autor}`.toLowerCase();
      return textoCompleto.includes(texto);
    });

    if (encontrados.length === 0) {
      alert('No se encontraron libros.');
    }

    setFiltro(texto);
  };

  const manejarMostrarTodos = () => {
    setBusqueda('');
    setFiltro('');
  };

  const librosVisibles = filtro
    ? libros.filter((l) => `${l.titulo} ${l.autor}`.toLowerCase().includes(filtro))
    : libros;

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main>
        <section id="bienvenida" style={{ textAlign: 'center', margin: '20px 0' }}>
          <h1>Bienvenido a BookHub</h1>
          <SearchForm
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            onBuscar={manejarBuscar}
            onMostrarTodos={manejarMostrarTodos}
          />
        </section>

        <section className="busqueda">
          <p id="resultadoBusqueda" style={{ fontWeight: 'bold' }}>
            Resultados: {librosVisibles.length} libros encontrados
          </p>
        </section>

        <BookGrid libros={librosVisibles} alAgregarAlCarrito={alAgregarAlCarrito} />
      </main>
    </MainLayout>
  );
}