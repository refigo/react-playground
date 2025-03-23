import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../api/disney';
import {
  Container,
  DetailContainer,
  DetailImage,
  DetailInfo,
} from '../styles/styled';
import { Character } from '../types/disney';

interface RouteParams {
  id: string;
}

function CharacterDetail() {
  const { id } = useParams<RouteParams>();
  const { data: character, isLoading, error } = useQuery<Character>(
    ['character', id],
    () => fetchCharacterById(id)
  );

  if (isLoading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {(error as Error).message}</Container>;
  if (!character) return <Container>Character not found</Container>;

  return (
    <Container>
      <DetailContainer>
        <DetailImage src={character.imageUrl} alt={character.name} />
        <DetailInfo>
          <h1>{character.name}</h1>
          <p>{character.films.join(', ')}</p>
        </DetailInfo>
      </DetailContainer>
    </Container>
  );
}

export default CharacterDetail;
