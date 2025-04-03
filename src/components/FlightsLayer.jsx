import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState, useRef, useMemo } from 'react';
import GetAirportFlights from '../middleware/api-flights';
import MarkerClusterGroup from 'react-leaflet-cluster';

const FlightsLayer = ({ airportIata, flightType }) => {
const [flights, setFlights] = useState([]);
const map = useMap();
const [lastFetch, setLastFetch] = useState(0);
const layerGroup = useRef(L.layerGroup());

  // Mover useMemo dentro del componente
const flightIcon = useMemo(() => L.icon({
    iconUrl: '../icon/plane.png',
    iconSize: [25, 25]
}), []);

useEffect(() => {
    // Limpiar y recrear el layerGroup cuando el mapa cambie
    layerGroup.current = L.layerGroup().addTo(map);
    return () => {
    map.removeLayer(layerGroup.current);
    };
}, [map]);

useEffect(() => {
    // Actualizar marcadores cuando los vuelos cambien
    layerGroup.current.clearLayers();
    flights.forEach(flight => {
    if (flight.position?.lat && flight.position?.lon) {
        L.marker([flight.position.lat, flight.position.lon], { icon: flightIcon })
        .bindPopup(`<strong>${flight.number}</strong><br />
            Aerolínea: ${flight.airline?.name || "Desconocida"}<br />
            ${flightType === 'Arrival' 
            ? `Origen: ${flight.departure?.airport?.name || "Desconocido"}` 
            : `Destino: ${flight.arrival?.airport?.name || "Desconocido"}`}`)
        .addTo(layerGroup.current);
    }
    });
}, [flights, flightIcon, flightType]);

useEffect(() => {
    const fetchFlights = async () => {
      if (Date.now() - lastFetch > 300000) { // 5 minutos
        try {
        const data = await GetAirportFlights(airportIata, flightType);
          // Asegurarse de que los datos tienen posición
        const flightsWithPosition = data.map(flight => ({
            ...flight,
            position: {
            lat: flightType === 'Arrival' 
                ? flight.arrival?.airport?.location?.lat 
                : flight.departure?.airport?.location?.lat,
            lon: flightType === 'Arrival' 
                ? flight.arrival?.airport?.location?.lon 
                : flight.departure?.airport?.location?.lon
            }
        })).filter(flight => flight.position.lat && flight.position.lon);
        
        setFlights(flightsWithPosition);
        setLastFetch(Date.now());
        } catch (error) {
        console.error("Error fetching flights:", error);
        }
    }
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 60000); // Actualizar cada minuto
    return () => clearInterval(interval);
}, [airportIata, flightType, lastFetch]);

return (
    <MarkerClusterGroup 
    chunkedLoading
    disableClusteringAtZoom={15}
    spiderfyOnMaxZoom={false}
    >        
    {flights.map((flight) => (
        flight.position?.lat && flight.position?.lon && (
        <Marker
            key={`${flight.number}-${flightType}`}
            position={[flight.position.lat, flight.position.lon]}
            icon={flightIcon}
        >
            <Popup>
            <strong>{flight.number}</strong><br />
            Aerolínea: {flight.airline?.name || "Desconocida"}<br />
            {flightType === 'Arrival' 
                ? `Origen: ${flight.departure?.airport?.name || "Desconocido"}`
                : `Destino: ${flight.arrival?.airport?.name || "Desconocido"}`}
            </Popup>
        </Marker>
        )
    ))}
    </MarkerClusterGroup>
);
};

export default FlightsLayer;