
import instance from "./api-backend.js"

const FlightService = {
    getAllFlights: async () => {
        try {
            const response = await instance.get(`/flights`);
            return response.data;
        } catch (error) {
            console.error("Error fetching flights:", error);
            throw error;
        }   
    },
    getFlightById: async (id) => {
        try {
            const response = await instance.get(`/flights/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching flight:", error);
            throw error;
        }
    },
    deleteFlight: async (id) => {
        try {
            const response = await instance.delete(`/flights/${id}`);
            return response.data;
            }catch (error){
            console.error("Error deleting flight:", error);
            throw error;
            }
    },

    searchFlightsByAirports: async ({ departureAirportId, arrivalAirportId }) => {
        try {
            const params = {};
            
            if (departureAirportId !== undefined) {
                params.departureAirportId = departureAirportId;
            }
            if (arrivalAirportId !== undefined) {
                params.arrivalAirportId = arrivalAirportId;
            }

            const response = await instance.get("/flights/search-by-airports", { params });
            return response.data;
        } catch (error) {
            console.error("Error searching flights by airports:", error);
            throw error; // Relanza el error para manejarlo en el componente
        }
    
},
}

export default FlightService;