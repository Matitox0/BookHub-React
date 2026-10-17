export default function Pagination({ paginaActual, totalPaginas, onChange }) {
  if (totalPaginas <= 1) {
    return null;
  }

  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <nav className="d-flex justify-content-center mt-4" aria-label="Paginacion">
      <ul className="pagination mb-0">
        <li className={paginaActual === 1 ? 'page-item disabled' : 'page-item'}>
          <button
            className="page-link"
            onClick={() => onChange(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
        </li>

        {paginas.map((numero) => (
          <li
            key={numero}
            className={numero === paginaActual ? 'page-item active' : 'page-item'}
          >
            <button className="page-link" onClick={() => onChange(numero)}>
              {numero}
            </button>
          </li>
        ))}

        <li className={paginaActual === totalPaginas ? 'page-item disabled' : 'page-item'}>
          <button
            className="page-link"
            onClick={() => onChange(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
}
