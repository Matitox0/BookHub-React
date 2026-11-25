// Utilidades de ofertas.
//
// Se separan de dataService porque no persisten nada: solo transforman un libro
// según la oferta vigente para calcular su precio final.

// Devuelve la oferta asociada a un libro, o null si no tiene.
export const buscarOferta = (libro, ofertas) =>
  ofertas.find((o) => String(o.libroId) === String(libro.id)) || null;

// Aplica el descuento al libro, conservando el precio original.
export const aplicarOferta = (libro, ofertas) => {
  const oferta = buscarOferta(libro, ofertas);
  if (!oferta) return libro;

  const precioFinal = Math.round(libro.precio * (1 - oferta.descuento / 100));
  return {
    ...libro,
    precioOriginal: libro.precio,
    precio: precioFinal,
    descuento: oferta.descuento
  };
};

// Devuelve solo los libros que tienen una oferta vigente.
export const librosEnOferta = (libros, ofertas) =>
  libros
    .map((libro) => aplicarOferta(libro, ofertas))
    .filter((libro) => libro.descuento);
