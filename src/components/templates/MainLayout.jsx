import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

export default function MainLayout({ children, usuarioLogueado }) {
  return (
    <div className="app-container" style={{ padding: '0 20px' }}>
      <Header usuarioLogueado={usuarioLogueado} />
      <div className="contenido-principal" style={{ minHeight: '75vh' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}