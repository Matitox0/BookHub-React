export default function SearchForm({ busqueda, setBusqueda, onBuscar, onMostrarTodos }) {
  return (
    <form id="formularioBusqueda" onSubmit={onBuscar}>
      <label htmlFor="autor" style={{ display: 'block', marginBottom: '8px' }}>
        Buscar por título o autor
      </label>
      <input
        type="text"
        id="autor"
        name="autor"
        placeholder="Escribe un título o autor..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button type="submit" className="boton">Buscar</button>
      <button
        type="button"
        id="mostrarTodos"
        onClick={onMostrarTodos}
        className="boton"
        style={{ marginLeft: '8px' }}
      >
        Mostrar todos
      </button>
    </form>
  );
}