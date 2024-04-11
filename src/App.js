// src/App.js
import React from 'react';
import styled from 'styled-components';
import Nav from './components/topnav/topnav.component';
import Body from './components/body/body.component';
import Footer from './components/footer/footer.component';

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <Nav />
      <Body />
      <Footer />
    </AppContainer>
  );
};

export default App;
