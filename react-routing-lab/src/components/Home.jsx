import { Link } from 'react-router-dom';
import { authors } from '../data';

export default function Home() {
  return (
    <div>
      <h1>Authors</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.name}>
            <Link to={`/author/${author.name}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
