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

const KEY_LIBROS = 'inventarioBookHub';
const KEY_CARRITO = 'carritoBookHub';

// Genera un id único (string) para un libro nuevo.
export const generarId = () => String(Date.now());

export const dataService = {
  // READ (Inventario). Si no existe, siembra el catálogo inicial.
  obtenerLibros: () => {
    const local = localStorage.getItem(KEY_LIBROS);
    if (!local) {
      localStorage.setItem(KEY_LIBROS, JSON.stringify(LIBROS_INICIALES));
      return LIBROS_INICIALES;
    }
    return JSON.parse(local);
  },

  // WRITE (Inventario)
  guardarLibros: (libros) => {
    localStorage.setItem(KEY_LIBROS, JSON.stringify(libros));
  },

  // READ (Carrito)
  obtenerCarrito: () => {
    const local = localStorage.getItem(KEY_CARRITO);
    return local ? JSON.parse(local) : [];
  },

  // WRITE (Carrito)
  guardarCarrito: (carrito) => {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
  }
};
