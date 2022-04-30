import React from 'react';
import logo from './logo.svg';
import './App.css';
import TripList from './Features/TripList/TripList';
import Header from './Features/Header';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router';
import TripDetails from './Features/TripDetails/TripDetails';
import CreateTrip from './Features/Create/CreateTrip';

function App() {
  return (
    <>
      <CssBaseline/>
      <Header/>
      <Container>
        <Routes>
          <Route path='/' element={<TripList />} />
          <Route path='/create' element={<CreateTrip />} />
          <Route path='/tripDetails/:id' element={<TripDetails  />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
