//import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import Airport from "../components/Airport";
import AirportPopup from "../components/AirportPopup";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
// Config icon
const DefaultIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const SpainMap = ({ airports = [] }) => {      
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

        {airports.map((airport) => (
            <Marker key={airport.id} position={[airport.latitude, airport.longitude]}>
            {/* Ahora el Popup es hijo de Marker */}
            <Popup maxWidth={250}>
                <AirportPopup airport={airport} />
            </Popup>
        </Marker>
    ))}
        </MapContainer>
    );
};

export default SpainMap;

