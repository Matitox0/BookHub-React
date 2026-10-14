import BookCard from '../molecules/BookCard';

export default function BookGrid({ libros, alAgregarAlCarrito }) {
  return (
    <section id="libros" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
      {libros.map((libro) => (
        <BookCard key={libro.id} libro={libro} alAgregarAlCarrito={alAgregarAlCarrito} />
      ))}
    </section>
  );
}
