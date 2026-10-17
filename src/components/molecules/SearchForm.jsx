export default function SearchForm({ busqueda, setBusqueda, onBuscar, onMostrarTodos }) {
  return (
    <form id="formularioBusqueda" onSubmit={onBuscar} className="row justify-content-center g-2">
      <div className="col-12">
        <label htmlFor="autor" className="form-label">Buscar por título o autor</label>
      </div>
      <div className="col-12 col-sm-7 col-md-5">
        <input
          type="text"
          id="autor"
          name="autor"
          className="form-control"
          placeholder="Escribe un título o autor..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary">Buscar</button>
      </div>
      <div className="col-auto">
        <button
          type="button"
          id="mostrarTodos"
          className="btn btn-outline-secondary"
          onClick={onMostrarTodos}
        >
          Mostrar todos
        </button>
      </div>
    </form>
  );
}
