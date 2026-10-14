import React from 'react';
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
    render(<AdminForm {...propsBase} />);

    const btnSubmit = screen.getByRole('button', { name: 'Agregar Libro' });
    fireEvent.click(btnSubmit);

    expect(propsBase.onSubmit).toHaveBeenCalled();
  });
});