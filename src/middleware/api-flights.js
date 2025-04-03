import axios from "axios";

const API_KEY = import.meta.env.VITE_FLIGHTS_API_KEY;
const BASE_URL = 'https://aerodatabox.p.rapidapi.com';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const cache = new Map();

const GetAirportFlights = async (airportIata, flightType = 'Arrival') => {
    try {
        // Delay de 1 segundo para evitar rate limits
        await delay(1000);

        const cacheKey = `${airportIata}-${flightType}`;

        // Si ya hay datos en caché, los devolvemos
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        // Hacemos la petición a la API
        const response = await axios.get(`${BASE_URL}/flights/airports/${airportIata}`, {
            params: {
                direction: flightType,
                withCargo: false,
                withPrivate: false,
                withLeg: false,
                destinationCountry: 'ES'
            },
            headers: { 'X-RapidAPI-Key': API_KEY }
        });

        // Extraemos los vuelos según el tipo (Arrival/Departure)
        const flights = flightType === 'Arrival' 
            ? response.data.arrivals?.flights || [] 
            : response.data.departures?.flights || [];

        // Mapeamos los datos para devolverlos en un formato estructurado
        const formattedFlights = flights.map(flight => ({
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

        // Guardamos en caché y devolvemos los datos
        cache.set(cacheKey, formattedFlights);
        return formattedFlights;
    } catch (error) {
        // Manejo de errores (Rate Limit: 429)
        if (error.response?.status === 429) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            console.warn(`Rate limit alcanzado. Reintentando en ${retryAfter} segundos...`);
            await delay(retryAfter * 1000);
            return GetAirportFlights(airportIata, flightType); // Reintento
        }
        console.error("Error al obtener vuelos:", error);
        throw error; // Relanzamos el error para manejarlo fuera
    }
};

export default GetAirportFlights;