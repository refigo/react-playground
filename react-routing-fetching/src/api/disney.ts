import { Character } from '../types/disney';

const BASE_URL = "https://disney_api.nomadcoders.workers.dev";

export const fetchCharacters = async (): Promise<Character[]> => {
  const response = await fetch(`${BASE_URL}/characters`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/characters/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }
  return response.json();
};
