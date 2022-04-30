import React from 'react';
import logo from './logo.svg';
import './App.css';
import TripsContainer from './Features/TripList/TripListContainer';
import Header from './Features/Header';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router';
import TripDetails from './Features/TripDetails/TripDetailsContainer';
import CreateTrip from './Features/Create/CreateTrip';
import TripContainer from './Features/TripDetails/TripDetailsContainer';
import TripListContainer from './Features/TripList/TripListContainer';
import TripDetailsContainer from './Features/TripDetails/TripDetailsContainer';

function App() {
  return (
    <>
      <CssBaseline/>
      <Header/>
      <Container>
        <Routes>
          <Route path='/' element={<TripListContainer />} />
          <Route path='/create' element={<CreateTrip />} />
          <Route path='/tripDetails/:id' element={<TripDetailsContainer  />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
