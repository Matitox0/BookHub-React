import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button Component', () => {
  it('renderiza el contenido (children) correctamente', () => {
    render(<Button>Haz click</Button>);
    expect(screen.getByText('Haz click')).toBeTruthy();
  });

  it('aplica las props por defecto (type="button" y className="boton")', () => {
    render(<Button>Boton Base</Button>);
    const boton = screen.getByText('Boton Base');

    expect(boton.getAttribute('type')).toBe('button');
    expect(boton).toHaveClass('boton');
  });

  it('llama a la función onClick al hacer clic', () => {
    const handleClick = jasmine.createSpy('onClick');
    render(<Button onClick={handleClick}>Enviar</Button>);

    const boton = screen.getByText('Enviar');
    fireEvent.click(boton);

    expect(handleClick).toHaveBeenCalled();
  });
});