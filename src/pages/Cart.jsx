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
      <main className="container my-5">
        <h1>Carrito de Compras</h1>

        <div id="lista-carrito" className="table-responsive">
          {carrito.length === 0 ? (
            <p className="text-center text-muted">
              Tu carrito está vacío. ¡Ve a buscar unos libros!
            </p>
          ) : (
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Libro</th>
                  <th>Precio unitario</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id} className="item-carrito">
                    <td>
                      <strong>{item.titulo}</strong>
                      <div className="text-muted small">{item.autor}</div>
                    </td>
                    <td>${item.precio}</td>
                    <td>{item.cantidad}</td>
                    <td className="precio fw-bold">${item.precio * item.cantidad}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-danger btn-sm eliminar-item"
                        onClick={() => eliminarItem(item.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div id="total-carrito" className="text-end fs-5 fw-bold mt-3">
          Total: ${total}
        </div>

        {carrito.length > 0 && (
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              id="vaciar-carrito"
              className="btn btn-outline-danger"
              onClick={vaciarCarrito}
            >
              Vaciar Carrito
            </button>
            <Link id="finalizar-compra" to="/checkout" className="btn btn-success">
              Finalizar Compra
            </Link>
          </div>
        )}
      </main>
    </MainLayout>
  );
}
