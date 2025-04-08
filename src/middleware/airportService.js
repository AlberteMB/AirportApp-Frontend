import axios from "./api-backend.js"

const airportService = {
    getAllAirports: async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/airports`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching airports:", error);
            throw error;
        }   
    }
};

    export default airportService;
