import { useOutletContext } from 'react-router-dom';

export default function BookChapters() {
  const { bookData } = useOutletContext();

  if (!bookData) return <div>Book not found</div>;

  return (
    <div>
      <h1>{bookData.title} - Chapters</h1>
      <ul>
        {bookData.chapters.map((chapter) => (
          <li key={chapter}>{chapter}</li>
        ))}
      </ul>
    </div>
  );
}
