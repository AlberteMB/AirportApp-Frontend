import axios from "axios";

const API_KEY = import.meta.env.VITE_FLIGHTS_API_KEY;
//const BASE_URL = "https://aerodatabox.p.rapidapi.com/flights/airports/iata/YYZ";

const getAirportFlights =() => async (airportIata, flightType = 'Arrival') => {
    const options = {
    method: 'GET',
    url: `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${airportIata}`,
    params: {
        direction: flightType,
        withCargo: false,
        withPrivate: false,
        withLeg: true,
    },
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
    },
    };

    try {
    const response = await axios.request(options);
    return flightType === 'Arrival' ? response.data.arrivals : response.data.departures;
    } catch (error) {
    console.error(`Error fetching ${flightType} flights:`, error);
    return [];
    }
};

export default getAirportFlights;






