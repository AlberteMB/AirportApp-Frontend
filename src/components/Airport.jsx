import { useEffect, useState } from "react";
import ApiAirports from "../middleware/api-backend"; 

const Airport = ({ onAirportsLoaded }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAirports = async () => {
            try {                         
                const response = await ApiAirports.get("/"); // Solicitud al endpoint
                if (onAirportsLoaded) {
                    onAirportsLoaded(response.data); // Pasar los datos al componente padre
                }
            } catch (error) {
                console.error("Error fetching airports:", error);
                if (onAirportsLoaded) {
                    onAirportsLoaded([]); // Enviar una lista vacía en caso de error
                }
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchAirports();
    }, [onAirportsLoaded]);

    if (loading) return <p>Cargando aeropuertos...</p>; // Mostrar indicador de carga

    return null;
};

export default Airport;



