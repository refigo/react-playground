import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const CharacterCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CharacterImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const CharacterName = styled.h3`
  margin: 10px;
  text-align: center;
  font-size: 1.2rem;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const DetailImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const DetailInfo = styled.div`
  text-align: center;
  max-width: 600px;

  h1 {
    margin-bottom: 10px;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;
