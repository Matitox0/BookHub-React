import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../../components/organisms/Header';
import { ADMIN_EMAIL } from '../../../service/authService';

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
    expect(screen.queryByText('Administrador')).toBeNull();
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
        <Header usuarioLogueado="cliente@correo.cl" />
      </MemoryRouter>
    );

    expect(screen.getByText('Mi Perfil')).toBeTruthy();
    expect(screen.queryByText('Acceder / Registrarse')).toBeNull();
    expect(screen.queryByText('Administrador')).toBeNull();
  });

  it('muestra el enlace "Administrador" solo cuando la sesion es del administrador', () => {
    render(
      <MemoryRouter>
        <Header usuarioLogueado={ADMIN_EMAIL} />
      </MemoryRouter>
    );

    expect(screen.getByText('Administrador')).toBeTruthy();
    expect(screen.getByText('Mi Perfil')).toBeTruthy();
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