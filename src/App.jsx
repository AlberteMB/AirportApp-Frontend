import './App.css';
import Airport from "./components/Airport"; 
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Encabezado */}
      <Box sx={{ p: 2, backgroundColor: '#5e992c', textAlign: 'center' }}>
        <h1>Mapa de Aeropuertos de España</h1>
      </Box>

      {/* Contenedor principal */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Airport /> {/* Usa el componente Airport que maneja la lógica de datos */}
      </Box>
    </Box>
  );
}

export default App;
