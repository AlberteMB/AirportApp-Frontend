import { useEffect, useState } from "react";
import { airports } from "../data/airports";

const Airport = () => {
    const [airports, setAirports] = useState(() => {
        const fetchAirports = async () => {
        try {                         
            const response = await airports.get(`/airports`);
            setAirports(response.data);   
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1>airport</h1>
        </div>
    );
})
}
