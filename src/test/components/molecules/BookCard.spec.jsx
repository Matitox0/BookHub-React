import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from '../../../components/molecules/BookCard';

describe('BookCard Component', () => {
  const libroMock = {
    id: 1,
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    precio: 12000,
    imagen: 'https://ejemplo.com/portada.jpg'
  };

  it('renderiza la información del libro e imagen correctamente', () => {
    render(<BookCard libro={libroMock} alAgregarAlCarrito={() => {}} />);

    expect(screen.getByText('Cien años de soledad')).toBeTruthy();
    expect(screen.getByText('Gabriel García Márquez')).toBeTruthy();
    expect(screen.getByText(/\$12000/)).toBeTruthy();

    const imagen = screen.getByRole('img', { name: 'Portada de Cien años de soledad' });
    expect(imagen.getAttribute('src')).toBe('https://ejemplo.com/portada.jpg');
  });

  it('no renderiza la etiqueta de imagen si el libro no contiene la propiedad imagen', () => {
    const libroSinImagen = { ...libroMock, imagen: '' };
    render(<BookCard libro={libroSinImagen} alAgregarAlCarrito={() => {}} />);

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('ejecuta alAgregarAlCarrito enviando el objeto libro y la cantidad ingresada', () => {
    const handleAgregar = jasmine.createSpy('alAgregarAlCarrito');
    render(<BookCard libro={libroMock} alAgregarAlCarrito={handleAgregar} />);

    const inputCantidad = screen.getByRole('spinbutton');
    fireEvent.change(inputCantidad, { target: { value: '3' } });

    const btnAgregar = screen.getByText('Agregar al carrito');
    fireEvent.click(btnAgregar);

    expect(handleAgregar).toHaveBeenCalledWith(libroMock, 3);
  });
});