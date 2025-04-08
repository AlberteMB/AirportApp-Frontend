//import { useState } from 'react';
import { Box, Typography, Button, FormControlLabel, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AirportPopup = ({ airport }) => {
const navigate = useNavigate();    

const handleRegisterClick = () => {
    navigate("/register", { state: { airport: airport } }); 

    
};

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
        <Typography variant="body3" fontWeight="500"><strong>IATA:</strong></Typography> 
        <Typography variant="body3">{airport.code}</Typography>
        
        <Typography variant="body3" fontWeight="500"><strong>Región:</strong></Typography>
        <Typography variant="body3">{airport.region}</Typography>
        
        <Typography variant="body3" fontWeight="500"><strong>Ciudad:</strong></Typography>
        <Typography variant="body3">{airport.city}</Typography>
    </Box>

    <Divider sx={{ my: 1 }} />
    
      {/* Buttons */}
    <Box sx={{ 
        display: 'flex',
        flexDirection: 'row',
        gap: '4px'
    }}>
        <Button 
        size="small"
        onClick={handleRegisterClick}
        variant="contained"
        >
        Registro
        </Button>
    </Box>
    </Box>
);
};

export default AirportPopup;
