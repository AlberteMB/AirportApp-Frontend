import './App.css';
import SpainMap from "./components/SpainMap";
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Encabezado opcional */}
      <Box sx={{ p: 2, backgroundColor: '#5e992c', textAlign: 'center' }}>
        <h1>Mapa de Aeropuertos en España</h1>
      </Box>

      {/* Contenedor del mapa */}
      <Box sx={{ flexGrow: 1 }}>
        <SpainMap />
      </Box>
    </Box>
  );
}

export default App;
