import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Asegúrate de incluir esto si no lo manejas globalmente
import ApiAirports from "../middleware/api-backend.js";
import Airport from "../components/Airport";

const SpainMap = () => {
    const [loading, setLoading] = useState(false);
    const [airportList, setAirportList] = useState([]);
    const [selectedAirportId, setSelectedAirportId] = useState(null); // Estado para manejar el aeropuerto seleccionado

    const handleAirportsLoaded = (apiAirports) => {
        setAirportList(apiAirports);
        setLoading(false);
    };

    const handleViewFlights = (airportId) => {
        setSelectedAirportId(airportId); // Manejar el aeropuerto seleccionado
        console.log(`Ver vuelos del aeropuerto con ID: ${airportId}`);
    };

    return (
        <div>
            {/* Cargar los aeropuertos desde el backend a través del componente Airport */}
            <Airport onAirportsLoaded={handleAirportsLoaded} />

            {/* Si está cargando, mostramos un mensaje */}
            {loading && <p>Cargando aeropuertos...</p>}

            {/* Mapa centrado en España */}
            <MapContainer center={[40.4168, -3.7038]} zoom={6} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Dibujar aeropuertos en el mapa */}
                {airportList.map((airport) => (
                    <Marker key={airport.id} position={[airport.latitude, airport.longitude]}>
                        <Popup>
                            <strong>{airport.name}</strong>
                            <br />
                            {airport.city}, {airport.country}
                            <br />
                            <button onClick={() => handleViewFlights(airport.id)}>
                                Ver vuelos
                            </button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default SpainMap;

