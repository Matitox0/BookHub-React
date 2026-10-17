import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../../../components/molecules/FormField';

describe('FormField Component', () => {
  it('renderiza la etiqueta y el placeholder con valores por defecto', () => {
    render(
      <FormField
        label="Nombre del libro"
        id="nombre"
        value=""
        onChange={() => {}}
        placeholder="Escribe el nombre"
      />
    );

    expect(screen.getByText('Nombre del libro')).toBeTruthy();
    expect(screen.getByPlaceholderText('Escribe el nombre')).toBeTruthy();
  });

  it('aplica el tipo de input y la propiedad required cuando corresponden', () => {
    render(
      <FormField
        label="Precio"
        id="precio"
        type="number"
        value="5000"
        onChange={() => {}}
        required={true}
      />
    );

    const input = screen.getByLabelText('Precio');
    expect(input.getAttribute('type')).toBe('number');
    expect(input.hasAttribute('required')).toBe(true);
  });

  it('dispara el evento onChange al escribir en el campo', () => {
    const handleChange = jasmine.createSpy('onChange');
    render(
      <FormField
        label="Autor"
        id="autor"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Autor');
    fireEvent.change(input, { target: { value: 'Isabel Allende' } });

    expect(handleChange).toHaveBeenCalled();
  });
});