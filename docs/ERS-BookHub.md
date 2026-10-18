# Especificación de Requisitos del Software (ERS)

## Proyecto: BookHub — tienda online de libros

| | |
|---|---|
| **Asignatura** | DSY1104 — Desarrollo Fullstack II |
| **Evaluación** | Parcial N° 2 — Implementando frontend y pruebas unitarias |
| **Equipo** | Matías, Sofía y Martín |
| **Repositorio** | https://github.com/Matitox0/BookHub-React |
| **Versión del documento** | 2.0 (actualizada para la entrega de la EP2) |
| **Fecha** | Octubre de 2026 |

### Historial de cambios

| Versión | Cambios |
|---|---|
| 1.0 | ERS inicial con el planteamiento del catálogo y el carrito de compras (Evaluación Parcial 1). |
| 1.1 | Se agregó el módulo de sesión (registro / login / perfil) y el panel de administración. |
| 2.0 | Se reescribe el frontend sobre React, se reorganiza en componentes, se incorpora Bootstrap para lo responsivo y se agrega el plan de pruebas unitarias. Se suman las vistas de la tienda (Categorías y Ofertas), el panel de administración por secciones (resumen, productos, categorías, ofertas y pedidos), las ofertas aplicadas al precio y la vista de pago rechazado. |

---

## 1. Introducción

### 1.1 ¿Para qué sirve este documento?

Este documento describe **qué debe hacer** BookHub y **cómo se espera que se comporte**, sin entrar en demasiado detalle de cómo está programado cada archivo (para eso está el código y el README). La idea es que sirva de referencia común para nosotros como equipo y para que el docente pueda entender el alcance real de la tienda antes de revisar la implementación.

Lo fuimos actualizando a medida que avanzábamos: la primera versión era bastante más corta y solo cubría el catálogo y el carrito; en esta versión ya están incorporados la sesión de usuario, el panel de administración y —lo que corresponde a esta entrega— los requisitos de prueba unitaria.

### 1.2 Alcance

BookHub es una **aplicación web de una sola página (SPA)** para vender libros. El alcance de esta entrega cubre:

- Explorar el catálogo de libros.
- Buscar libros por título o autor.
- Paginar los resultados.
- Agregar libros a un carrito y administrarlo.
- Simular un checkout con datos de despacho y una pantalla de compra exitosa.
- Registrar usuarios, iniciar y cerrar sesión, y ver un perfil básico.
- Administrar el inventario (agregar, editar y eliminar libros).
- Aplicar ofertas sobre el precio de los libros en la tienda.
- Gestionar el panel de administración (resumen, productos, categorías, ofertas y pedidos).
- Probar unitariamente los componentes del frontend con Jasmine y Karma.

**Queda fuera de esta entrega:** un backend real con base de datos, autenticación segura, pasarela de pago real y despliegue con dominio propio. Todo el estado se guarda en el navegador (localStorage), lo cual nos sirve para el objetivo de la asignatura pero no para producción.

### 1.3 Glosario

- **Libro / ítem del inventario:** objeto con `id`, `titulo`, `autor`, `precio`, `categoria` e `imagen`.
- **Catálogo:** la lista completa de libros disponibles (`inventarioBookHub` en localStorage).
- **Carrito:** la lista de libros seleccionados con su cantidad (`carritoBookHub`).
- **Sesión:** el correo del usuario que tiene sesión activa (`sesionActivaBookHub`).
- **Perfil:** los datos guardados del usuario registrado (`perfilBookHub`): nombre, correo, género literario y contraseña.
- **Categoría:** agrupación de libros (`categoriasBookHub`).
- **Oferta:** descuento (en %) asociado a un libro (`ofertasBookHub`).
- **Pedido:** registro de una compra realizada (`pedidosBookHub`).
- **Administrador:** cuenta con permisos para gestionar el inventario (`admin@bookhub.cl`).
- **Componente:** unidad reutilizable del frontend (siguiendo *Atomic Design*: átomos, moléculas, organismos y plantillas).

---

## 2. Descripción general

### 2.1 De qué se trata BookHub

BookHub es la típica tienda de libros online: un catálogo con portadas, un buscador, un carrito y un proceso de compra. La armamos pensando en que cualquier persona pueda entrar sin registrarse, mirar los libros y armar su carrito; y que quien se registre pueda además administrar el inventario si corresponde.

El catálogo parte con 19 libros clásicos y de fantasía cargados por defecto, pero se pueden agregar o quitar desde el panel de administración.

### 2.2 Cómo está armado el producto

El frontend está construido con **React 19**, empaquetado con **Vite** y con **React Router 7** para la navegación entre páginas sin recargar. Los estilos y lo responsivo se apoyan en **Bootstrap 5**, con algunos estilos propios sobre `bootstrap-theme.css`.

Los componentes están organizados con **Atomic Design**:

- **átomos:** `Button`, `Input`.
- **moléculas:** `BookCard`, `FormField`, `Pagination`, `QuantySelector`, `SearchForm`.
- **organismos:** `AdminForm`, `BookGrid`, `Footer`, `Header`.
- **plantillas:** `MainLayout` (header + contenido + footer).

El estado "vivo" de la aplicación (libros, carrito y sesión) se maneja en `App.jsx` con `useState` y se comparte hacia abajo por *props*. La persistencia la resuelve `src/service/dataService.js`, que lee y escribe en `localStorage` (inventario, carrito, categorías, ofertas y pedidos). El cálculo del precio con descuento vive en `src/service/ofertaService.js`, y el control de acceso del administrador en `src/service/authService.js`.

### 2.3 Usuarios

| Tipo de usuario | Qué puede hacer |
|---|---|
| **Visitante** | Ver el catálogo, buscar, paginar y armar un carrito. |
| **Cliente registrado** | Todo lo anterior + iniciar/cerrar sesión y ver su perfil. |
| **Administrador** | Todo lo anterior + entrar al panel `/admin` para agregar, editar y eliminar libros. |

> El administrador es una cuenta fija, `admin@bookhub.cl`. El control de acceso está en `src/service/authService.js`: si el correo de la sesión no es el del administrador, el enlace "Administrador" no aparece en el menú y el panel muestra un mensaje de "Acceso restringido". Como no hay backend, las credenciales viven en el frontend; en un proyecto real irían en el servidor con la contraseña hasheada.

### 2.4 Funciones principales (resumen)

1. Mostrar el catálogo paginado.
2. Buscar por título o autor y mostrar todos.
3. Ver el detalle de cada libro en una tarjeta y elegir la cantidad.
4. Agregar al carrito, ver subtotales, eliminar ítems y vaciar el carrito.
5. Finalizar la compra con datos del cliente y comuna de despacho.
6. Mostrar una pantalla de confirmación con el número de orden.
7. Registrarse, iniciar sesión, ver el perfil y cerrar sesión.
8. Administrar el inventario de libros.
9. Aplicar **ofertas** (descuentos definidos por el administrador) sobre el precio mostrado en la tienda.
10. Gestionar el **panel de administración** por secciones: resumen, productos, categorías, ofertas y pedidos.

### 2.5 Restricciones

- El proyecto debe correr en el navegador con `npm run dev` y compilar con `npm run build`.
- El diseño tiene que ser **responsivo** (celular, tablet y escritorio) usando Bootstrap.
- Las pruebas unitarias deben usar **Jasmine y Karma**, tal como pide la evaluación.
- Por tiempo, no hay backend: la "base de datos" es `localStorage`.
- El número de orden (`#20240705`) es un valor fijo de ejemplo, no viene de ninguna pasarela real.

### 2.6 Supuestos y dependencias

- Suponemos que el navegador soporta `localStorage` y ES6+ (Chrome, Edge, Firefox actuales).
- Las portadas de los libros se cargan desde URLs externas (Open Library y otras), así que si esas URLs caen, se pierde la imagen pero no la funcionalidad.
- Dependemos de: React, React Router, Bootstrap, Vite, Jasmine, Karma y Testing Library (ver `package.json`).

---

## 3. Requisitos funcionales

| ID | Requisito | Descripción | Prioridad |
|---|---|---|---|
| RF-01 | Ver catálogo | Al entrar a `/`, se muestra el catálogo paginado de 6 libros por página. | Alta |
| RF-02 | Buscar libros | El usuario escribe un título o autor y el sistema filtra el catálogo. Si no hay coincidencias, avisa con un mensaje. | Alta |
| RF-03 | Mostrar todos | Un botón limpia la búsqueda y muestra el catálogo completo desde la primera página. | Media |
| RF-04 | Paginar | Se generan botones por página, con "Anterior" y "Siguiente" deshabilitados en los extremos. | Media |
| RF-05 | Ver tarjeta de libro | Cada libro muestra portada, título, autor, precio y un selector de cantidad. | Alta |
| RF-06 | Agregar al carrito | Al pulsar "Agregar al carrito", el libro entra al carrito con la cantidad elegida. Si ya existía, se suma la cantidad. | Alta |
| RF-07 | Validar cantidad | No se aceptan cantidades menores a 1 ni valores no numéricos. | Media |
| RF-08 | Ver carrito | `/cart` muestra los ítems, el precio unitario, la cantidad, el subtotal y el total. | Alta |
| RF-09 | Modificar carrito | El usuario puede eliminar un ítem o vaciar el carrito completo. | Alta |
| RF-10 | Checkout | `/checkout` pide nombre, correo, dirección y comuna, y muestra el resumen del pedido con el total. | Alta |
| RF-11 | Confirmar compra | Al pagar, se vacía el carrito y se redirige a `/pago-exitoso` con el número de orden y los datos de despacho. | Media |
| RF-12 | Registrar usuario | El usuario crea una cuenta con nombre, correo, género literario y contraseña (mínimo 6 caracteres). | Alta |
| RF-13 | Iniciar sesión | El acceso valida que el correo y la contraseña coincidan con el perfil guardado. | Alta |
| RF-14 | Ver perfil | Con sesión activa, `/login` muestra el perfil del usuario y un botón para cerrar sesión. | Media |
| RF-15 | Cerrar sesión | Se elimina la sesión activa y el usuario vuelve al estado de visitante. | Media |
| RF-16 | Proteger el panel | `/admin` solo es accesible para la cuenta de administrador. Sin sesión redirige a `/login`; con una sesión de cliente muestra "Acceso restringido". | Alta |
| RF-17 | Agregar libro | El administrador agrega un libro con título, autor y precio. | Alta |
| RF-18 | Editar libro | El administrador selecciona un libro, edita sus datos y guarda los cambios. | Alta |
| RF-19 | Eliminar libro | El administrador elimina un libro, pidiendo confirmación antes. | Alta |
| RF-20 | Persistencia | El catálogo, el carrito, la sesión y el perfil se conservan al recargar la página. | Alta |
| RF-21 | Aplicar ofertas en la tienda | Los libros con oferta muestran el precio original tachado, el descuento y el precio rebajado; al agregarlos al carrito se usa el precio rebajado. | Alta |
| RF-22 | Gestionar categorías | El administrador crea y elimina categorías (no se puede borrar una con libros asignados). | Media |
| RF-23 | Gestionar ofertas | El administrador asigna un descuento (1-99%) a un libro y puede quitarlo. | Media |
| RF-24 | Gestionar pedidos | Cada compra registra un pedido; el administrador ve el historial y cambia su estado. | Media |
| RF-25 | Rechazo de pago | Si los datos de la tarjeta son inválidos, el pago se rechaza, el carrito se conserva y se muestra la vista `/pago-fallido` con el motivo. | Media |

---

## 4. Requisitos no funcionales

| ID | Requisito | Cómo lo cumplimos |
|---|---|---|
| RNF-01 | **Responsividad** | Grillas de Bootstrap: `col-12 col-sm-6 col-lg-4` en el catálogo, `col-12 col-md-8 col-lg-6` en formularios, `navbar-expand-lg` en el header. |
| RNF-02 | **Usabilidad** | Navegación siempre visible en el header, mensajes claros cuando algo falla (por ejemplo, "No se encontraron libros"). |
| RNF-03 | **Compatibilidad** | Probado en Chrome y Edge; el build de Vite es estándar. |
| RNF-04 | **Rendimiento** | La búsqueda y la paginación se resuelven en memoria con `filter` y `slice`; para 19 libros es instantáneo. |
| RNF-05 | **Mantenibilidad** | Componentes pequeños con responsabilidad única, organizados por Atomic Design. |
| RNF-06 | **Calidad / pruebas** | Pruebas unitarias con Jasmine + Karma que cubren los componentes del frontend (ver documento de cobertura). |
| RNF-07 | **Accesibilidad básica** | Uso de `label` asociado a cada `input`, `alt` en las portadas y `aria-label` en el botón del menú y la paginación. |

---

## 5. Interfaces

### 5.1 Interfaz de usuario (páginas)

| Ruta | Pantalla | Qué muestra |
|---|---|---|
| `/` | Inicio | Buscador, contador de resultados, grilla de libros y paginación. |
| `/categorias` | Categorías | Botones por categoría (con conteo de libros) y grilla filtrada por la categoría elegida. |
| `/ofertas` | Ofertas | Grilla con los libros que tienen una oferta vigente. |
| `/cart` | Carrito | Tabla de ítems, total, botones "Vaciar" y "Finalizar Compra". |
| `/checkout` | Finalizar pedido | Resumen del pedido + formulario de cliente, despacho y datos de pago. |
| `/pago-exitoso` | Compra exitosa | Confirmación, número de orden y datos de entrega. |
| `/pago-fallido` | Pago rechazado | Se muestra cuando la pasarela simulada rechaza el pago; incluye el motivo del rechazo y opciones para reintentar. |
| `/login` | Acceso / Perfil | Formulario de login, formulario de registro o el perfil si hay sesión. |
| `/admin` | Panel: Resumen | Métricas (libros, categorías, ofertas, pedidos e ingresos) y últimos pedidos. |
| `/admin/productos` | Panel: Productos | Formulario para agregar/editar libros + inventario con buscador. |
| `/admin/categorias` | Panel: Categorías | Alta y baja de categorías con el conteo de libros asociados. |
| `/admin/ofertas` | Panel: Ofertas | Asignar y quitar descuentos por libro, con el precio final calculado. |
| `/admin/pedidos` | Panel: Pedidos | Historial de pedidos y cambio de estado. |

Todas las pantallas comparten el `MainLayout`, que arma el header con la navegación y el footer.

### 5.2 Interfaces de software

- **React 19** y **React Router 7** para la interfaz y la navegación.
- **Bootstrap 5**, importado desde `main.jsx`, como base de estilos.
- **API de `localStorage`** del navegador como almacenamiento (claves: `inventarioBookHub`, `carritoBookHub`, `categoriasBookHub`, `ofertasBookHub`, `pedidosBookHub`, `sesionActivaBookHub`, `perfilBookHub`, `catalogoVersion`).
- **Jasmine + Karma + Testing Library** para las pruebas.

### 5.3 Interfaces de hardware y comunicación

No hay hardware especial ni comunicación con servidores propios. El único tráfico de red externo son las imágenes de las portadas.

---

## 6. Modelo de datos

### Libro

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | string | Identificador único. Para libros nuevos se genera con `Date.now()`. |
| `titulo` | string | Nombre del libro. |
| `autor` | string | Autor. |
| `precio` | number | Precio en pesos. |
| `categoria` | string | Categoría (solo en el catálogo inicial). |
| `imagen` | string | URL de la portada (opcional). |

### Ítem de carrito

Es un libro más un campo `cantidad` (number).

### Perfil

| Campo | Tipo |
|---|---|
| `nombre` | string |
| `email` | string |
| `genero` | string |
| `clave` | string |

### Oferta

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | string | Identificador de la oferta. |
| `libroId` | string | Id del libro al que aplica. |
| `descuento` | number | Porcentaje de descuento (entre 1 y 99). |

### Pedido

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | string | Identificador del pedido. |
| `nroOrden` | string | Número de orden mostrado al cliente. |
| `cliente`, `correo`, `direccion`, `comuna` | string | Datos del cliente y del despacho. |
| `fecha` | string | Fecha del pedido (formato `YYYY-MM-DD`). |
| `estado` | string | Pendiente, Pagado, Enviado, Entregado o Cancelado. |
| `items` | array | Productos comprados (`titulo`, `cantidad`, `precio`). |
| `total` | number | Total del pedido. |

### Almacenamiento en localStorage

| Clave | Contenido |
|---|---|
| `inventarioBookHub` | Lista de libros (JSON). |
| `carritoBookHub` | Lista de ítems del carrito (JSON). |
| `categoriasBookHub` | Lista de categorías (JSON). |
| `ofertasBookHub` | Lista de ofertas vigentes (JSON). |
| `pedidosBookHub` | Lista de pedidos registrados (JSON). |
| `sesionActivaBookHub` | Correo del usuario con sesión activa. |
| `perfilBookHub` | Datos del usuario registrado (JSON). |
| `catalogoVersion` | Marca de versión del catálogo (`v2`). Si no coincide, se vuelve a sembrar el catálogo inicial. |

> Este último (`catalogoVersion`) lo agregamos porque, mientras desarrollábamos, cambiar los libros iniciales no se reflejaba en los navegadores que ya tenían el catálogo viejo guardado. Con la versión forzamos a recargar el catálogo cuando cambia.

---

## 7. Flujos principales

### 7.1 Comprar un libro

1. El visitante entra a `/` y ve el catálogo.
2. Busca por título o autor (o ve todos).
3. Elige la cantidad en la tarjeta y pulsa "Agregar al carrito".
4. Va a `/cart`, revisa subtotales y total; puede eliminar ítems.
5. Pulsa "Finalizar Compra" y completa los datos en `/checkout`.
6. Al pagar, el carrito se vacía y se muestra `/pago-exitoso` con el resumen. Si los datos de la tarjeta son inválidos, el pago se rechaza, **el carrito se conserva** y se muestra `/pago-fallido` con el motivo.

### 7.2 Registrarse e iniciar sesión

1. En el header, el visitante entra a "Acceder / Registrarse".
2. Crea su cuenta (la contraseña debe tener al menos 6 caracteres).
3. Vuelve al login e ingresa con su correo y contraseña.
4. El header pasa a mostrar "Mi Perfil" y el usuario ve sus datos.

### 7.3 Administrar la tienda desde el panel

1. El administrador inicia sesión con su cuenta en `/login` y entra a `/admin` (si no hay sesión, lo manda al login; si la sesión es de un cliente, ve "Acceso restringido").
2. En **Resumen** ve las métricas (libros, categorías, ofertas, pedidos e ingresos).
3. En **Productos** agrega un libro, o pulsa "Editar" en uno existente, y puede eliminar (con confirmación).
4. En **Categorías** crea y elimina categorías; en **Ofertas** asigna o quita un descuento a un libro.
5. En **Pedidos** revisa el historial y cambia el estado de cada pedido.
6. Los cambios se guardan en `localStorage` y se reflejan en la tienda (catálogo y precios con oferta).

---

## 8. Requisitos de pruebas

Esta sección responde a lo que pide la Evaluación Parcial N° 2:

- **RP-01:** Cada componente del frontend debe tener pruebas unitarias.
- **RP-02:** Las pruebas deben verificar la lógica y el comportamiento, no solo que el componente se renderice.
- **RP-03:** Se debe usar Jasmine y Karma como entorno de pruebas.
- **RP-04:** Se deben usar *mocks* (`jasmine.createSpy`) para comprobar las llamadas a callbacks (props como `onClick`, `onChange`, `alAgregarAlCarrito`).
- **RP-05:** Se debe generar y analizar un reporte de cobertura de código.

El detalle de cómo quedaron estas pruebas, los resultados y el alcance de la cobertura están en el documento **"Cobertura de Testing"** que acompaña a esta entrega. En resumen: 45 casos de prueba sobre los 12 componentes, todos en verde, con 100% de cobertura en los archivos incluidos en el alcance.

---

## 9. Trazabilidad (requisito ↔ componente ↔ prueba)

| Requisito | Componente principal | Archivo de prueba |
|---|---|---|
| RF-05, RF-06 | `BookCard`, `QuantySelector` | `BookCard.spec.jsx`, `QuantySelector.spec.jsx` |
| RF-01, RF-02, RF-03 | `SearchForm`, `BookGrid` | `SearchForm.spec.jsx`, `BookGrid.spec.jsx` |
| RF-04 | `Pagination` | `Pagination.spec.jsx` |
| RF-17, RF-18, RF-19 | `AdminForm` | `AdminForm.spec.jsx` |
| RF-16 (control de acceso) | `Header` (enlace solo para admin) | `Header.spec.jsx` |
| RF-12, RF-13, RF-14 | `FormField`, `Button`, `Input` | `FormField.spec.jsx`, `Button.spec.jsx`, `Input.spec.jsx` |
| RF-21, RF-23 | `BookCard` (precio con oferta) y `ofertaService` | `BookCard.spec.jsx` (+ validación manual del flujo de ofertas) |
| RF-22, RF-24, RF-25 | Páginas `pages/admin/*`, `Checkout`, `PaymentFailure` | Validación manual (fuera del alcance unitario) |
| Navegación general | `Header`, `Footer`, `MainLayout` | `Header.spec.jsx`, `Footer.spec.jsx`, `MainLayout.spec.jsx` |

---

## 10. Limitaciones conocidas y trabajo futuro

Somos conscientes de varios puntos que quedaron pendientes y preferimos dejarlos escritos:

- **Los mensajes usan `alert()`.** Funciona, pero se ve antiguo; lo ideal sería un componente de notificaciones.
- **La contraseña se guarda tal cual en `localStorage`.** Es un problema de seguridad real; en un proyecto serio iría con hash y backend.
- **El administrador es una cuenta fija.** Las credenciales están en el frontend (`authService.js`), así que no es un control de acceso seguro. En un proyecto real iría en el servidor, con roles y contraseña hasheada.
- **La paginación carga todos los libros de una vez.** Para 19 libros no es problema; con miles convendría paginar del lado del servidor.
- **Cobertura acotada a componentes.** Las pruebas unitarias cubren los 12 componentes; las páginas y el `dataService` quedaron fuera del alcance de esta entrega y se validaron de forma manual.
- **El número de orden es fijo.** Falta conectar una pasarela real.

Como trabajo futuro, nos gustaría agregar un backend con base de datos, roles de usuario, validaciones más completas y pruebas para las páginas.
