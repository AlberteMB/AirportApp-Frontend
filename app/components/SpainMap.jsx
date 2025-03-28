import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import { useMap } from "react-leaflet";
import Airport from "./components/Airport";

const SpainMap = () => {
    const [ loading, setLoading ] = useState(false);
    const [ airportList, setAirportList ] = useState([]);
    //const { airportButton, setAirportButton } = useState(false);
    const [flightSelect, setFlightSelect ] = useState(false);

  const handleAirportsLoaded = (airports) => {
    setAirportList(airports);
    setLoading(false);
  };

  return (
    <div>
        {/* Cargar los aeropuertos desde el backend a través del componente Airport */}
        <Airport onAirportsLoaded={handleAirportsLoaded} />

        {/* Si está cargando, mostramos un mensaje */}
        {loading ? <p>Cargando aeropuertos...</p> : null}

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
                        <button onClick={() => setFlightSelect(!flightSelect)}>
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