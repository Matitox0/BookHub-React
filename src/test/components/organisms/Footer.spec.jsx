import { render, screen } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';

describe('Footer Component', () => {
  it('renderiza los textos de redes sociales y derechos de autor', () => {
    render(<Footer />);

    expect(screen.getByText('Nuestras redes sociales')).toBeTruthy();
    expect(screen.getByText('BookHub© 2026 Todos los derechos reservados')).toBeTruthy();
  });

  it('renderiza los enlaces de Facebook e Instagram con sus URLs correctas', () => {
    render(<Footer />);

    const facebook = screen.getByRole('link', { name: 'Facebook' });
    const instagram = screen.getByRole('link', { name: 'Instagram' });

    expect(facebook.getAttribute('href')).toBe('https://www.facebook.com/');
    expect(instagram.getAttribute('href')).toBe('https://www.instagram.com/');
  });

  it('configura los enlaces con target="_blank" y rel="noreferrer"', () => {
    render(<Footer />);

    const facebook = screen.getByRole('link', { name: 'Facebook' });

    expect(facebook.getAttribute('target')).toBe('_blank');
    expect(facebook.getAttribute('rel')).toBe('noreferrer');
  });
});