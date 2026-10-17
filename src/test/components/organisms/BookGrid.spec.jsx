import { render, screen } from '@testing-library/react';
import BookGrid from '../../../components/organisms/BookGrid';

describe('BookGrid Component', () => {
  const librosMock = [
    { id: 1, titulo: '1984', autor: 'George Orwell', precio: 9000, imagen: '' },
    { id: 2, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', precio: 8500, imagen: '' }
  ];

  it('renderiza el contenedor principal con el id "libros"', () => {
    const { container } = render(<BookGrid libros={[]} alAgregarAlCarrito={() => {}} />);
    const section = container.querySelector('#libros');

    expect(section).toBeTruthy();
  });

  it('renderiza la lista de tarjetas correspondiente a los libros pasados', () => {
    render(<BookGrid libros={librosMock} alAgregarAlCarrito={() => {}} />);

    expect(screen.getByText('1984')).toBeTruthy();
    expect(screen.getByText('Fahrenheit 451')).toBeTruthy();
  });

  it('no renderiza tarjetas si la lista de libros está vacía', () => {
    render(<BookGrid libros={[]} alAgregarAlCarrito={() => {}} />);

    expect(screen.queryByText('1984')).toBeNull();
  });
});