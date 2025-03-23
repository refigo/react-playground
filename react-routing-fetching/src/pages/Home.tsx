import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../api/disney';
import styled from 'styled-components';
import { Character } from '../types/disney';
import ImageWithFallback from '../components/ImageWithFallback';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Name = styled.h2`
  font-size: 1.2rem;
  margin: 10px;
  text-align: center;
`;

function Home() {
  const navigate = useNavigate();
  console.log('Home component rendered');

  const { data: characters, isLoading, error } = useQuery<Character[]>(
    ['characters'],
    fetchCharacters
  );

  const handleCardClick = (id: string) => {
    console.log('Card clicked, navigating to:', `/character/${id}`);
    navigate(`/character/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (!characters) return <div>No characters found</div>;

  return (
    <Container>
      <h1>Disney Characters</h1>
      <Grid>
        {characters.slice(0, 100).map(character => (
          <Card
            key={character.id}
            onClick={() => handleCardClick(character.id)}
          >
            <ImageWithFallback
              src={character.imageUrl}
              alt={character.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <Name>{character.name}</Name>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
