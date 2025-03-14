import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023"
        );
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <LoadingText>Loading...</LoadingText>;

  return (
    <Container>
      <Title>Marvel Characters</Title>
      <CharacterGrid>
        {characters.map((character) => (
          <CharacterCard key={character.id}>
            <Link to={`/character/${character.id}`}>
              <CharacterImage
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <CharacterName>{character.name}</CharacterName>
            </Link>
          </CharacterCard>
        ))}
      </CharacterGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const CharacterCard = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CharacterName = styled.h3`
  padding: 10px;
  margin: 0;
  text-align: center;
  font-size: 1rem;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
`;

export default Home;
