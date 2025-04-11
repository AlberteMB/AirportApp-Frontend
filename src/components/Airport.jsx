import { useEffect, useState } from "react";
import Services from "../middleware/services";
import SpainMap from "../components/SpainMap";
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const Airport = () => {
    const [airports, setAirports] = useState([]); // Cambiado a array vacío inicial
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAirports = async () => {
            try {       
                const data = await Services.airport.getAllAirports(); 
                console.log("Datos recibidos del backend:", data);
                
                if (!Array.isArray(data)) {
                    throw new Error("Formato de datos inválido");
                }
                setAirports(data);
            } catch (error) {
                console.error("Error fetching airports:", error);
                setError(error.message || "Error al cargar los aeropuertos");
            } finally {
                setLoading(false);
            }
        };

        fetchAirports();
    }, []);

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, position: 'relative' }}>
                {loading ? (
                    <Box sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                ) : (
                    <SpainMap airports={airports} />
                )}
            </Box>
        </Box>
    );    
};

export default Airport;