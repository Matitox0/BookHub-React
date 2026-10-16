import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuantySelector from '../../../components/molecules/QuantySelector';

describe('QuantySelector Component', () => {
  it('renderiza la etiqueta y el valor inicial del input', () => {
    render(<QuantySelector id="cant-1" value={2} onChange={() => {}} />);

    const label = screen.getByText('Cantidad:');
    const input = screen.getByRole('spinbutton');

    expect(label).toBeTruthy();
    expect(input.value).toBe('2');
  });

  it('asigna correctamente el id y el atributo min="1"', () => {
    render(<QuantySelector id="cant-libro-101" value={1} onChange={() => {}} />);
    const input = screen.getByRole('spinbutton');

    expect(input.getAttribute('id')).toBe('cant-libro-101');
    expect(input.getAttribute('min')).toBe('1');
  });

  it('dispara el evento onChange al modificar el valor', () => {
    const handleChange = jasmine.createSpy('onChange');
    render(<QuantySelector id="cant-1" value={1} onChange={handleChange} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '4' } });

    expect(handleChange).toHaveBeenCalled();
  });
});