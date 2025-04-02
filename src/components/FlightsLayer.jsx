import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import GetAirportFlights  from '../middleware/api-flights';

const flightIcon = L.icon({
iconUrl: '../icon/plane.png', 
iconSize: [25, 25],
});

const FlightsLayer = ({ airportIata, flightType }) => {
const [flights, setFlights] = useState([]);
const map = useMap(); // eslint-disable-line

useEffect(() => {
    const fetchFlights = async () => {
    const data = await GetAirportFlights(airportIata, flightType);
    setFlights(data);
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 60000); // Actualiza cada minuto
    return () => clearInterval(interval);
}, [airportIata, flightType]);

return (
    <>
    {flights.map((flight) => (
        flight.position?.lat && flight.position?.lon && (
        <Marker
            key={flight.number}
            position={[flight.position.lat, flight.position.lon]}
            icon={flightIcon}
        >
            <Popup>
            <strong>{flight.number}</strong><br />
            Aerolínea: {flight.airline?.name}<br />
            {flightType === 'Arrival' 
            ? `Origen: ${flight.departure?.airport?.name || "Desconocido"}`
            : `Destino: ${flight.arrival?.airport?.name || "Desconocido"}`}
            </Popup>
        </Marker>
        )
    ))}
    </>
);
};

export default FlightsLayer;