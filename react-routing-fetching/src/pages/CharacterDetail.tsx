import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchCharacterById } from '../api/disney';
import ImageWithFallback from '../components/ImageWithFallback';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const CharacterCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
`;

const CharacterImage = styled.div`
  width: 100%;
  max-height: 400px;
  margin-bottom: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const CharacterInfo = styled.div`
  h1 {
    margin-bottom: 16px;
  }
  
  p {
    margin-bottom: 8px;
    line-height: 1.5;
  }
`;

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('CharacterDetail rendered with id:', id);

  const { data: character, isLoading, error } = useQuery(
    ['character', id],
    () => fetchCharacterById(id as string),
    {
      enabled: !!id,
    }
  );

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {(error as Error).message}</Container>;
  if (!character) return <Container>Character not found</Container>;

  return (
    <Container>
      <BackButton onClick={handleBack}>← Back</BackButton>
      <CharacterCard>
        {character.imageUrl && (
          <CharacterImage>
            <ImageWithFallback
              src={character.imageUrl}
              alt={character.name}
            />
          </CharacterImage>
        )}
        <CharacterInfo>
          <h1>{character.name}</h1>
          {character.films && character.films.length > 0 && (
            <>
              <h2>Films:</h2>
              <ul>
                {character.films.map((film, index) => (
                  <li key={index}>{film}</li>
                ))}
              </ul>
            </>
          )}
          {character.parkAttractions && character.parkAttractions.length > 0 && (
            <>
              <h2>Park Attractions:</h2>
              <ul>
                {character.parkAttractions.map((attraction, index) => (
                  <li key={index}>{attraction}</li>
                ))}
              </ul>
            </>
          )}
        </CharacterInfo>
      </CharacterCard>
    </Container>
  );
}

export default CharacterDetail;
