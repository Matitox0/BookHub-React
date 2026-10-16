const LIBROS_INICIALES = [
  { id: '1', titulo: 'La Metamorfosis', autor: 'Franz Kafka', precio: 5000, categoria: 'Ficción', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGGgASkJD7uvRzDSqZ2xfWdiaWrLHPSXO6M-JrnI-jw&s=10' },
  { id: '2', titulo: 'El Señor de los Anillos', autor: 'J.R.R. Tolkien', precio: 16000, categoria: 'Fantasía', imagen: 'https://covers.openlibrary.org/b/isbn/9788445071403-L.jpg' },
  { id: '3', titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', precio: 6000, categoria: 'Infantil', imagen: 'https://covers.openlibrary.org/b/isbn/9788498381498-L.jpg' },
  { id: '4', titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', precio: 12000, categoria: 'Clásico', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7xOLHSO6ZSY4EQ2qCW3efRjJRsdKIwQOWeaUCOzpnQ&s=10' },
  { id: '5', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', precio: 9000, categoria: 'Ficción', imagen: 'https://covers.openlibrary.org/b/isbn/9788491050292-L.jpg' },
  { id: '6', titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', precio: 8000, categoria: 'Romance', imagen: 'https://covers.openlibrary.org/b/isbn/9780142437230-L.jpg' },
  { id: '7', titulo: 'Matar a un ruiseñor', autor: 'Harper Lee', precio: 13000, categoria: 'Drama', imagen: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg' },
  { id: '8', titulo: 'El gran Gatsby', autor: 'F. Scott Fitzgerald', precio: 8000, categoria: 'Clásico', imagen: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg' },
  { id: '9', titulo: '1984', autor: 'George Orwell', precio: 6000, categoria: 'Ciencia Ficción', imagen: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg' }
];

export const dataService = {
  // READ (Inventario)
  obtenerLibros: () => {
    const local = localStorage.getItem('inventarioBookHub');
    if (!local) {
      localStorage.setItem('inventarioBookHub', JSON.stringify(LIBROS_INICIALES));
      return LIBROS_INICIALES;
    }
    return JSON.parse(local);
  },

  // CREATE
  guardarLibro: (nuevoLibro) => {
    const libros = dataService.obtenerLibros();
    const listaActualizada = [...libros, { ...nuevoLibro, id: String(Date.now()) }];
    localStorage.setItem('inventarioBookHub', JSON.stringify(listaActualizada));
    return listaActualizada;
  },

  // UPDATE
  actualizarLibro: (id, libroModificado) => {
    const libros = dataService.obtenerLibros();
    const listaActualizada = libros.map(l => l.id === id ? { ...l, ...libroModificado } : l);
    localStorage.setItem('inventarioBookHub', JSON.stringify(listaActualizada));
    return listaActualizada;
  },

  // DELETE
  eliminarLibro: (id) => {
    const libros = dataService.obtenerLibros();
    const listaActualizada = libros.filter(l => l.id !== id);
    localStorage.setItem('inventarioBookHub', JSON.stringify(listaActualizada));
    return listaActualizada;
  },

  // READ/WRITE Carrito
  obtenerCarrito: () => {
    const local = localStorage.getItem('carritoBookHub');
    return local ? JSON.parse(local) : [];
  },

  guardarCarrito: (carrito) => {
    localStorage.setItem('carritoBookHub', JSON.stringify(carrito));
  }
};