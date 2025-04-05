import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath, makeBgPath } from '../api';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 99;
`;

const MovieBox = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 100;
`;

const MovieImage = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
  position: relative;
`;

const MovieTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const MovieInfo = styled.div`
  padding: 20px;
  position: relative;
  top: -80px;
`;

const Overview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.5;
`;

function MovieModal({ movie, onClose }) {
  return (
    <>
      <Overlay
        onClick={onClose}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <MovieBox
        layoutId={movie.id + ""}
        style={{
          top: window.scrollY + 100,
        }}
      >
        <MovieImage
          style={{
            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeBgPath(
              movie.backdrop_path
            )})`,
          }}
        />
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieInfo>
          <Overview>{movie.overview}</Overview>
          <p style={{ marginTop: 20, color: '#fff' }}>
            Release Date: {movie.release_date}
          </p>
          <p style={{ marginTop: 10, color: '#fff' }}>
            Rating: ⭐️ {movie.vote_average.toFixed(1)}
          </p>
        </MovieInfo>
      </MovieBox>
    </>
  );
}

export default MovieModal;
