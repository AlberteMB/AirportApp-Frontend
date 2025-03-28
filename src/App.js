// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { CssBaseline, Box } from '@mui/material';
//import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { ApiProvider } from './context/ApiContext';
//import Header from './components/layout/Header';
//import Footer from './components/layout/Footer';
import SpainMap from './components/SpainMap';



const App = () => {
  return (
    <Router>
      <Routes>
        <SpainMap />
      </Routes>
    </Router>
  );
}

export default App;