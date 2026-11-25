import { useLocation, Link } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';

export default function PaymentFailure({ usuarioLogueado }) {
  const location = useLocation();
  const datos = location.state || { nroOrden: '#20240705', total: 0 };

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main className="container my-5 text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card p-5 shadow border-danger">
              <div className="text-danger mb-3 fs-1">✖</div>
              <h2 className="text-danger mb-2">No se pudo realizar el pago</h2>
              <p className="lead fw-bold text-secondary">Orden Nro {datos.nroOrden}</p>
              <hr />
              <div className="text-start mb-4">
                {datos.motivo && (
                  <p className="text-danger"><strong>Motivo:</strong> {datos.motivo}</p>
                )}
                <p><strong>Cliente:</strong> {datos.cliente || 'Usuario'}</p>
                <p><strong>Correo:</strong> {datos.correo || usuarioLogueado}</p>
                {datos.direccion && (
                  <p><strong>Dirección de entrega:</strong> {datos.direccion}, {datos.comuna}</p>
                )}
                <p className="fs-5 fw-bold text-secondary mb-0">
                  Total no procesado: ${datos.total}
                </p>
              </div>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                <Link to="/checkout" className="btn btn-danger btn-lg">Reintentar el pago</Link>
                <Link to="/cart" className="btn btn-outline-secondary btn-lg">Volver al carrito</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
