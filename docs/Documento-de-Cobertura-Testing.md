# Documento de Cobertura de Testing

## Proyecto: BookHub — tienda online de libros

| | |
|---|---|
| **Asignatura** | DSY1104 — Desarrollo Fullstack II |
| **Evaluación** | Parcial N° 2 |
| **Equipo** | Matías, Sofía y Martín |
| **Herramientas** | Jasmine, Karma, karma-webpack, karma-coverage, Testing Library |
| **Fecha** | Octubre de 2026 |

Este documento explica **qué probamos, cómo lo probamos y qué tan lejos llegamos** con las pruebas unitarias del frontend. La idea no es solo mostrar el porcentaje final, sino también dejar claro qué queda dentro y qué queda fuera del alcance, para no engañarnos con un número bonito.

---

## 1. Objetivo

Verificar el comportamiento de los **componentes del frontend** de BookHub de forma aislada, comprobando:

- que renderizan lo que corresponde según sus *props* y su estado,
- que reaccionan bien a la interacción del usuario (clics y escritura),
- que llaman a los callbacks correctos con los argumentos correctos,
- y que el DOM queda en el estado esperado.

Todo esto con **pruebas unitarias** en Jasmine, ejecutadas por **Karma**, más un reporte de **cobertura de código** generado por Istanbul.

---

## 2. Configuración del entorno de pruebas

### 2.1 Herramientas

| Herramienta | Rol | Versión |
|---|---|---|
| Jasmine (`jasmine-core`) | Framework de pruebas: `describe`, `it`, `expect`, spies. | ^7.0.2 |
| Karma | Test runner: levanta el navegador y ejecuta las pruebas. | ^6.4.4 |
| karma-jasmine | Integración entre Karma y Jasmine. | ^5.1.0 |
| karma-webpack + babel-loader | Compilan el JSX/ES6 para que el navegador lo entienda. | ^5.0.1 / ^10.1.1 |
| karma-coverage | Genera el reporte de cobertura (Istanbul). | ^2.2.1 |
| karma-chrome-launcher | Ejecuta las pruebas en ChromeHeadless. | ^3.2.0 |
| @testing-library/react | Renderiza componentes y consulta el DOM como lo haría el usuario. | ^16.3.3 |
| @testing-library/jasmine-dom | Agrega matchers de DOM a Jasmine (por ejemplo `toHaveClass`). | ^1.3.3 |
| babel-plugin-istanbul | Instrumenta el código para medir la cobertura. | ^8.0.0 |

### 2.2 Archivo `karma.config.cjs`

La configuración principal hace lo siguiente:

- **frameworks:** `jasmine`.
- **files:** carga primero `src/test/setupTests.js` y luego todos los `src/**/*.spec.jsx`.
- **preprocessors:** pasa esos archivos por `webpack`.
- **webpack:** usa `babel-loader` con `@babel/preset-env` y `@babel/preset-react` (runtime automático), y además el plugin **`istanbul`**, que es el que instrumenta el código fuente para poder medir la cobertura.
- **reporters:** `progress`, `kjhtml` (reporte en el navegador) y `coverage`.
- **coverageReporter:** genera un reporte HTML en `coverage/` y un resumen por consola (`text-summary`).
- **browsers:** `ChromeHeadless`.
- **singleRun:** `true` (corre una vez y termina, ideal para entregar).

> Ojo con un detalle que nos costó: al principio el reporte de cobertura salía **vacío (0/0)**, porque el código que llegaba al bundle de webpack no estaba instrumentado. La solución fue agregar `babel-plugin-istanbul` en las opciones del `babel-loader`. Sin ese plugin, Karma no tiene de dónde leer los datos de cobertura.

### 2.3 Archivo `src/test/setupTests.js`

Se encarga de cargar los matchers de Testing Library para Jasmine y los estilos de Bootstrap:

```js
import matchers from '@testing-library/jasmine-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const jasmineDomMatchers = matchers.default || matchers;

beforeEach(() => {
  jasmine.addMatchers(jasmineDomMatchers);
});
```

### 2.4 Cómo ejecutar

```bash
npm install     # instalar dependencias
npm test        # ejecuta las pruebas y genera la cobertura
```

El reporte HTML queda en `coverage/index.html`.

---

## 3. Alcance del testing

### 3.1 Dentro del alcance

Los **12 componentes** del frontend, cubriendo todos los niveles de Atomic Design:

- Átomos: `Button`, `Input`.
- Moléculas: `BookCard`, `FormField`, `Pagination`, `QuantySelector`, `SearchForm`.
- Organismos: `AdminForm`, `BookGrid`, `Footer`, `Header`.
- Plantillas: `MainLayout`.

### 3.2 Fuera del alcance (y por qué)

| Elemento | Motivo |
|---|---|
| Páginas (`Home`, `Cart`, `Checkout`, `Login`, `Admin`, `PaymentSuccess`) | La evaluación pide pruebas de **componentes** frontend. Las páginas se validaron de forma manual (flujo completo en el navegador). |
| `dataService.js` | Depende de `localStorage`; se validó manualmente. Se podría cubrir con un mock de `localStorage` en una siguiente etapa. |
| `authService.js` | Contiene las credenciales del administrador; se excluye del reporte por ser configuración, aunque su lógica se ejercita indirectamente desde `Header.spec.jsx`. |
| `App.jsx` | Es el pegamento entre páginas y estado; se prueba indirectamente al usar el sistema. |
| Pruebas end-to-end e integración | No son parte de esta entrega (aquí van pruebas unitarias). |

> Aclaración honesta: cuando decimos "100% de cobertura", nos referimos a los **12 componentes incluidos en el alcance**, no a todo el directorio `src`. Preferimos dejarlo explícito.

---

## 4. Cómo escribimos las pruebas

### 4.1 Estructura

Cada componente tiene su archivo `*.spec.jsx` con un `describe('NombreComponente Component', ...)` y varios `it(...)`. En total son **45 casos de prueba**.

### 4.2 Técnicas aplicadas

- **Renderizado real:** usamos `render()` de Testing Library en lugar de revisar el componente a mano, lo que nos obliga a mirarlo como lo vería el usuario.
- **Consultas del DOM cercanas al usuario:** `getByRole`, `getByLabelText`, `getByText`, `getByPlaceholderText`. Así, si cambiamos una clase CSS, la prueba sigue siendo válida.
- **Interacción:** `fireEvent.click` y `fireEvent.change` para simular clics y escritura.
- **Props controladas:** en la mayoría de los casos pasamos props fijas para forzar el escenario que queremos verificar (por ejemplo, `paginaActual={3} totalPaginas={3}` para probar el botón deshabilitado).
- **Mocks con spies:** `jasmine.createSpy(...)` para los callbacks, y `expect(...).toHaveBeenCalledWith(...)` para revisar con qué argumentos se llamaron.

### 4.3 Ejemplo de mock

```js
it('ejecuta alAgregarAlCarrito enviando el objeto libro y la cantidad ingresada', () => {
  const handleAgregar = jasmine.createSpy('alAgregarAlCarrito');
  render(<BookCard libro={libroMock} alAgregarAlCarrito={handleAgregar} />);

  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3' } });
  fireEvent.click(screen.getByText('Agregar al carrito'));

  expect(handleAgregar).toHaveBeenCalledWith(libroMock, 3);
});
```

Aquí se comprueba la lógica (que se convierta la cantidad a número), el comportamiento (que el clic dispare el callback) y el argumento exacto que recibe.

---

## 5. Inventario de casos de prueba

| Componente | Archivo | Casos |
|---|---|---|
| `Button` | `atoms/Button.spec.jsx` | 3 |
| `Input` | `atoms/Input.spec.jsx` | 3 |
| `BookCard` | `molecules/BookCard.spec.jsx` | 4 |
| `FormField` | `molecules/FormField.spec.jsx` | 3 |
| `Pagination` | `molecules/Pagination.spec.jsx` | 7 |
| `QuantySelector` | `molecules/QuantySelector.spec.jsx` | 3 |
| `SearchForm` | `molecules/SearchForm.spec.jsx` | 4 |
| `AdminForm` | `organisms/AdminForm.spec.jsx` | 4 |
| `BookGrid` | `organisms/BookGrid.spec.jsx` | 3 |
| `Footer` | `organisms/Footer.spec.jsx` | 3 |
| `Header` | `organisms/Header.spec.jsx` | 5 |
| `MainLayout` | `templates/MainLayout.spec.jsx` | 3 |
| **Total** | **12 archivos** | **45** |

Algunos casos que vale la pena destacar:

- `BookCard`: verifica que la imagen **no** se renderiza cuando el libro no tiene `imagen`, y que cuando el libro tiene una **oferta** se muestra el badge con el descuento, el precio original tachado y el precio rebajado.
- `Pagination`: prueba que no se renderiza nada con una sola página y que los botones "Anterior"/"Siguiente" se deshabilitan en los extremos.
- `Header`: prueba el cambio de "Acceder / Registrarse" a "Mi Perfil" según `usuarioLogueado`, el despliegue del menú colapsable y que el enlace "Administrador" solo aparezca con la sesión del administrador.
- `AdminForm`: prueba el render en modo "Agregar" vs. "Editar" y que los setters reciban lo que se escribe.

---

## 6. Resultados

### 6.1 Ejecución

```
TOTAL: 45 SUCCESS
```

Las **45 pruebas pasan** en ChromeHeadless.

### 6.2 Resumen de cobertura

```
Statements   : 100% ( 35/35 )
Branches     : 100% ( 33/33 )
Functions    : 100% ( 24/24 )
Lines        : 100% ( 34/34 )
```

### 6.3 Detalle por archivo

| Archivo | Statements | Branches | Functions | Lines |
|---|---|---|---|---|
| `atoms/Button.jsx` | 100% (1/1) | 100% (2/2) | 100% (1/1) | 100% (1/1) |
| `atoms/Input.jsx` | 100% (1/1) | 100% (3/3) | 100% (1/1) | 100% (1/1) |
| `molecules/BookCard.jsx` | 100% (6/6) | 100% (6/6) | 100% (3/3) | 100% (6/6) |
| `molecules/FormField.jsx` | 100% (1/1) | 100% (2/2) | 100% (1/1) | 100% (1/1) |
| `molecules/Pagination.jsx` | 100% (11/11) | 100% (8/8) | 100% (5/5) | 100% (10/10) |
| `molecules/QuantySelector.jsx` | 100% (1/1) | — | 100% (1/1) | 100% (1/1) |
| `molecules/SearchForm.jsx` | 100% (2/2) | — | 100% (2/2) | 100% (2/2) |
| `organisms/AdminForm.jsx` | 100% (5/5) | 100% (6/6) | 100% (4/4) | 100% (5/5) |
| `organisms/BookGrid.jsx` | 100% (2/2) | — | 100% (2/2) | 100% (2/2) |
| `organisms/Footer.jsx` | 100% (1/1) | — | 100% (1/1) | 100% (1/1) |
| `organisms/Header.jsx` | 100% (3/3) | 100% (6/6) | 100% (2/2) | 100% (3/3) |
| `templates/MainLayout.jsx` | 100% (1/1) | — | 100% (1/1) | 100% (1/1) |

*(El guion "—" en Branches significa que ese archivo no tiene ramas condicionales que evaluar.)*

---

## 7. Análisis de resultados

- La cobertura de los componentes es **completa**: cada línea, función y rama condicional de los archivos del alcance fue ejecutada al menos una vez.
- Las ramas más importantes que quedan cubiertas son las condicionales de la interfaz: mostrar u ocultar la imagen y el bloque de oferta en `BookCard`, el modo "Agregar/Editar" en `AdminForm`, el estado activo/deshabilitado de la paginación y el despliegue del menú en `Header`.
- El uso de mocks nos permitió comprobar los callbacks sin depender del resto de la aplicación (por ejemplo, no necesitamos la página `Home` para probar `SearchForm`).
- El 100% **no significa** que la aplicación esté libre de errores: significa que, para los componentes del alcance, ninguna línea quedó sin ser ejercitada por una prueba. Las páginas y la integración quedan fuera y se validaron manualmente.

---

## 8. Conclusiones

El proceso de testing quedó completo para lo que pedía la evaluación: entorno configurado (Karma + Jasmine + webpack + Istanbul), 45 pruebas unitarias bien estructuradas, uso de mocks, análisis de resultados y un reporte de cobertura real y reproducible con `npm test`.

Lo que mejoraríamos en una siguiente etapa:

1. Agregar pruebas para las páginas y para `dataService` (con un mock de `localStorage`).
2. Incorporar pruebas de integración entre `App`, las rutas y los componentes.
3. Configurar un umbral mínimo de cobertura en Karma para que la build falle si baja del objetivo.
4. Sumar pruebas end-to-end (por ejemplo, con Playwright o Cypress) para cubrir los flujos completos de compra y registro.
