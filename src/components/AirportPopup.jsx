import { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControlLabel, Divider } from '@mui/material';

const AirportPopup = ({ airport }) => {
const [isFavorite, setIsFavorite] = useState(false);


useEffect(() => {
    const saved = localStorage.getItem('isFavorite');   
    if (saved === 'true') {
    setIsFavorite(true);
    }
}, []);

const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    localStorage.setItem('isFavorite', !isFavorite);
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
        
        onClick={handleToggleFavorite}
        sx={{
            color: isFavorite ? 'gold' : 'gray',
            borderColor: isFavorite ? 'gold' : 'gray',
            '&:hover': {
            borderColor: isFavorite ? 'gold' : 'gray',
            backgroundColor: isFavorite ? '#fff9e6' : '#f5f5f5',
            }
        }}      
        >
        Favorito
        </Button>
        <Button 
        size="small"
        >
            Registro
        </Button>
    </Box>
    </Box>
);
};

export default AirportPopup;
