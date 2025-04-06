import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { getPopular, makeBgPath, makeImagePath } from '../api';
import MovieModal from '../components/MovieModal';

const Wrapper = styled.div`
  background: black;
  padding-top: 80px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Grid = styled.div`
  margin-top: 20px;
  padding: 20px 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* max-width: 1400px; */
  gap: 20px;
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

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['popular'],
    queryFn: getPopular
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
          <Banner
            $bgPhoto={makeBgPath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
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

export default Home;
