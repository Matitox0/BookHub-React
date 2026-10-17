import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

export default function MainLayout({ children, usuarioLogueado }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header usuarioLogueado={usuarioLogueado} />
      <div className="flex-grow-1 py-4">
        {children}
      </div>
      <Footer />
    </div>
  );
}
