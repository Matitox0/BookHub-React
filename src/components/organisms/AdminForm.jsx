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
    <div className="tarjeta-formulario" style={{ maxWidth: '500px', margin: '0 auto 30px auto' }}>
      <h2 id="tituloAdmin">{esEdicion ? 'Editar Libro' : 'Agregar Nuevo Libro'}</h2>
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
        <button type="submit" className="boton">
          {esEdicion ? 'Guardar Cambios' : 'Agregar Libro'}
        </button>
        {esEdicion && (
          <button
            type="button"
            id="btnCancelarEdicion"
            className="boton"
            onClick={onCancelar}
            style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}
          >
            Cancelar Edición
          </button>
        )}
      </form>
    </div>
  );
}