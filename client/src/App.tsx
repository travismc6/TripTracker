import React from 'react';
import logo from './logo.svg';
import './App.css';
import TripList from './Features/Trips/TripList';
import Header from './Features/Header';
import { Container, CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline/>
      <Header/>
      <Container>
        <TripList/>
      </Container>
    </>
  );
}

export default App;
