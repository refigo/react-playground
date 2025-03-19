import { useParams, Link, Outlet, useOutletContext } from 'react-router-dom';

export default function BookDetail() {
  const { book } = useParams();
  const { author } = useOutletContext();
  const bookData = author.books.find(b => b.title === book);

  if (!bookData) return <div>Book not found</div>;

  return (
    <div>
      <h3>{bookData.title}</h3>
      <nav>
        <ul>
          <li>
            <Link to="chapters">View Chapters</Link>
          </li>
          <li>
            <Link to="characters">View Characters</Link>
          </li>
        </ul>
      </nav>
      <div style={{ marginTop: '20px' }}>
        <Outlet context={{ bookData, author }} />
      </div>
    </div>
  );
}
