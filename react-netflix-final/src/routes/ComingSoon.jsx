import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { getComingSoon, makeImagePath } from '../api';
import MovieModal from '../components/MovieModal';

const Wrapper = styled.div`
  background: black;
  padding-top: 80px;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 28px;
  padding: 20px 60px;
  color: white;
`;

const Grid = styled.div`
  margin-top: 20px;
  padding: 20px 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 300px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

function ComingSoon() {
  const { data, isLoading } = useQuery({
    queryKey: ['coming-soon'],
    queryFn: getComingSoon
  });
  const [selectedMovie, setSelectedMovie] = useState(null);

  const onBoxClicked = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
          <>
            <Title>Coming Soon</Title>
            <Grid>
              {data?.results.map((movie) => (
                <Box
                  layoutId={movie.id + ""}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  onClick={() => onBoxClicked(movie)}
                  $bgPhoto={makeImagePath(movie.poster_path)}
                />
              ))}
            </Grid>
            <AnimatePresence mode="wait">
              {selectedMovie && (
                <MovieModal
                  movie={selectedMovie}
                  onClose={() => setSelectedMovie(null)}
                />
              )}
            </AnimatePresence>
          </>
      )}
    </Wrapper>
  );
}

export default ComingSoon;
