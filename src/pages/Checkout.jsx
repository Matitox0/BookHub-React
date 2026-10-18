import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import { dataService } from '../service/dataService';

export default function Checkout({ carrito, setCarrito, usuarioLogueado }) {
  const navigate = useNavigate();
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState(usuarioLogueado || '');
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('Cerrillos');

  const manejarPago = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    // Simulación de respuesta de pasarela
    const orden = '#20240705';

    // Se registra el pedido para que quede disponible en el panel de administración.
    dataService.registrarPedido({
      nroOrden: orden,
      cliente: nombre,
      correo,
      direccion,
      comuna,
      total,
      items: carrito.map((item) => ({
        titulo: item.titulo,
        cantidad: item.cantidad,
        precio: item.precio
      }))
    });

    setCarrito([]);
    localStorage.removeItem('carritoBookHub');
    navigate('/pago-exitoso', { state: { nroOrden: orden, cliente: nombre, total, direccion, comuna, correo } });
  };

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
        <h2 className="mb-4">Carrito de compra - Finalizar Pedido</h2>
        
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Resumen de Productos</h5>
            <span className="badge bg-light text-dark fs-6">Total a pagar: ${total}</span>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush mb-3">
              {carrito.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.titulo}</strong>
                    <div className="small text-muted">{item.autor} - Cantidad: {item.cantidad}</div>
                  </div>
                  <span className="fw-bold">${item.precio * item.cantidad}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={manejarPago} className="card p-4 shadow-sm bg-light">
          <h4 className="mb-3">Información del cliente y despacho</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre Completo *</label>
              <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Correo Electrónico *</label>
              <input type="email" className="form-control" value={correo} onChange={e => setCorreo(e.target.value)} required />
            </div>
            <div className="col-12">
              <label className="form-label">Calle y Número *</label>
              <input type="text" className="form-control" placeholder="Ej: Los Crisantemos 123" value={direccion} onChange={e => setDireccion(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Comuna *</label>
              <select className="form-select" value={comuna} onChange={e => setComuna(e.target.value)}>
                <option value="Cerrillos">Cerrillos</option>
                <option value="Santiago">Santiago</option>
                <option value="Maipú">Maipú</option>
                <option value="Providencia">Providencia</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-lg mt-4 w-100 fw-bold">
            Pagar ahora ${total}
          </button>
        </form>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}