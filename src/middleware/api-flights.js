import axios from "axios";

const API_KEY = import.meta.env.VITE_FLIGHTS_API_KEY;
const BASE_URL = 'https://aerodatabox.p.rapidapi.com';

const GetAirportFlights = async (airportIata, flightType = 'Arrival') => {
    try {
        const response = await axios.get(`${BASE_URL}/flights/airports/${airportIata}`, {
            params: {
                direction: flightType,
                withCargo: false,
                withPrivate: false,
                withLeg: true,
                destinationCountry: 'ES'
            },
            headers: { 'X-RapidAPI-Key': API_KEY }
        });

        // Verificamos si la respuesta tiene vuelos
        const flights = flightType === 'Arrival' 
            ? response.data.arrivals?.flights || [] 
            : response.data.departures?.flights || [];

        return flights.map(flight => ({
            number: flight.number || "Desconocido",
            status: flight.status || "Sin información",
            airline: flight.airline?.name || "Desconocida",
            aircraft: flight.aircraft?.model || "No especificado",
            reg: flight.aircraft?.reg || "No disponible",
            departure: {
                airport: flight.departure?.airport?.name || "Desconocido",
                timeLocal: flight.departure?.scheduledTimeLocal || "Sin horario",
                terminal: flight.departure?.terminal || "N/A",
                gate: flight.departure?.gate || "N/A"
            },
            arrival: {
                airport: flight.arrival?.airport?.name || "Desconocido",
                timeLocal: flight.arrival?.scheduledTimeLocal || "Sin horario"
            }
        }));
    } catch (error) {
        console.error("Error fetching flights:", error);
        return [];
    }
};

export default GetAirportFlights;