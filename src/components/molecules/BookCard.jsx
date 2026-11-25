import { useState } from 'react';
import QuantySelector from './QuantySelector';
import '../../styles/molecules/BookCard.css';

export default function BookCard({ libro, alAgregarAlCarrito, onSeleccionarLibro }) {
  const [cantidad, setCantidad] = useState(1);

  const manejarAgregar = (e) => {
    e.stopPropagation();
    const cantNum = parseInt(cantidad, 10);
    alAgregarAlCarrito(libro, cantNum);
  };

  return (
    <article
      className="card h-100 libro"
      onClick={() => onSeleccionarLibro && onSeleccionarLibro(libro)}
      style={{ cursor: 'pointer' }}
      title="Haz clic para ver el detalle del libro"
    >
      {libro.imagen && (
        <div className="libro-portada">
          <img
            src={libro.imagen}
            className="libro-portada-img"
            alt={`Portada de ${libro.titulo}`}
            loading="lazy"
          />
        </div>
      )}
      {libro.descuento ? (
        <span className="badge bg-danger position-absolute top-0 end-0 m-2">
          -{libro.descuento}%
        </span>
      ) : null}
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{libro.titulo}</h3>
        <p className="card-text mb-1">
          <strong>Autor:</strong> {libro.autor}
        </p>
        {libro.descuento ? (
          <p className="precio card-text">
            <strong>Precio:</strong>{' '}
            <s className="text-muted">${libro.precioOriginal}</s>{' '}
            <span className="text-danger fw-bold">${libro.precio}</span>
          </p>
        ) : (
          <p className="precio card-text">
            <strong>Precio:</strong> ${libro.precio}
          </p>
        )}
        <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
          <QuantySelector
            id={`cant-${libro.id}`}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <button
            className="btn btn-primary w-100 agregar-carrito"
            onClick={manejarAgregar}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}