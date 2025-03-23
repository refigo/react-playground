import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../api/disney';
import {
  Container,
  CharacterGrid,
  CharacterCard,
  CharacterImage,
  CharacterName,
} from '../styles/styled';
import { Character } from '../types/disney';

function Home() {
  const { data: characters, isLoading, error } = useQuery<Character[]>(
    ['characters'],
    fetchCharacters
  );

  if (isLoading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {(error as Error).message}</Container>;
  if (!characters) return <Container>No characters found</Container>;

  return (
    <Container>
      <h1>Disney Characters</h1>
      <CharacterGrid>
        {characters.map((character) => (
          <CharacterCard key={character.id} to={`/character/${character.id}`}>
            <CharacterImage src={character.imageUrl} alt={character.name} />
            <CharacterName>{character.name}</CharacterName>
          </CharacterCard>
        ))}
      </CharacterGrid>
    </Container>
  );
}

export default Home;
