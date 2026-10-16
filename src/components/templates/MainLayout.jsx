import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

export default function MainLayout({ children, usuarioLogueado }) {
  return (
    <div className="app-container">
      <Header usuarioLogueado={usuarioLogueado} />
      <div className="contenido-principal" style={{ minHeight: '75vh', padding: '0 20px' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
