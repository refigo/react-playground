import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../api/disney';
import styled from 'styled-components';
import { Character } from '../types/disney';
import ImageWithFallback from '../components/ImageWithFallback';

// 디즈니 테마 색상
const disneyColors = [
  '#FF4B2B', // 빨강
  '#2EC4B6', // 청록
  '#FF9F1C', // 주황
  '#7209B7', // 보라
  '#4361EE', // 파랑
  '#2A9D8F', // 녹색
  '#E63946', // 선홍색
  '#FF006E', // 핫핑크
  '#3A86FF', // 하늘색
  '#FB5607', // 주황빨강
];

const Container = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 16px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 30px;
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const Card = styled.div<{ $bgColor: string }>`
  position: relative;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$bgColor};
    transition: height 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);

    &::before {
      height: 8px;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  }
`;

const Image = styled(ImageWithFallback)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Name = styled.h2`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  margin: 0;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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

  if (isLoading) return <LoadingContainer>Loading...</LoadingContainer>;
  if (error) return <ErrorContainer>Error: {(error as Error).message}</ErrorContainer>;
  if (!characters) return <ErrorContainer>No characters found</ErrorContainer>;

  const validCharacters = characters
    .filter(character => character.imageUrl && character.imageUrl.trim() !== '')
    .slice(0, 100);

  return (
    <Container>
      <Header>
        <Title>Disney Character Gallery</Title>
        <Subtitle>Discover your favorite Disney characters</Subtitle>
      </Header>
      <Grid>
        {validCharacters.map((character, index) => (
          <Card
            key={character.id}
            onClick={() => handleCardClick(character.id)}
            $bgColor={disneyColors[index % disneyColors.length]}
          >
            <ImageContainer>
              <Image
                src={character.imageUrl}
                alt={character.name}
              />
              <Name>{character.name}</Name>
            </ImageContainer>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
