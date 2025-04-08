import {
    Button,
    CircularProgress,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppServices } from "../middleware/appServicesContext";


const FlightRegister = () => {
// Custom hook to access the app services
const appService = useAppServices();
const [flights, setFlights] = useState([]);

useEffect(() => {
    const fetchFlights = async () => {
    try {
        const data = await appService.airport.getAllFlights();
        setFlights(data);
        // Manejar la respuesta de la solicitud
    } catch (error) {
        console.error("Error fetching flights:", error);
        // Manejar el error de la solicitud
    }
    };

    fetchFlights();
}, [appService]);

return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
    <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Flights
    </Typography>

    <TableContainer component={Paper}>
        <Table>
            <TableBody>
                {flights.map((flight) => (
                    <TableRow key={flight.id}>
                        <TableCell>{flight.flightNumber} </TableCell>
                        <TableCell>{flight.departureTime}</TableCell>
                        <TableCell>{flight.arrivalTime}</TableCell>   
                        <TableCell>{flight.plane}</TableCell>     
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </Paper>
)           
};

export default FlightRegister;