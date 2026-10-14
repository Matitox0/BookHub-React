import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';

const LIBROS_INICIALES = [
  { id: 1, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', precio: 15000, imagen: '' },
  { id: 2, titulo: 'La Casa de los Espíritus', autor: 'Isabel Allende', precio: 12000, imagen: '' }
];

export default function App() {
  // Persistencia de inventario
  const [libros, setLibros] = useState(() => {
    const local = localStorage.getItem('inventarioBookHub');
    return local ? JSON.parse(local) : LIBROS_INICIALES;
  });

  // Persistencia de carrito
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem('carritoBookHub')) || [];
  });

  // Persistencia de sesión
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    return localStorage.getItem('sesionActivaBookHub') || null;
  });

  useEffect(() => {
    localStorage.setItem('inventarioBookHub', JSON.stringify(libros));
  }, [libros]);

  useEffect(() => {
    localStorage.setItem('carritoBookHub', JSON.stringify(carrito));
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
          path="/admin"
          element={
            <Admin
              libros={libros}
              setLibros={setLibros}
              usuarioLogueado={usuarioLogueado}
            />
          }
        />
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
