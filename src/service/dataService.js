const LIBROS_INICIALES = [
  { id: '1', titulo: 'La Metamorfosis', autor: 'Franz Kafka', precio: 5000, categoria: 'Ficción', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGGgASkJD7uvRzDSqZ2xfWdiaWrLHPSXO6M-JrnI-jw&s=10' },
  { id: '2', titulo: 'El Señor de los Anillos', autor: 'J.R.R. Tolkien', precio: 16000, categoria: 'Fantasía', imagen: 'https://covers.openlibrary.org/b/isbn/9788445071403-L.jpg' },
  { id: '3', titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', precio: 6000, categoria: 'Infantil', imagen: 'https://covers.openlibrary.org/b/isbn/9788498381498-L.jpg' },
  { id: '4', titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', precio: 12000, categoria: 'Clásico', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7xOLHSO6ZSY4EQ2qCW3efRjJRsdKIwQOWeaUCOzpnQ&s=10' },
  { id: '5', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', precio: 9000, categoria: 'Ficción', imagen: 'https://covers.openlibrary.org/b/isbn/9788491050292-L.jpg' },
  { id: '6', titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', precio: 8000, categoria: 'Romance', imagen: 'https://covers.openlibrary.org/b/isbn/9780142437230-L.jpg' },
  { id: '7', titulo: 'Matar a un ruiseñor', autor: 'Harper Lee', precio: 13000, categoria: 'Drama', imagen: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg' },
  { id: '8', titulo: 'El gran Gatsby', autor: 'F. Scott Fitzgerald', precio: 8000, categoria: 'Clásico', imagen: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg' },
  { id: '9', titulo: '1984', autor: 'George Orwell', precio: 6000, categoria: 'Ciencia Ficción', imagen: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg' },
  { id: '10', titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', precio: 14000, categoria: 'Fantasía', imagen: 'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg' },
  { id: '11', titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', precio: 13000, categoria: 'Fantasía', imagen: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg' },
  { id: '12', titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', precio: 7000, categoria: 'Ciencia Ficción', imagen: 'https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg' },
  { id: '13', titulo: 'Un mundo feliz', autor: 'Aldous Huxley', precio: 9000, categoria: 'Ciencia Ficción', imagen: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg' },
  { id: '14', titulo: 'Juego de Tronos', autor: 'George R.R. Martin', precio: 17000, categoria: 'Fantasía', imagen: 'https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg' },
  { id: '15', titulo: 'Drácula', autor: 'Bram Stoker', precio: 8000, categoria: 'Terror', imagen: 'https://covers.openlibrary.org/b/isbn/9780141439846-L.jpg' },
  { id: '16', titulo: 'El retrato de Dorian Gray', autor: 'Oscar Wilde', precio: 7500, categoria: 'Clásico', imagen: 'https://covers.openlibrary.org/b/isbn/9780141439570-L.jpg' },
  { id: '17', titulo: 'Cumbres Borrascosas', autor: 'Emily Brontë', precio: 8500, categoria: 'Romance', imagen: 'https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg' },
  { id: '18', titulo: 'El Alquimista', autor: 'Paulo Coelho', precio: 9500, categoria: 'Ficción', imagen: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg' },
  { id: '19', titulo: 'Crimen y castigo', autor: 'Fiódor Dostoievski', precio: 11000, categoria: 'Clásico', imagen: 'https://covers.openlibrary.org/b/isbn/9780143058144-L.jpg' }
];

const KEY_LIBROS = 'inventarioBookHub';
const KEY_CARRITO = 'carritoBookHub';
const KEY_VERSION = 'catalogoVersion';
const CATALOGO_VERSION = 'v2';

// Genera un id único (string) para un libro nuevo.
export const generarId = () => String(Date.now());

export const dataService = {
  // READ (Inventario). Si no existe o cambió la versión, siembra el catálogo inicial.
  obtenerLibros: () => {
    const local = localStorage.getItem(KEY_LIBROS);
    const version = localStorage.getItem(KEY_VERSION);

    if (!local || version !== CATALOGO_VERSION) {
      localStorage.setItem(KEY_LIBROS, JSON.stringify(LIBROS_INICIALES));
      localStorage.setItem(KEY_VERSION, CATALOGO_VERSION);
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
