import { useState } from 'react';
import MainLayout from '../components/templates/MainLayout';
import BookGrid from '../components/organisms/BookGrid';
import { dataService } from '../service/dataService';
import { librosEnOferta } from '../service/ofertaService';

export default function Ofertas({ libros, alAgregarAlCarrito, usuarioLogueado }) {
  const [ofertas] = useState(() => dataService.obtenerOfertas());
  const librosOferta = librosEnOferta(libros, ofertas);

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main className="container">
        <h1 className="my-4">Ofertas</h1>

        <p className="fw-bold text-danger">
          Resultados: {librosOferta.length} libros en oferta
        </p>

        {librosOferta.length === 0 ? (
          <p className="text-muted">No hay ofertas activas por el momento.</p>
        ) : (
          <BookGrid libros={librosOferta} alAgregarAlCarrito={alAgregarAlCarrito} />
        )}
      </main>
    </MainLayout>
  );
}
