import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { getPopular, makeBgPath, makeImagePath } from '../api';
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

const Banner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 60px 120px 60px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 75%,
    rgba(0, 0, 0, 1) 100%
  ), url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center 25%;

  @media (max-width: 768px) {
    height: 80vh;
    padding: 40px 20px;
  }
`;

const BannerContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 15px;
  }
`;

const Overview = styled.p`
  font-size: 1.5rem;
  width: 50%;
  line-height: 1.5;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  opacity: 0.9;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const PlayButton = styled(motion.button)`
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(1.05);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    padding: 8px 20px;
    font-size: 1rem;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Grid = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px 30px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
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

  @media (max-width: 768px) {
    height: 225px;
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
            <BannerContent>
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
              <PlayButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play Now
              </PlayButton>
            </BannerContent>
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
