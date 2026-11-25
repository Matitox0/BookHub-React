import { Link, useOutletContext } from 'react-router-dom';
import { dataService } from '../../service/dataService';

const formatearPrecio = (valor) =>
  `$${Number(valor || 0).toLocaleString('es-CL')}`;

export default function AdminDashboard() {
  const { libros } = useOutletContext();

  const categorias = dataService.obtenerCategorias();
  const ofertas = dataService.obtenerOfertas();
  const pedidos = dataService.obtenerPedidos();

  const ingresos = pedidos
    .filter((p) => p.estado !== 'Cancelado')
    .reduce((sum, p) => sum + Number(p.total || 0), 0);

  const tarjetas = [
    { label: 'Libros', valor: libros.length, enlace: '/admin/productos', color: 'text-primary' },
    { label: 'Categorías', valor: categorias.length, enlace: '/admin/categorias', color: 'text-success' },
    { label: 'Ofertas activas', valor: ofertas.length, enlace: '/admin/ofertas', color: 'text-warning' },
    { label: 'Pedidos', valor: pedidos.length, enlace: '/admin/pedidos', color: 'text-info' }
  ];

  return (
    <>
      <h2 className="h4 mb-4">Resumen general</h2>

      <div className="row g-3 mb-4">
        {tarjetas.map((t) => (
          <div className="col-6 col-lg-3" key={t.label}>
            <Link to={t.enlace} className="card h-100 shadow-sm text-decoration-none">
              <div className="card-body">
                <p className="text-muted mb-1">{t.label}</p>
                <p className={`fs-3 fw-bold mb-0 ${t.color}`}>{t.valor}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="h5">Ingresos registrados</h3>
          <p className="fs-3 fw-bold text-success mb-0">{formatearPrecio(ingresos)}</p>
          <p className="text-muted mb-0 small">Suma de los pedidos no cancelados.</p>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="h5 mb-0">Últimos pedidos</h3>
            <Link to="/admin/pedidos" className="btn btn-sm btn-outline-primary">
              Ver todos
            </Link>
          </div>

          {pedidos.length === 0 ? (
            <p className="text-muted mb-0">Todavía no hay pedidos registrados.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.slice(0, 5).map((p) => (
                    <tr key={p.id}>
                      <td>{p.nroOrden}</td>
                      <td>{p.cliente}</td>
                      <td>{p.fecha}</td>
                      <td><span className="badge bg-secondary">{p.estado}</span></td>
                      <td className="text-end">{formatearPrecio(p.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
