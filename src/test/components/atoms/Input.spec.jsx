import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input Component', () => {
  it('renderiza el campo de entrada con sus valores y propiedades por defecto', () => {
    render(
      <Input
        id="correo"
        name="correo"
        value="usuario@test.com"
        placeholder="Ingresa tu correo"
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText('Ingresa tu correo');
    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('text');
    expect(input.value).toBe('usuario@test.com');
    expect(input).toHaveClass('form-control');
  });

  it('aplica correctamente tipo personalizado, required y clases CSS adicionales', () => {
    render(
      <Input
        type="password"
        id="clave"
        name="clave"
        value="12345"
        onChange={() => {}}
        required={true}
        className="campo-personalizado"
      />
    );

    const input = screen.getByDisplayValue('12345');
    expect(input.getAttribute('type')).toBe('password');
    expect(input.hasAttribute('required')).toBe(true);
    expect(input).toHaveClass('form-control');
    expect(input).toHaveClass('campo-personalizado');
  });

  it('llama a la función onChange al interactuar o escribir en el campo', () => {
    const handleChange = jasmine.createSpy('onChange');
    render(
      <Input
        id="nombre"
        name="nombre"
        value=""
        onChange={handleChange}
        placeholder="Tu nombre"
      />
    );

    const input = screen.getByPlaceholderText('Tu nombre');
    fireEvent.change(input, { target: { value: 'Carlos' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
