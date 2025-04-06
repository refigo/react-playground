import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled, { ThemeProvider } from 'styled-components';
import Home from './routes/Home';
import ComingSoon from './routes/ComingSoon';
import NowPlaying from './routes/NowPlaying';
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

const theme = {
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
  red: "#E51013",
};

const Wrapper = styled.div`
  background-color: ${props => props.theme.black.veryDark};
  color: ${props => props.theme.white.lighter};
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
