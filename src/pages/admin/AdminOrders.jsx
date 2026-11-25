import { useState } from 'react';
import { dataService } from '../../service/dataService';

const ESTADOS = ['Pendiente', 'Pagado', 'Enviado', 'Entregado', 'Cancelado'];

const formatearPrecio = (valor) =>
  `$${Number(valor || 0).toLocaleString('es-CL')}`;

const colorEstado = (estado) => {
  switch (estado) {
    case 'Pagado':
      return 'bg-primary';
    case 'Enviado':
      return 'bg-info text-dark';
    case 'Entregado':
      return 'bg-success';
    case 'Cancelado':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
};

export default function AdminOrders() {
  const [pedidos, setPedidos] = useState(() => dataService.obtenerPedidos());

  const cambiarEstado = (id, estado) => {
    setPedidos(dataService.actualizarEstadoPedido(id, estado));
  };

  const eliminarPedido = (id) => {
    if (confirm('¿Eliminar este pedido del historial?')) {
      setPedidos(dataService.eliminarPedido(id));
    }
  };

  return (
    <>
      <h2 className="h4 mb-4">Pedidos</h2>

      <div className="card p-4 shadow-sm">
        {pedidos.length === 0 ? (
          <p className="text-muted mb-0">Todavía no hay pedidos registrados.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Productos</th>
                  <th className="text-end">Total</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td className="fw-semibold">{pedido.nroOrden}</td>
                    <td>
                      {pedido.cliente}
                      <div className="small text-muted">{pedido.correo}</div>
                    </td>
                    <td>{pedido.fecha}</td>
                    <td>
                      {(pedido.items || []).reduce(
                        (sum, item) => sum + Number(item.cantidad || 0),
                        0
                      )}
                    </td>
                    <td className="text-end">{formatearPrecio(pedido.total)}</td>
                    <td>
                      <span className={`badge ${colorEstado(pedido.estado)}`}>
                        {pedido.estado}
                      </span>
                      <select
                        className="form-select form-select-sm mt-1"
                        value={pedido.estado}
                        onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                      >
                        {ESTADOS.map((estado) => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarPedido(pedido.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
