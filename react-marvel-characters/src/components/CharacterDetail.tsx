import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    items: Array<{ name: string }>;
  };
  series: {
    available: number;
    items: Array<{ name: string }>;
  };
}

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`
        );
        const data = await response.json();
        setCharacter(data.data.results[0]);
      } catch (error) {
        console.error("Error fetching character:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (!character) return <div>Character not found</div>;

  return (
    <Container>
      <BackButton to="/">← Back to Characters</BackButton>
      <CharacterCard>
        <CharacterImage
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <CharacterInfo>
          <h1>{character.name}</h1>
          <Description>
            {character.description || "No description available"}
          </Description>
          
          <Section>
            <h2>Comics ({character.comics.available})</h2>
            <List>
              {character.comics.items.slice(0, 5).map((comic, index) => (
                <ListItem key={index}>{comic.name}</ListItem>
              ))}
            </List>
          </Section>

          <Section>
            <h2>Series ({character.series.available})</h2>
            <List>
              {character.series.items.slice(0, 5).map((series, index) => (
                <ListItem key={index}>{series.name}</ListItem>
              ))}
            </List>
          </Section>
        </CharacterInfo>
      </CharacterCard>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CharacterCard = styled.div`
  display: flex;
  gap: 30px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CharacterImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const CharacterInfo = styled.div`
  flex: 1;

  h1 {
    margin: 0 0 20px 0;
    color: #333;
  }

  h2 {
    color: #444;
    margin: 0 0 10px 0;
  }
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 5px 0;
  color: #666;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
`;

export default CharacterDetail;
