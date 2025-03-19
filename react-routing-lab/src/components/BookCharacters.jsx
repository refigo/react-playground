import { useParams } from 'react-router-dom';
import { authors } from '../data';

export default function BookCharacters() {
  const { name, book } = useParams();
  const author = authors.find(a => a.name === name);
  const bookData = author?.books.find(b => b.title === book);

  if (!bookData) return <div>Book not found</div>;

  return (
    <div>
      <h1>{bookData.title} - Characters</h1>
      <ul>
        {bookData.characters.map((character) => (
          <li key={character}>{character}</li>
        ))}
      </ul>
    </div>
  );
}
