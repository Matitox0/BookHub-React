import { Link } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';

export default function Cart({ carrito, setCarrito, usuarioLogueado }) {
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const eliminarItem = (id) => {
    const nuevoCarrito = carrito.filter((item) => String(item.id) !== String(id));
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <MainLayout usuarioLogueado={usuarioLogueado}>
      <main style={{ maxWidth: '800px', margin: '30px auto' }}>
        <h1>Carrito de Compras</h1>
        <div id="lista-carrito">
          {carrito.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>
              Tu carrito está vacío. ¡Ve a buscar unos libros!
            </p>
          ) : (
            carrito.map((item) => (
              <div
                key={item.id}
                className="item-carrito"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #ddd',
                  padding: '10px 0'
                }}
              >
                <div className="info-item">
                  <h3>{item.titulo}</h3>
                  <p>{item.autor}</p>
                  <p>
                    Precio unitario: ${item.precio} | <strong>Cantidad: {item.cantidad}</strong>
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="precio" style={{ fontWeight: 'bold' }}>
                    Subtotal: ${item.precio * item.cantidad}
                  </p>
                  <button
                    className="eliminar-item boton"
                    onClick={() => eliminarItem(item.id)}
                    style={{ backgroundColor: '#d9534f', color: '#fff', border: 'none', padding: '5px 10px' }}
                  >
                    X Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div id="total-carrito" style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '20px', textAlign: 'right' }}>
          Total: ${total}
        </div>

        {carrito.length > 0 && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              id="vaciar-carrito"
              className="boton"
              onClick={vaciarCarrito}
              style={{ backgroundColor: '#d9534f', color: '#fff' }}
            >
              Vaciar Carrito
            </button>
            <Link
              to="/checkout"
              id="finalizar-compra"
              className="boton"
              style={{ backgroundColor: '#28a745', color: '#fff', textDecoration: 'none', display: 'inline-block' }}
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </main>
    </MainLayout>
  );
}
