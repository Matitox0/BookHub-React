import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import { dataService } from './services/dataService';

export default function App() {
  const [libros, setLibros] = useState(() => dataService.obtenerLibros());
  const [carrito, setCarrito] = useState(() => dataService.obtenerCarrito());
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => localStorage.getItem('sesionActivaBookHub') || '');

  useEffect(() => {
    localStorage.setItem('inventarioBookHub', JSON.stringify(libros));
  }, [libros]);

  useEffect(() => {
    dataService.guardarCarrito(carrito);
  }, [carrito]);

  const agregarAlCarrito = (libro, cantidad) => {
    const existe = carrito.some(item => item.id === libro.id);
    if (existe) {
      setCarrito(carrito.map(item => item.id === libro.id ? { ...item, cantidad: item.cantidad + cantidad } : item));
    } else {
      setCarrito([...carrito, { ...libro, cantidad }]);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home libros={libros} alAgregarAlCarrito={agregarAlCarrito} usuarioLogueado={usuarioLogueado} />} />
        <Route path="/cart" element={<Cart carrito={carrito} setCarrito={setCarrito} usuarioLogueado={usuarioLogueado} />} />
        <Route path="/checkout" element={<Checkout carrito={carrito} setCarrito={setCarrito} usuarioLogueado={usuarioLogueado} />} />
        <Route path="/pago-exitoso" element={<PaymentSuccess usuarioLogueado={usuarioLogueado} />} />
        <Route path="/admin" element={<Admin libros={libros} setLibros={setLibros} usuarioLogueado={usuarioLogueado} />} />
        <Route path="/login" element={<Login usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} />} />
      </Routes>
    </BrowserRouter>
  );
}