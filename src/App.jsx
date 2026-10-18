import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOffers from './pages/admin/AdminOffers';
import AdminOrders from './pages/admin/AdminOrders';
import { dataService } from './service/dataService';

export default function App() {
  // Persistencia de inventario (catálogo completo desde dataService)
  const [libros, setLibros] = useState(() => dataService.obtenerLibros());

  // Persistencia de carrito
  const [carrito, setCarrito] = useState(() => dataService.obtenerCarrito());

  // Persistencia de sesión
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    return localStorage.getItem('sesionActivaBookHub') || null;
  });

  useEffect(() => {
    dataService.guardarLibros(libros);
  }, [libros]);

  useEffect(() => {
    dataService.guardarCarrito(carrito);
  }, [carrito]);

  const alAgregarAlCarrito = (libro, cantidad) => {
    if (isNaN(cantidad) || cantidad < 1) {
      alert("Por favor, selecciona una cantidad válida.");
      return;
    }

    const existe = carrito.some((item) => String(item.id) === String(libro.id));
    let nuevoCarrito;

    if (existe) {
      nuevoCarrito = carrito.map((item) =>
        String(item.id) === String(libro.id)
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, { ...libro, cantidad }];
    }

    setCarrito(nuevoCarrito);
    alert(`"${libro.titulo}" se agrego a tu carrito de compras.`);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              libros={libros}
              alAgregarAlCarrito={alAgregarAlCarrito}
              usuarioLogueado={usuarioLogueado}
            />
          }
        />
        <Route
          path="/categorias"
          element={
            <Categorias
              libros={libros}
              alAgregarAlCarrito={alAgregarAlCarrito}
              usuarioLogueado={usuarioLogueado}
            />
          }
        />
        <Route
          path="/ofertas"
          element={
            <Ofertas
              libros={libros}
              alAgregarAlCarrito={alAgregarAlCarrito}
              usuarioLogueado={usuarioLogueado}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              carrito={carrito}
              setCarrito={setCarrito}
              usuarioLogueado={usuarioLogueado}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              carrito={carrito}
              setCarrito={setCarrito}
              usuarioLogueado={usuarioLogueado}
            />
          }
        />
        <Route
          path="/pago-exitoso"
          element={<PaymentSuccess usuarioLogueado={usuarioLogueado} />}
        />
        <Route
          path="/admin"
          element={
            <Admin
              libros={libros}
              setLibros={setLibros}
              usuarioLogueado={usuarioLogueado}
            />
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProducts />} />
          <Route path="categorias" element={<AdminCategories />} />
          <Route path="ofertas" element={<AdminOffers />} />
          <Route path="pedidos" element={<AdminOrders />} />
        </Route>
        <Route
          path="/login"
          element={
            <Login
              usuarioLogueado={usuarioLogueado}
              setUsuarioLogueado={setUsuarioLogueado}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}