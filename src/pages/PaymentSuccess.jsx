import { useLocation, Link } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';

export default function PaymentSuccess({ usuarioLogueado }) {
  const location = useLocation();
  const datos = location.state || { nroOrden: '#20240705', cliente: 'Usuario', total: 0 };

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main className="container my-5 text-center" style={{ maxWidth: '650px' }}>
        <div className="card p-5 shadow border-success">
          <div className="text-success mb-3 fs-1">✔</div>
          <h2 className="text-success mb-2">Se ha realizado la compra</h2>
          <p className="lead fw-bold text-secondary">Orden Nro {datos.nroOrden}</p>
          <hr />
          <div className="text-start mb-4">
            <p><strong>Cliente:</strong> {datos.cliente}</p>
            <p><strong>Correo:</strong> {datos.correo || usuarioLogueado}</p>
            <p><strong>Dirección de entrega:</strong> {datos.direccion}, {datos.comuna}</p>
            <p className="fs-5 fw-bold text-primary">Total pagado: ${datos.total}</p>
          </div>
          <Link to="/" className="btn btn-primary btn-lg">Volver al Inicio</Link>
        </div>
      </main>
    </MainLayout>
  );
}