import './App.css';
import Airport from "./components/Airport"; 
import FlightRegister from "./components/FlightRegister";
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Encabezado */}
      <Box sx={{ p: 2, backgroundColor: '#5e992c', textAlign: 'center' }}>
        <h1>Mapa de Aeropuertos de España</h1>
      </Box>

      {/* Contenedor principal */}
      <Routes>
        <Route path="/" element={<Airport />} />
        <Route path="/flights/:airportId" element={<FlightRegister />} />
      </Routes>
      </Box>
        </Router>
  );
}

export default App;