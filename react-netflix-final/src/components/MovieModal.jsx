import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath, makeBgPath } from '../api';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieBox = styled(motion.div)`
  width: 40vw;
  max-height: 80vh;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.darker};
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
  color: ${(props) => props.theme.white.darker};
  line-height: 1.5;
  margin-bottom: 20px;
`;

const AdditionalInfo = styled.p`
  color: ${(props) => props.theme.white.darker};
  margin-top: 10px;
`;

function MovieModal({ movie, onClose }) {
  return (
    <>
      <Overlay
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MovieBox
          layoutId={movie.id + ""}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.3,
              type: "spring",
              damping: 25,
              stiffness: 200
            }
          }}
          exit={{ 
            opacity: 0,
            scale: 0.5,
            transition: {
              duration: 0.3
            }
          }}
          onClick={(e) => e.stopPropagation()}
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
            <AdditionalInfo>Release Date: {movie.release_date}</AdditionalInfo>
            <AdditionalInfo>Rating: ⭐️ {movie.vote_average.toFixed(1)}</AdditionalInfo>
          </MovieInfo>
        </MovieBox>
      </Overlay>
    </>
  );
}

export default MovieModal;
