import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../../../components/molecules/SearchForm';

describe('SearchForm Component', () => {
  it('renderiza el input con la búsqueda actual y ambos botones', () => {
    render(
      <SearchForm
        busqueda="Don Quijote"
        setBusqueda={() => {}}
        onBuscar={() => {}}
        onMostrarTodos={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Escribe un título o autor...').value).toBe('Don Quijote');
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Mostrar todos' })).toBeTruthy();
  });

  it('llama a la función onBuscar al enviar el formulario', () => {
    const handleBuscar = jasmine.createSpy('onBuscar');
    render(
      <SearchForm
        busqueda="Fantasía"
        setBusqueda={() => {}}
        onBuscar={(e) => { e.preventDefault(); handleBuscar(); }}
        onMostrarTodos={() => {}}
      />
    );

    const btnBuscar = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.click(btnBuscar);

    expect(handleBuscar).toHaveBeenCalled();
  });

  it('llama a la función onMostrarTodos al pulsar el botón "Mostrar todos"', () => {
    const handleMostrarTodos = jasmine.createSpy('onMostrarTodos');
    render(
      <SearchForm
        busqueda=""
        setBusqueda={() => {}}
        onBuscar={() => {}}
        onMostrarTodos={handleMostrarTodos}
      />
    );

    const btnMostrarTodos = screen.getByRole('button', { name: 'Mostrar todos' });
    fireEvent.click(btnMostrarTodos);

    expect(handleMostrarTodos).toHaveBeenCalled();
  });

  it('llama a setBusqueda al escribir en el input', () => {
    const handleSetBusqueda = jasmine.createSpy('setBusqueda');
    render(
      <SearchForm
        busqueda=""
        setBusqueda={handleSetBusqueda}
        onBuscar={() => {}}
        onMostrarTodos={() => {}}
      />
    );

    const input = screen.getByPlaceholderText('Escribe un título o autor...');
    fireEvent.change(input, { target: { value: 'Orwell' } });

    expect(handleSetBusqueda).toHaveBeenCalledWith('Orwell');
  });
});