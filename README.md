# BookHub — Tienda online de libros

Proyecto frontend desarrollado con **React** para la asignatura **DSY1104 — Desarrollo Fullstack II**
(Evaluación Parcial N° 2: *Implementando frontend y pruebas unitarias a mi tienda online*).

BookHub es una tienda online de libros que permite explorar el catálogo, buscar y filtrar
libros, agregarlos a un carrito de compras, registrarse / iniciar sesión y administrar el
inventario desde un panel de administración.

## 👥 Integrantes del equipo

- Matías
- Sofía
- Martín

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Framework de JavaScript para la construcción de la interfaz |
| [Vite](https://vitejs.dev/) | Entorno de desarrollo y empaquetado |
| [React Router 7](https://reactrouter.com/) | Navegación entre páginas (SPA) |
| [Bootstrap 5](https://getbootstrap.com/) | Diseño responsivo y componentes de UI |
| [Jasmine](https://jasmine.github.io/) + [Karma](https://karma-runner.github.io/) | Pruebas unitarias |
| [Testing Library](https://testing-library.com/) | Renderizado y consultas del DOM en las pruebas |

## 📁 Estructura del proyecto

```
src/
├── components/          # Componentes organizados con Atomic Design
│   ├── atoms/           #   Button, Input
│   ├── molecules/       #   BookCard, FormField, Pagination, QuantySelector, SearchForm
│   ├── organisms/       #   AdminForm, BookGrid, Footer, Header
│   └── templates/       #   MainLayout
├── pages/               # Páginas de la aplicación
│   ├── Home.jsx         #   Catálogo + búsqueda + paginación
│   ├── Cart.jsx         #   Carrito de compras
│   ├── Checkout.jsx     #   Finalización del pedido
│   ├── Login.jsx        #   Registro / inicio de sesión / perfil
│   ├── Admin.jsx        #   Panel de administración del inventario
│   └── PaymentSuccess.jsx
├── service/
│   ├── dataService.js   # Persistencia en localStorage (inventario y carrito)
│   └── authService.js   # Credenciales y control de acceso del administrador
├── styles/              # Estilos personalizados (tema Bootstrap, Header, átomos)
├── test/                # Pruebas unitarias (*.spec.jsx) + setupTests.js
├── App.jsx              # Componente raíz y definición de rutas
└── main.jsx             # Punto de entrada de la aplicación
```
El ERS y el documento de cobertura de testing están en la carpeta [`docs/`](docs/).

## 🧩 Componentes, propiedades y estados

El proyecto sigue el patrón **Atomic Design** y aprovecha las *props* y el estado (`useState`)
de React para su funcionamiento:

- **Props:** permiten personalizar y comunicar los componentes entre sí
  (por ejemplo `Button` recibe `children` y `onClick`; `BookCard` recibe `libro` y
  `alAgregarAlCarrito`; `Header` recibe `usuarioLogueado`).
- **Estados:** gestionan datos internos que cambian con la interacción del usuario
  (por ejemplo el menú desplegable en `Header`, la cantidad seleccionada en `BookCard`,
  y los campos de los formularios en `Login`, `Checkout` y `Admin`).

## 📱 Diseño responsivo con Bootstrap

El diseño se adapta a distintos tamaños de pantalla mediante el sistema de grillas y las
utilidades de Bootstrap, por ejemplo:

- `navbar navbar-expand-lg` en el `Header` para el menú colapsable en móviles.
- `container` + `row` + `col-12 col-md-6 col-lg-4` en el catálogo y los formularios.
- Clases utilitarias como `d-flex`, `mt-auto`, `w-100` y `shadow-sm` para el layout.

## 🛠️ Instalación y ejecución

Requisitos: **Node.js 18+** y **npm**.

```bash
# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar la compilación de producción
npm run preview
```

## 🔑 Acceso de administrador

El panel de administración (`/admin`) está protegido: solo la cuenta de administrador puede
gestionar el inventario. Para entrar, inicia sesión en `/login` con:

| Campo | Valor |
|---|---|
| Correo | `admin@bookhub.cl` |
| Contraseña | `admin123` |

Con una cuenta de cliente normal, el enlace "Administrador" **no** aparece en el menú y el
panel muestra un mensaje de "Acceso restringido".

> Nota: al no haber backend, estas credenciales viven en el frontend
> (`src/service/authService.js`). En un proyecto real irían en el servidor y con la
> contraseña hasheada.

## ✅ Pruebas unitarias (Jasmine + Karma)

El proyecto cuenta con **44 casos de prueba** distribuidos en **12 archivos `*.spec.jsx`**,
que verifican la lógica, el comportamiento y la manipulación del DOM de los componentes
frontend. Todas las pruebas pasan (`TOTAL: 44 SUCCESS`).

```bash
# Ejecutar las pruebas unitarias
npm test

# Ejecutar el linter
npm run lint
```

### Cobertura del testing

Las pruebas se ejecutan con **Karma Headless** y generan un reporte de cobertura de código
(Istanbul) en la carpeta `coverage/`. Sobre los 12 componentes del alcance la cobertura es
del **100%** en statements, branches, functions y lines.

```bash
# Ejecutar pruebas y generar el reporte de cobertura
npm test
# El reporte HTML queda en: coverage/index.html
```

Componentes cubiertos por las pruebas: `Button`, `Input`, `BookCard`, `FormField`,
`Pagination`, `QuantySelector`, `SearchForm`, `AdminForm`, `BookGrid`, `Footer`, `Header`
y `MainLayout`.

### Conceptos de testing aplicados

- **Configuración del entorno:** `karma.config.cjs` (frameworks, preprocesadores,
  `babel-plugin-istanbul` para la cobertura, navegador `ChromeHeadless`) y `setupTests.js`
  (matchers de Testing Library).
- **Escritura de pruebas:** bloques `describe` / `it` con `expect`, usando
  `@testing-library/react` para renderizar y consultar el DOM.
- **Uso de mocks:** `jasmine.createSpy` para verificar llamadas a callbacks
  (`onClick`, `onChange`, `alAgregarAlCarrito`, etc.).
- **Análisis de resultados:** reporte de cobertura generado con `karma-coverage`.

## 📄 Documentación

- **ERS** — [Especificación de Requisitos del Software](docs/ERS-BookHub.md).
- **Documento de cobertura de testing** — [alcance del testing](docs/Documento-de-Cobertura-Testing.md).
