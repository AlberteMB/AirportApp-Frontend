import './App.css';
import Airport from "./components/Airport"; 
import FlightRegister from "./components/FlightRegister";
import CreateFlightForm from "./components/CreateFlightForm";
import UpdateFlightForm from "./components/UpdateFlightForm";
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Encabezado */}
      <Box sx={{ p: 2, backgroundColor: '#5e992c', textAlign: 'center' }}>
        <h1>Aeropuertos de España</h1>
      </Box>

      {/* Contenedor principal */}
      <Routes>
        <Route path="/" element={<Airport />} />
        <Route path="/flights/:id" element={<FlightRegister />} />
        <Route path="/flights/create" element={<CreateFlightForm />} />
        <Route path="/flights/update/:id" element={<UpdateFlightForm />} />
      </Routes>
      </Box>
        </Router>
  );
}

export default App;