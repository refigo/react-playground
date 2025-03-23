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
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
  display: block;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CharacterName = styled.h2`
  font-size: 1.2rem;
  margin: 10px;
  text-align: center;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const DetailInfo = styled.div`
  text-align: center;
  margin-top: 20px;

  h1 {
    margin-bottom: 10px;
  }

  p {
    color: #666;
    line-height: 1.5;
  }
`;
