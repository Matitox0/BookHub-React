import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FormField from '../../components/molecules/FormField';
import { dataService } from '../../service/dataService';

const formatearPrecio = (valor) =>
  `$${Math.round(Number(valor || 0)).toLocaleString('es-CL')}`;

export default function AdminOffers() {
  const { libros } = useOutletContext();

  const [ofertas, setOfertas] = useState(() => dataService.obtenerOfertas());
  const [libroId, setLibroId] = useState('');
  const [descuento, setDescuento] = useState('10');

  const buscarLibro = (id) => libros.find((l) => String(l.id) === String(id));

  const agregarOferta = (e) => {
    e.preventDefault();

    if (libroId === '') {
      alert('Selecciona un libro.');
      return;
    }

    const valor = Number(descuento);
    if (isNaN(valor) || valor <= 0 || valor >= 100) {
      alert('El descuento debe ser un número entre 1 y 99.');
      return;
    }

    setOfertas(dataService.crearOferta(libroId, valor));
    setLibroId('');
    setDescuento('10');
  };

  const eliminarOferta = (id) => {
    setOfertas(dataService.eliminarOferta(id));
  };

  return (
    <>
      <h2 className="h4 mb-4">Ofertas</h2>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card p-4 shadow-sm">
            <h3 className="h5 mb-3">Nueva oferta</h3>
            <form onSubmit={agregarOferta}>
              <div className="campo-form mb-3">
                <label htmlFor="libroOferta" className="form-label">Libro:</label>
                <select
                  id="libroOferta"
                  className="form-select"
                  value={libroId}
                  onChange={(e) => setLibroId(e.target.value)}
                >
                  <option value="">-- Selecciona un libro --</option>
                  {libros.map((libro) => (
                    <option key={libro.id} value={libro.id}>
                      {libro.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <FormField
                label="Descuento (%):"
                id="descuentoOferta"
                type="number"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
              />

              <button type="submit" className="btn btn-primary w-100">
                Guardar oferta
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card p-4 shadow-sm">
            <h3 className="h5 mb-3">Ofertas vigentes</h3>

            {ofertas.length === 0 ? (
              <p className="text-muted mb-0">No hay ofertas activas.</p>
            ) : (
              <ul className="list-group">
                {ofertas.map((oferta) => {
                  const libro = buscarLibro(oferta.libroId);
                  const precioFinal = libro
                    ? libro.precio * (1 - oferta.descuento / 100)
                    : 0;

                  return (
                    <li
                      key={oferta.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{libro ? libro.titulo : 'Libro eliminado'}</strong>
                        <div className="small text-muted">
                          <span className="text-decoration-line-through me-2">
                            {libro ? formatearPrecio(libro.precio) : ''}
                          </span>
                          <span className="fw-bold text-success">
                            {formatearPrecio(precioFinal)}
                          </span>
                          <span className="badge bg-warning text-dark ms-2">
                            -{oferta.descuento}%
                          </span>
                        </div>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarOferta(oferta.id)}
                      >
                        Quitar
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
