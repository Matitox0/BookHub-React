import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../../components/organisms/Header';

describe('Header Component', () => {
  it('renderiza el título de la marca y las opciones de navegación principales', () => {
    render(
      <MemoryRouter>
        <Header usuarioLogueado={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('BookHub')).toBeTruthy();
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Carrito de Compras')).toBeTruthy();
    expect(screen.getByText('Administrador')).toBeTruthy();
  });

  it('muestra "Acceder / Registrarse" si usuarioLogueado es false', () => {
    render(
      <MemoryRouter>
        <Header usuarioLogueado={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('Acceder / Registrarse')).toBeTruthy();
    expect(screen.queryByText('Mi Perfil')).toBeNull();
  });

  it('muestra "Mi Perfil" si usuarioLogueado es true', () => {
    render(
      <MemoryRouter>
        <Header usuarioLogueado={true} />
      </MemoryRouter>
    );

    expect(screen.getByText('Mi Perfil')).toBeTruthy();
    expect(screen.queryByText('Acceder / Registrarse')).toBeNull();
  });

  it('alterna el menu colapsable al pulsar el boton hamburguesa', () => {
    const { container } = render(
      <MemoryRouter>
        <Header usuarioLogueado={false} />
      </MemoryRouter>
    );

    expect(container.querySelector('.navbar-collapse').className).not.toContain('show');

    fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));

    expect(container.querySelector('.navbar-collapse').className).toContain('show');
  });
});