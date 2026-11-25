const LIBROS_INICIALES = [
  { id: '1', titulo: 'La Metamorfosis', autor: 'Franz Kafka', precio: 5000, categoria: 'Ficción', descripcion: "El viajante de comercio Gregorio Samsa despierta una mañana convertido en un monstruoso insecto. A través de su progresivo rechazo familiar, la obra retrata la alienación, la culpa y la deshumanización en la sociedad moderna.", imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGGgASkJD7uvRzDSqZ2xfWdiaWrLHPSXO6M-JrnI-jw&s=10' },
  { id: '2', titulo: 'El Señor de los Anillos', autor: 'J.R.R. Tolkien', precio: 16000, categoria: 'Fantasía', descripcion: "El hobbit Frodo Bolsón emprende un peligroso viaje por la Tierra Media para destruir el Anillo Único en el Monte del Destino antes de que el Señor Oscuro Sauron lo recupere y someta al mundo.", imagen: 'https://covers.openlibrary.org/b/isbn/9788445071403-L.jpg' },
  { id: '3', titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', precio: 6000, categoria: 'Infantil', descripcion: "Un aviador varado en el desierto del Sahara conoce a un pequeño príncipe proveniente de un asteroide. Bajo la apariencia de un cuento infantil, ofrece una reflexión poética sobre la amistad, el amor y la mirada adulta.", imagen: 'https://covers.openlibrary.org/b/isbn/9788498381498-L.jpg' },
  { id: '4', titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', precio: 12000, categoria: 'Clásico', descripcion: "Alonso Quijano enloquece tras leer novelas de caballerías y sale a recorrer España como caballero andante junto a su escudero Sancho Panza, protagonizando aventuras que contrastan el idealismo con la cruda realidad.", imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7xOLHSO6ZSY4EQ2qCW3efRjJRsdKIwQOWeaUCOzpnQ&s=10' },
  { id: '5', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', precio: 9000, categoria: 'Ficción', descripcion: "Crónica de siete generaciones de la familia Buendía en el mítico pueblo de Macondo. Obra cumbre del realismo mágico que entrelaza lo cotidiano con lo prodigioso para retratar la historia y el destino de América Latina.", imagen: 'https://covers.openlibrary.org/b/isbn/9788491050292-L.jpg' },
  { id: '6', titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', precio: 8000, categoria: 'Romance', descripcion: "En la Inglaterra rural de principios del siglo XIX, la ingeniosa Elizabeth Bennet y el reservado señor Darcy deben superar sus propios juicios erróneos y las barreras de clase social para descubrir sus verdaderos sentimientos.", imagen: 'https://covers.openlibrary.org/b/isbn/9780142437230-L.jpg' },
  { id: '7', titulo: 'Matar a un ruiseñor', autor: 'Harper Lee', precio: 13000, categoria: 'Drama', descripcion: "Narrada por la pequeña Scout Finch en la Alabama de los años treinta, sigue a su padre, el abogado Atticus Finch, mientras defiende a un hombre negro acusado injustamente, exponiendo el racismo y la pérdida de la inocencia.", imagen: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg' },
  { id: '8', titulo: 'El gran Gatsby', autor: 'F. Scott Fitzgerald', precio: 8000, categoria: 'Clásico', descripcion: "En el Nueva York de los locos años veinte, el misterioso millonario Jay Gatsby organiza fastuosas fiestas con la esperanza de recuperar a Daisy Buchanan, desnudando la superficialidad y el vacío del sueño americano.", imagen: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg' },
  { id: '9', titulo: '1984', autor: 'George Orwell', precio: 6000, categoria: 'Ciencia Ficción', descripcion: "En una Oceanía totalitaria vigilada constantemente por el Gran Hermano, Winston Smith trabaja reescribiendo la historia para el Partido hasta que decide rebelarse en secreto mediante el pensamiento libre y un amor prohibido.", imagen: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg' },
  { id: '10', titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', precio: 14000, categoria: 'Fantasía', descripcion: "Al cumplir once años, el huérfano Harry Potter descubre que es un mago e ingresa al Colegio Hogwarts, donde hace sus primeros amigos y enfrenta los intentos de Lord Voldemort por robar una piedra que otorga la inmortalidad.", imagen: 'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg' },
  { id: '11', titulo: 'El Hobbit', autor: 'J.R.R. Tolkien', precio: 13000, categoria: 'Fantasía', descripcion: "El hogareño Bilbo Bolsón es reclutado por el mago Gandalf y trece enanos para recuperar el tesoro de la Montaña Solitaria, custodiado por el dragón Smaug, en la aventura que antecede a El Señor de los Anillos.", imagen: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg' },
  { id: '12', titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', precio: 7000, categoria: 'Ciencia Ficción', descripcion: "En una sociedad futura donde los libros están prohibidos para evitar el pensamiento crítico, el bombero Guy Montag, encargado de quemarlos, comienza a cuestionar su labor tras conocer a una joven vecina.", imagen: 'https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg' },
  { id: '13', titulo: 'Un mundo feliz', autor: 'Aldous Huxley', precio: 9000, categoria: 'Ciencia Ficción', descripcion: "Retrata una distopía futurista donde la humanidad vive aparentemente satisfecha gracias al condicionamiento genético, el consumismo y una droga llamada soma, a costa de eliminar la familia, el arte y la libertad individual.", imagen: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg' },
  { id: '14', titulo: 'Juego de Tronos', autor: 'George R.R. Martin', precio: 17000, categoria: 'Fantasía', descripcion: "Primera entrega de Canción de hielo y fuego, donde varias casas nobles conspiran y luchan por el Trono de Hierro de Poniente mientras una antigua amenaza sobrenatural despierta más allá del Muro norte.", imagen: 'https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg' },
  { id: '15', titulo: 'Drácula', autor: 'Bram Stoker', precio: 8000, categoria: 'Terror', descripcion: "Narrada mediante cartas y diarios, relata el viaje del abogado Jonathan Harker al castillo del conde Drácula en Transilvania y los esfuerzos de un grupo liderado por Abraham Van Helsing para frenar al vampiro en Londres.", imagen: 'https://covers.openlibrary.org/b/isbn/9780141439846-L.jpg' },
  { id: '16', titulo: 'El retrato de Dorian Gray', autor: 'Oscar Wilde', precio: 7500, categoria: 'Clásico', descripcion: "El joven y apuesto Dorian Gray conserva su juventud eterna mientras un retrato suyo envejece y refleja cada uno de sus vicios y crímenes, explorando el hedonismo, la vanidad y la corrupción moral.", imagen: 'https://covers.openlibrary.org/b/isbn/9780141439570-L.jpg' },
  { id: '17', titulo: 'Cumbres Borrascosas', autor: 'Emily Brontë', precio: 8500, categoria: 'Romance', descripcion: "En los páramos de Yorkshire, la intensa y destructiva pasión entre Heathcliff y Catherine Earnshaw desata una espiral de obsesión y venganza que marca a dos generaciones de sus familias.", imagen: 'https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg' },
  { id: '18', titulo: 'El Alquimista', autor: 'Paulo Coelho', precio: 9500, categoria: 'Ficción', descripcion: "Santiago, un joven pastor andaluz, viaja desde España hasta las pirámides de Egipto tras un sueño recurrente sobre un tesoro, aprendiendo en el camino a escuchar su corazón y perseguir su «Leyenda Personal».", imagen: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg' },
  { id: '19', titulo: 'Crimen y castigo', autor: 'Fiódor Dostoievski', precio: 11000, categoria: 'Clásico', descripcion: "En San Petersburgo, el estudiante empobrecido Rodión Raskólnikov asesina a una usurera creyéndose un ser extraordinario por encima de la moral, pero el remordimiento y la culpa lo arrastran hacia una profunda crisis psicológica.", imagen: 'https://covers.openlibrary.org/b/isbn/9780143058144-L.jpg' }
];

const KEY_LIBROS = 'inventarioBookHub';
const KEY_CARRITO = 'carritoBookHub';
const KEY_VERSION = 'catalogoVersion';
const KEY_CATEGORIAS = 'categoriasBookHub';
const KEY_OFERTAS = 'ofertasBookHub';
const KEY_PEDIDOS = 'pedidosBookHub';
const CATALOGO_VERSION = 'v3';

// Categorías iniciales: las distintas que trae el catálogo base.
const CATEGORIAS_INICIALES = [...new Set(LIBROS_INICIALES.map((l) => l.categoria))];

// Pedidos de ejemplo para que el panel tenga datos desde el primer inicio.
const PEDIDOS_INICIALES = [
  {
    id: 'p-1001',
    nroOrden: '#20240705',
    cliente: 'Ana Pérez',
    correo: 'ana.perez@correo.cl',
    direccion: 'Los Crisantemos 123',
    comuna: 'Cerrillos',
    fecha: '2026-10-10',
    estado: 'Pagado',
    total: 16000,
    items: [
      { titulo: 'La Metamorfosis', cantidad: 2, precio: 5000 },
      { titulo: 'El Principito', cantidad: 1, precio: 6000 }
    ]
  },
  {
    id: 'p-1002',
    nroOrden: '#20240706',
    cliente: 'Diego Rojas',
    correo: 'diego.rojas@correo.cl',
    direccion: 'Av. Providencia 456',
    comuna: 'Providencia',
    fecha: '2026-10-12',
    estado: 'Enviado',
    total: 6000,
    items: [{ titulo: '1984', cantidad: 1, precio: 6000 }]
  }
];

// Genera un id único (string) para un libro nuevo.
export const generarId = () => String(Date.now());

export const dataService = {
  // ===================== INVENTARIO (Libros) =====================

  // READ (todos). Si no existe o cambió la versión, siembra el catálogo inicial.
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

  // READ (uno). Devuelve el libro con ese id o null si no existe.
  obtenerLibroPorId: (id) => {
    const libro = dataService
      .obtenerLibros()
      .find((l) => String(l.id) === String(id));
    return libro || null;
  },

  // WRITE. Persiste la lista completa de libros.
  guardarLibros: (libros) => {
    localStorage.setItem(KEY_LIBROS, JSON.stringify(libros));
  },

  // CREATE. Agrega un libro (genera id si no viene) y devuelve la lista actualizada.
  crearLibro: (datos) => {
    const nuevoLibro = {
      ...datos,
      id: datos.id ? String(datos.id) : generarId()
    };
    const libros = [...dataService.obtenerLibros(), nuevoLibro];
    dataService.guardarLibros(libros);
    return libros;
  },

  // UPDATE. Modifica un libro por id y devuelve la lista actualizada.
  actualizarLibro: (id, cambios) => {
    const libros = dataService.obtenerLibros().map((libro) =>
      String(libro.id) === String(id)
        ? { ...libro, ...cambios, id: libro.id }
        : libro
    );
    dataService.guardarLibros(libros);
    return libros;
  },

  // DELETE. Quita un libro por id y devuelve la lista actualizada.
  eliminarLibro: (id) => {
    const libros = dataService
      .obtenerLibros()
      .filter((libro) => String(libro.id) !== String(id));
    dataService.guardarLibros(libros);
    return libros;
  },

  // ===================== CARRITO =====================

  // READ (Carrito)
  obtenerCarrito: () => {
    const local = localStorage.getItem(KEY_CARRITO);
    return local ? JSON.parse(local) : [];
  },

  // WRITE (Carrito)
  guardarCarrito: (carrito) => {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
  },

  // ===================== CATEGORÍAS =====================

  // READ. Siembra las categorías del catálogo base la primera vez.
  obtenerCategorias: () => {
    const local = localStorage.getItem(KEY_CATEGORIAS);
    if (!local) {
      localStorage.setItem(KEY_CATEGORIAS, JSON.stringify(CATEGORIAS_INICIALES));
      return CATEGORIAS_INICIALES;
    }
    return JSON.parse(local);
  },

  // WRITE
  guardarCategorias: (categorias) => {
    localStorage.setItem(KEY_CATEGORIAS, JSON.stringify(categorias));
  },

  // CREATE. Evita duplicados (sin importar mayúsculas) y devuelve la lista.
  crearCategoria: (nombre) => {
    const limpio = String(nombre).trim();
    const categorias = dataService.obtenerCategorias();

    if (limpio === '' || categorias.some((c) => c.toLowerCase() === limpio.toLowerCase())) {
      return categorias;
    }

    const actualizadas = [...categorias, limpio];
    dataService.guardarCategorias(actualizadas);
    return actualizadas;
  },

  // DELETE
  eliminarCategoria: (nombre) => {
    const actualizadas = dataService
      .obtenerCategorias()
      .filter((c) => c !== nombre);
    dataService.guardarCategorias(actualizadas);
    return actualizadas;
  },

  // ===================== OFERTAS =====================
  // Una oferta descuenta un porcentaje (1-99) del precio de un libro.

  // READ
  obtenerOfertas: () => {
    const local = localStorage.getItem(KEY_OFERTAS);
    return local ? JSON.parse(local) : [];
  },

  // WRITE
  guardarOfertas: (ofertas) => {
    localStorage.setItem(KEY_OFERTAS, JSON.stringify(ofertas));
  },

  // CREATE / UPDATE. Si el libro ya tenía oferta, actualiza su descuento.
  crearOferta: (libroId, descuento) => {
    const ofertas = dataService.obtenerOfertas();
    const existe = ofertas.some((o) => String(o.libroId) === String(libroId));

    const actualizadas = existe
      ? ofertas.map((o) =>
          String(o.libroId) === String(libroId)
            ? { ...o, descuento: Number(descuento) }
            : o
        )
      : [
          ...ofertas,
          { id: generarId(), libroId: String(libroId), descuento: Number(descuento) }
        ];

    dataService.guardarOfertas(actualizadas);
    return actualizadas;
  },

  // DELETE
  eliminarOferta: (id) => {
    const actualizadas = dataService
      .obtenerOfertas()
      .filter((o) => String(o.id) !== String(id));
    dataService.guardarOfertas(actualizadas);
    return actualizadas;
  },

  // ===================== PEDIDOS =====================

  // READ. Siembra pedidos de ejemplo la primera vez.
  obtenerPedidos: () => {
    const local = localStorage.getItem(KEY_PEDIDOS);
    if (!local) {
      localStorage.setItem(KEY_PEDIDOS, JSON.stringify(PEDIDOS_INICIALES));
      return PEDIDOS_INICIALES;
    }
    return JSON.parse(local);
  },

  // WRITE
  guardarPedidos: (pedidos) => {
    localStorage.setItem(KEY_PEDIDOS, JSON.stringify(pedidos));
  },

  // CREATE. Registra un pedido nuevo (los más recientes primero).
  registrarPedido: (pedido) => {
    const nuevoPedido = {
      id: pedido.id || generarId(),
      estado: pedido.estado || 'Pagado',
      fecha: pedido.fecha || new Date().toISOString().slice(0, 10),
      ...pedido
    };
    const pedidos = [nuevoPedido, ...dataService.obtenerPedidos()];
    dataService.guardarPedidos(pedidos);
    return pedidos;
  },

  // UPDATE. Cambia el estado de un pedido por id.
  actualizarEstadoPedido: (id, estado) => {
    const pedidos = dataService
      .obtenerPedidos()
      .map((p) => (String(p.id) === String(id) ? { ...p, estado } : p));
    dataService.guardarPedidos(pedidos);
    return pedidos;
  },

  // DELETE
  eliminarPedido: (id) => {
    const pedidos = dataService
      .obtenerPedidos()
      .filter((p) => String(p.id) !== String(id));
    dataService.guardarPedidos(pedidos);
    return pedidos;
  }
};
