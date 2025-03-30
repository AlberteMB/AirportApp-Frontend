//import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import Airport from "../components/Airport";

const SpainMap = ({ airports }) => {
    
    return(

        <MapContainer
            center={[40.416775, -3.703790]} // Coordenadas iniciales (Madrid)
            zoom={6} // Nivel de zoom inicial
            style={{ width: "100%", height: "500px" }} // Tamaño del mapa
        >
            {/* Capa base del mapa */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Marcadores para cada aeropuerto */}
            {airports.map((airport, index) => (
                <Marker
                    key={index}
                    position={[airport.latitude, airport.longitude]} // Coordenadas del aeropuerto
                >
                    <Popup>
                        {/* Información del aeropuerto en el popup */}
                        <strong>{airport.name}</strong><br />
                        Código: {airport.code}<br />
                        Latitud: {airport.latitude}, Longitud: {airport.longitude}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default SpainMap;

