import { useOutletContext } from 'react-router-dom';

export default function BookCharacters() {
  const { bookData } = useOutletContext();

  return (
    <div>
      <h3>Characters</h3>
      <ul>
        {bookData.characters.map((character) => (
          <li key={character}>{character}</li>
        ))}
      </ul>
    </div>
  );
}
