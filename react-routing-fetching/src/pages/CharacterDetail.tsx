import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchCharacterById } from '../api/disney';
import ImageWithFallback from '../components/ImageWithFallback';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const BackButton = styled.button`
  margin-bottom: 30px;
  padding: 12px 24px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);

  &:hover {
    background-color: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CharacterCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 30px;
  padding: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CharacterImage = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const CharacterInfo = styled.div`
  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 24px;
    font-weight: 700;
  }

  h2 {
    font-size: 1.5rem;
    color: #34495e;
    margin: 24px 0 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 24px;
      background: #4a90e2;
      border-radius: 2px;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
`;

const ListItem = styled.li`
  padding: 12px 16px;
  background-color: #f8fafc;
  border-radius: 8px;
  color: #64748b;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    transform: translateX(4px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: 1.5rem;
  color: #64748b;
`;

const ErrorContainer = styled(LoadingContainer)`
  color: #ef4444;
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

  if (isLoading) return <LoadingContainer>Loading...</LoadingContainer>;
  if (error) return <ErrorContainer>Error: {(error as Error).message}</ErrorContainer>;
  if (!character) return <ErrorContainer>Character not found</ErrorContainer>;

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <span>←</span>
        <span>Back to Characters</span>
      </BackButton>
      <CharacterCard>
        <CharacterImage>
          <ImageWithFallback
            src={character.imageUrl}
            alt={character.name}
          />
        </CharacterImage>
        <CharacterInfo>
          <h1>{character.name}</h1>
          
          {character.films && character.films.length > 0 && (
            <>
              <h2>Featured Films</h2>
              <List>
                {character.films.map((film, index) => (
                  <ListItem key={index}>{film}</ListItem>
                ))}
              </List>
            </>
          )}
          
          {character.parkAttractions && character.parkAttractions.length > 0 && (
            <>
              <h2>Park Attractions</h2>
              <List>
                {character.parkAttractions.map((attraction, index) => (
                  <ListItem key={index}>{attraction}</ListItem>
                ))}
              </List>
            </>
          )}

          {character.shortFilms && character.shortFilms.length > 0 && (
            <>
              <h2>Short Films</h2>
              <List>
                {character.shortFilms.map((film, index) => (
                  <ListItem key={index}>{film}</ListItem>
                ))}
              </List>
            </>
          )}

          {character.tvShows && character.tvShows.length > 0 && (
            <>
              <h2>TV Shows</h2>
              <List>
                {character.tvShows.map((show, index) => (
                  <ListItem key={index}>{show}</ListItem>
                ))}
              </List>
            </>
          )}
        </CharacterInfo>
      </CharacterCard>
    </Container>
  );
}

export default CharacterDetail;
