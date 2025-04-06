import { motion } from "framer-motion";
import { makeBgPath } from "../api";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const MovieBox = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 800px;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.7);
`;

const MovieImg = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-image: linear-gradient(
    to bottom,
    transparent 60%,
    ${(props) => props.theme.black.darker}
  ), url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: white;
  }

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const MovieContent = styled.div`
  padding: 30px;
  color: ${(props) => props.theme.white.lighter};

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white.lighter};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const Overview = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 25px;
  color: ${(props) => props.theme.white.lighter};
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
`;

const MovieInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const InfoItem = styled.div`
  h3 {
    font-size: 1rem;
    color: ${(props) => props.theme.white.darker};
    margin-bottom: 5px;
  }

  p {
    font-size: 1.1rem;
    color: ${(props) => props.theme.white.lighter};
    font-weight: 600;
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 0.9rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

function MovieModal({ movie, onClose }) {
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <MovieBox
        layoutId={movie.id + ""}
        onClick={(e) => e.stopPropagation()}
      >
        <MovieImg $bgPhoto={makeBgPath(movie.backdrop_path)} />
        <CloseButton onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </CloseButton>
        <MovieContent>
          <Title>{movie.title}</Title>
          <Overview>{movie.overview}</Overview>
          <MovieInfo>
            <InfoItem>
              <h3>Release Date</h3>
              <p>{movie.release_date}</p>
            </InfoItem>
            <InfoItem>
              <h3>Rating</h3>
              <p>{movie.vote_average.toFixed(1)} / 10</p>
            </InfoItem>
            <InfoItem>
              <h3>Vote Count</h3>
              <p>{movie.vote_count.toLocaleString()}</p>
            </InfoItem>
          </MovieInfo>
        </MovieContent>
      </MovieBox>
    </Overlay>
  );
}

export default MovieModal;
