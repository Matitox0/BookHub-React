import BookCard from '../molecules/BookCard';

export default function BookGrid({ libros, alAgregarAlCarrito }) {
  return (
    <section id="libros" className="row g-4">
      {libros.map((libro) => (
        <div className="col-12 col-sm-6 col-lg-4" key={libro.id}>
          <BookCard libro={libro} alAgregarAlCarrito={alAgregarAlCarrito} />
        </div>
      ))}
    </section>
  );
}
