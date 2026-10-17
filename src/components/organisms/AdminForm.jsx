import FormField from '../molecules/FormField';

export default function AdminForm({
  libroId,
  titulo, setTitulo,
  autor, setAutor,
  precio, setPrecio,
  onSubmit,
  onCancelar
}) {
  const esEdicion = libroId !== "";

  return (
    <div className="row justify-content-center mb-4">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card p-4 shadow-sm">
          <h2 id="tituloAdmin" className="h4">{esEdicion ? 'Editar Libro' : 'Agregar Nuevo Libro'}</h2>
          <form id="formularioAdmin" onSubmit={onSubmit}>
            <FormField
              label="Título:"
              id="tituloLibro"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <FormField
              label="Autor:"
              id="autorLibro"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
            />
            <FormField
              label="Precio:"
              id="precioLibro"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              {esEdicion ? 'Guardar Cambios' : 'Agregar Libro'}
            </button>
            {esEdicion && (
              <button
                type="button"
                id="btnCancelarEdicion"
                className="btn btn-secondary ms-2"
                onClick={onCancelar}
              >
                Cancelar Edición
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
