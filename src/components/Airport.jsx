import { useEffect, useState } from "react";
import airports from "../middleware/airports"; 

const Airport = ({ onAirportsLoaded }) => {
    const [airportList, setAirportList] = useState([]); 

    useEffect(() => {
        const fetchAirports = async () => {
            try {                         
                const response = await airports.get("/"); 
                setAirportList(response.data);
                if (onAirportsLoaded) {
                    onAirportsLoaded(response.data); 
                }
            } catch (error) {
                console.error("Error fetching airports:", error);
            }
        };

        fetchAirports();
    }, []);

    return null; 
};

export default Airport;


