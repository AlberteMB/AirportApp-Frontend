import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    TableHead,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppServices } from "../middleware/appServicesContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import FlightService from "../middleware/flightService";

const FlightRegister = () => {
    const appService = useAppServices();
    const location = useLocation();
    const navigate = useNavigate();
    const selectedAirport = location.state?.airport;
    const { airportId } = useParams();

    const [arrivalFlights, setArrivalFlights] = useState([]);
    const [departureFlights, setDepartureFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            if (!airportId) return;
    
            try {
                const arrivals = await appService.flight.searchFlightsByAirports({
                    arrivalAirportId: airportId,
                });
                setArrivalFlights(arrivals);
    
                const departures = await appService.flight.searchFlightsByAirports({
                    departureAirportId: airportId,
                });
                setDepartureFlights(departures);
            } catch (error) {
                console.error("Error fetching flights", error);
            }
        };
    
        fetchFlights();
    }, [airportId]);

    const handleBackClick = () => {
        navigate(-1); // Vuelve a la página anterior (mapa)
    };

    const deleteFlight = async (id, flightType) => {
        try {
            await appService.flight.deleteFlight(id);
            if (flightType === "arrival") {
                setArrivalFlights(prev => prev.filter(flight => flight.id !== id));
            } else {
                setDepartureFlights(prev => prev.filter(flight => flight.id !== id));
            }
            
            alert("Flight deleted successfully.");

        } catch (error) {
            console.error("Error deleting flight:", error);
            alert("Failed to delete flight.")
        }

    }

    return (
        <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Vuelos en {selectedAirport?.name || "Aeropuerto"}
            </Typography>

            <Button variant="outlined" onClick={handleBackClick} sx={{ mb: 3 }}>
                Volver al mapa
            </Button>

            {/* Vuelos de salida */}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ m: 2 }}>
                    Vuelos de salida
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Flight Number</TableCell>
                            <TableCell>Departure Time</TableCell>
                            <TableCell>Arrival Time</TableCell>
                            <TableCell>Plane</TableCell>
                            <TableCell>Actions</TableCell>{" "}                                                
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departureFlights.map((flight) => (
                            <TableRow key={flight.id}>
                                <TableCell>{flight.flightNumber}</TableCell>
                                <TableCell>{flight.departureTime}</TableCell>
                                <TableCell>{flight.arrivalTime}</TableCell>
                                <TableCell>{flight.plane?.model || "N/A"}</TableCell>
                                <TableCell>
                                <Button
                                    color="secondary"
                                    onClick={() => deleteFlight(flight.id)}
                                >
                                    Delete
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Vuelos de llegada */}
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ m: 2 }}>
                    Vuelos de llegada
                </Typography>
                <Table>
                <TableHead>
                        <TableRow>
                            <TableCell>Flight Number</TableCell>
                            <TableCell>Departure Time</TableCell>
                            <TableCell>Arrival Time</TableCell>                            
                            <TableCell>Plane</TableCell>
                            <TableCell>Actions</TableCell>{" "}    
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arrivalFlights.map((flight) => (
                            <TableRow key={flight.id}>
                                <TableCell>{flight.flightNumber}</TableCell>
                                <TableCell>{flight.departureTime}</TableCell>
                                <TableCell>{flight.arrivalTime}</TableCell>
                                <TableCell>{flight.plane?.model || "N/A"}</TableCell>
                                <TableCell>
                                <Button
                                    color="secondary"
                                    onClick={() => deleteFlight(flight.id)}
                                >
                                    Delete
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default FlightRegister;
