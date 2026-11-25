import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../../components/molecules/Pagination';

describe('Pagination Component', () => {
  it('no renderiza nada cuando hay una sola pagina', () => {
    const { container } = render(
      <Pagination paginaActual={1} totalPaginas={1} onChange={() => {}} />
    );

    expect(container.querySelector('nav')).toBeNull();
  });

  it('renderiza un boton por cada pagina', () => {
    render(<Pagination paginaActual={1} totalPaginas={4} onChange={() => {}} />);

    expect(screen.getByRole('button', { name: '1' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '2' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '3' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '4' })).toBeTruthy();
  });

  it('llama a onChange con la pagina seleccionada', () => {
    const handleChange = jasmine.createSpy('onChange');
    render(<Pagination paginaActual={1} totalPaginas={3} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('button', { name: '2' }));

    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('deshabilita el boton Anterior en la primera pagina', () => {
    render(<Pagination paginaActual={1} totalPaginas={3} onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Anterior' }).disabled).toBe(true);
  });

  it('llama a onChange con la pagina siguiente', () => {
    const handleChange = jasmine.createSpy('onChange');
    render(<Pagination paginaActual={2} totalPaginas={3} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('llama a onChange con la pagina anterior al pulsar "Anterior"', () => {
    const handleChange = jasmine.createSpy('onChange');
    render(<Pagination paginaActual={2} totalPaginas={3} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Anterior' }));

    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('deshabilita el boton "Siguiente" en la ultima pagina', () => {
    render(<Pagination paginaActual={3} totalPaginas={3} onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Siguiente' }).disabled).toBe(true);
  });
});
