import instance from "./api-backend.js"

const AirportService = {
    getAllAirports: async () => {
        try {
            const response = await instance.get("/airports");
            console.log("Datos recibidos del backend:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching airports:", error);
            throw error;
        }   
    }
};

    export default AirportService;
