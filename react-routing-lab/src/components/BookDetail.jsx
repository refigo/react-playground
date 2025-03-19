import { useParams, Link } from 'react-router-dom';
import { authors } from '../data';

export default function BookDetail() {
  const { name, book } = useParams();
  const author = authors.find(a => a.name === name);
  const bookData = author?.books.find(b => b.title === book);

  if (!bookData) return <div>Book not found</div>;

  return (
    <div>
      <h1>{bookData.title}</h1>
      <h2>by {name}</h2>
      <nav>
        <ul>
          <li>
            <Link to={`/author/${name}/${book}/chapters`}>View Chapters</Link>
          </li>
          <li>
            <Link to={`/author/${name}/${book}/characters`}>View Characters</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
