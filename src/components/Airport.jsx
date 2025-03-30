import { useEffect, useState } from "react";
import ApiAirports from "../middleware/api-backend"; 
import SpainMap from "./components/SpainMap";

const Airport = () => {
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        const fetchAirports = async () => {
            try {                         
                const response = await ApiAirports.get("/"); // Solicitud al endpoint
                setAirports(response.data);
            } catch (error) {
                console.error("Error fetching airports:", error);
            }
        };

        fetchAirports();
    }, []);

    return (
        <div>
            <h2>Aeropuertos</h2>
            <ul>
                {airports.map((airport, index) => (
                    <li key={index}>
                        <strong>ID:</strong> {airport.id}, <strong>Nombre:</strong> {airport.name},
                         <strong>Ciudad:</strong> {airport.city}, <strong><Region>{airport.region}</Region></strong>,
                         <strong>Latitud:</strong> {airport.latitude}, <strong>Longitud:</strong> {airport.longitude}
                    </li>
                ))}
            </ul>
            <SpainMap airports={airports} />
        </div>
    );       
};
export default Airport;



0