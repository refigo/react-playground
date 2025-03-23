import { Character } from '../types/disney';

const BASE_URL = "https://disney_api.nomadcoders.workers.dev";

// Function to validate image URL format
const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  // Check if URL is from wikia.nocookie.net and has an image extension
  return url.includes('wikia.nocookie.net') && 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

export const fetchCharacters = async (): Promise<Character[]> => {
  const response = await fetch(`${BASE_URL}/characters`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  const data = await response.json();
  // Filter out characters with invalid image URLs
  return data.filter((character: Character) => isValidImageUrl(character.imageUrl));
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/characters/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }
  const character = await response.json();
  if (!isValidImageUrl(character.imageUrl)) {
    throw new Error('Character image not found');
  }
  return character;
};
