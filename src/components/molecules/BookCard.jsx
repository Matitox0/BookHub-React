import { useState } from 'react';
import QuantySelector from './QuantySelector';

export default function BookCard({ libro, alAgregarAlCarrito }) {
  const [cantidad, setCantidad] = useState(1);

  const manejarAgregar = () => {
    const cantNum = parseInt(cantidad, 10);
    alAgregarAlCarrito(libro, cantNum);
  };

  return (
    <article className="libro" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      {libro.imagen && <img src={libro.imagen} alt={`Portada de ${libro.titulo}`} style={{ width: '100%', height: 'auto' }} />}
      <h3>{libro.titulo}</h3>
      <p><strong>Autor:</strong> {libro.autor}</p>
      <p className="precio"><strong>Precio:</strong> ${libro.precio}</p>
      <QuantySelector
        id={`cant-${libro.id}`}
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <button className="boton agregar-carrito" onClick={manejarAgregar}>
        Agregar al carrito
      </button>
    </article>
  );
}