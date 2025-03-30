import { useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Divider } from '@mui/material';

const AirportPopup = ({ airport }) => {
const [departuresChecked, setDeparturesChecked] = useState(false);
const [arrivalsChecked, setArrivalsChecked] = useState(false);

return (

    <Box sx={{ 
    minWidth: 200,
    p: 1,
    '& .MuiTypography-root': { 
        lineHeight: 1.4 
    }
    }}>
      {/* Información del aeropuerto */}
    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
        {airport.name}
    </Typography>
      
    <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '8px 4px',
        mb: 1
    }}>
        <Typography variant="body3" fontWeight="500">AITA:</Typography>
        <Typography variant="body3">{airport.code}</Typography>
        
        <Typography variant="body3" fontWeight="500">Región:</Typography>
        <Typography variant="body3">{airport.region}</Typography>
        
        <Typography variant="body3" fontWeight="500">Ciudad:</Typography>
        <Typography variant="body3">{airport.city}</Typography>
    </Box>

    <Divider sx={{ my: 1 }} />
      
      {/* Checkboxes */}
    <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    }}>
        <FormControlLabel
        control={
            <Checkbox 
            checked={departuresChecked}
            onChange={(e) => setDeparturesChecked(e.target.checked)}
            size="small"
            sx={{ py: 0 }}
            />
        }
        label="Salidas"
        sx={{ m: 0 }}
        />
        <FormControlLabel
        control={
            <Checkbox 
            checked={arrivalsChecked}
            onChange={(e) => setArrivalsChecked(e.target.checked)}
            size="small"
            sx={{ py: 0 }}
            />
        }
        label="Llegadas"
        sx={{ m: 0 }}
        />
    </Box>
    </Box>
  
);
};

export default AirportPopup;