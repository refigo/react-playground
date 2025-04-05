import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from 'styled-components';
import Home from './routes/Home';
import ComingSoon from './routes/ComingSoon';
import NowPlaying from './routes/NowPlaying';
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

const Wrapper = styled.div`
  background-color: black;
  color: white;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Wrapper>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/now-playing" element={<NowPlaying />} />
          </Routes>
        </Wrapper>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
