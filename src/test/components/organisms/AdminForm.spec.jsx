import { render, screen, fireEvent } from '@testing-library/react';
import AdminForm from '../../../components/organisms/AdminForm';

describe('AdminForm Component', () => {
  const propsBase = {
    libroId: '',
    titulo: '',
    setTitulo: () => {},
    autor: '',
    setAutor: () => {},
    precio: '',
    setPrecio: () => {},
    onSubmit: jasmine.createSpy('onSubmit'),
    onCancelar: jasmine.createSpy('onCancelar')
  };

  it('renderiza en modo "Agregar Nuevo Libro" cuando libroId está vacío', () => {
    render(<AdminForm {...propsBase} />);

    expect(screen.getByText('Agregar Nuevo Libro')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Agregar Libro' })).toBeTruthy();
    expect(screen.queryByText('Cancelar Edición')).toBeNull();
  });

  it('renderiza en modo "Editar Libro" y muestra el botón de cancelar si libroId tiene valor', () => {
    render(<AdminForm {...propsBase} libroId="55" />);

    expect(screen.getByText('Editar Libro')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Guardar Cambios' })).toBeTruthy();
    
    const btnCancelar = screen.getByText('Cancelar Edición');
    expect(btnCancelar).toBeTruthy();

    fireEvent.click(btnCancelar);
    expect(propsBase.onCancelar).toHaveBeenCalled();
  });

  it('llama a la función onSubmit al enviar el formulario', () => {
    const handleSubmit = jasmine.createSpy('onSubmit');
    render(
      <AdminForm
        {...propsBase}
        titulo="1984"
        autor="George Orwell"
        precio="9000"
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      />
    );

    const btnSubmit = screen.getByRole('button', { name: 'Agregar Libro' });
    fireEvent.click(btnSubmit);

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('llama a los setters al escribir en cada campo del formulario', () => {
    const setTitulo = jasmine.createSpy('setTitulo');
    const setAutor = jasmine.createSpy('setAutor');
    const setPrecio = jasmine.createSpy('setPrecio');

    render(
      <AdminForm
        {...propsBase}
        setTitulo={setTitulo}
        setAutor={setAutor}
        setPrecio={setPrecio}
      />
    );

    fireEvent.change(screen.getByLabelText('Título:'), { target: { value: 'Nuevo Título' } });
    fireEvent.change(screen.getByLabelText('Autor:'), { target: { value: 'Nuevo Autor' } });
    fireEvent.change(screen.getByLabelText('Precio:'), { target: { value: '9999' } });

    expect(setTitulo).toHaveBeenCalledWith('Nuevo Título');
    expect(setAutor).toHaveBeenCalledWith('Nuevo Autor');
    expect(setPrecio).toHaveBeenCalledWith('9999');
  });
});