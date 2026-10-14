import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from '../../../components/templates/MainLayout';

describe('MainLayout Component', () => {
  it('renderiza los elementos hijos (children) dentro de la vista', () => {
    render(
      <MemoryRouter>
        <MainLayout usuarioLogueado={false}>
          <h1>Página Principal de Contenido</h1>
        </MainLayout>
      </MemoryRouter>
    );

    expect(screen.getByText('Página Principal de Contenido')).toBeTruthy();
  });

  it('integra los componentes Header y Footer en la plantilla', () => {
    render(
      <MemoryRouter>
        <MainLayout usuarioLogueado={false}>
          <div>Cuerpo</div>
        </MainLayout>
      </MemoryRouter>
    );

    expect(screen.getByText('BookHub')).toBeTruthy();
    expect(screen.getByText('BookHub© 2026 Todos los derechos reservados')).toBeTruthy();
  });

  it('transfiere el estado usuarioLogueado al Header correctamente', () => {
    render(
      <MemoryRouter>
        <MainLayout usuarioLogueado={true}>
          <div>Cuerpo</div>
        </MainLayout>
      </MemoryRouter>
    );

    expect(screen.getByText('Mi Perfil')).toBeTruthy();
  });
});