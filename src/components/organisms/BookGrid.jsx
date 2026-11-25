import { useState } from 'react';
import BookCard from '../molecules/BookCard';
import QuantySelector from '../molecules/QuantySelector';

export default function BookGrid({ libros, alAgregarAlCarrito }) {
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [cantidadModal, setCantidadModal] = useState(1);

  const abrirDetalle = (libro) => {
    setLibroSeleccionado(libro);
    setCantidadModal(1);
  };

  const cerrarDetalle = () => {
    setLibroSeleccionado(null);
  };

  const manejarAgregarDesdeModal = () => {
    const cantNum = parseInt(cantidadModal, 10);
    alAgregarAlCarrito(libroSeleccionado, cantNum);
    cerrarDetalle();
  };

  return (
    <>
      <section id="libros" className="row g-4">
        {libros.map((libro) => (
          <div className="col-12 col-sm-6 col-lg-4" key={libro.id}>
            <BookCard
              libro={libro}
              alAgregarAlCarrito={alAgregarAlCarrito}
              onSeleccionarLibro={abrirDetalle}
            />
          </div>
        ))}
      </section>

      {libroSeleccionado && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
          onClick={cerrarDetalle}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Detalle del libro</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Cerrar"
                  onClick={cerrarDetalle}
                />
              </div>

              <div className="modal-body p-4">
                <div className="row g-4">
                  {/* LADO IZQUIERDO: Portada, título, autor y categoría */}
                  <div className="col-md-5 border-end-md d-flex flex-column align-items-center text-center">
                    {libroSeleccionado.imagen && (
                      <div className="position-relative mb-3">
                        <img
                          src={libroSeleccionado.imagen}
                          alt={`Portada de ${libroSeleccionado.titulo}`}
                          className="img-fluid rounded shadow-sm"
                          style={{ maxHeight: '260px', objectFit: 'contain' }}
                        />
                        {libroSeleccionado.descuento ? (
                          <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                            -{libroSeleccionado.descuento}%
                          </span>
                        ) : null}
                      </div>
                    )}
                    <h4 className="h5 mb-1">{libroSeleccionado.titulo}</h4>
                    <p className="text-muted mb-2">
                      <strong>Autor:</strong> {libroSeleccionado.autor}
                    </p>
                    {libroSeleccionado.categoria && (
                      <span className="badge bg-secondary">
                        {libroSeleccionado.categoria}
                      </span>
                    )}
                  </div>

                  {/* LADO DERECHO: Descripción arriba; precio y carrito abajo */}
                  <div className="col-md-7 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="fw-bold text-uppercase text-muted small mb-2">
                        Descripción
                      </h6>
                      <p className="mb-4" style={{ lineHeight: '1.6' }}>
                        {libroSeleccionado.descripcion ||
                          'Sin descripción disponible para este libro.'}
                      </p>
                    </div>

                    <div className="border-top pt-3 mt-auto">
                      {libroSeleccionado.descuento ? (
                        <p className="precio mb-3">
                          <strong>Precio:</strong>{' '}
                          <s className="text-muted">${libroSeleccionado.precioOriginal}</s>{' '}
                          <span className="text-danger fw-bold fs-4">
                            ${libroSeleccionado.precio}
                          </span>
                        </p>
                      ) : (
                        <p className="precio mb-3">
                          <strong>Precio:</strong>{' '}
                          <span className="fw-bold fs-4">${libroSeleccionado.precio}</span>
                        </p>
                      )}

                      <QuantySelector
                        id={`modal-cant-${libroSeleccionado.id}`}
                        value={cantidadModal}
                        onChange={(e) => setCantidadModal(e.target.value)}
                      />
                      <button
                        className="btn btn-primary w-100 mt-2"
                        onClick={manejarAgregarDesdeModal}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}