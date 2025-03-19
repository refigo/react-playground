import { useParams, Link, Outlet } from 'react-router-dom';
import { authors } from '../data';

export default function AuthorDetail() {
  const { name } = useParams();
  const author = authors.find(a => a.name === name);

  if (!author) return <div>Author not found</div>;

  return (
    <div>
      <h1>{author.name}</h1>
      <h2>Books:</h2>
      <ul>
        {author.books.map((book) => (
          <li key={book.title}>
            <Link to={book.title}>{book.title}</Link>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <Outlet context={{ author }} />
      </div>
    </div>
  );
}
