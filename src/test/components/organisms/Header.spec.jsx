import { render, screen } from '@testing-library/react';
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
});