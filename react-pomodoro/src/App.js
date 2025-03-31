import React from 'react';
import { RecoilRoot } from 'recoil';
import Pomodoro from './components/Pomodoro';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Pomodoro />
    </RecoilRoot>
  );
}

export default App;
