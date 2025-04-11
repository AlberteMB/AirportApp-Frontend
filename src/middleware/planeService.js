import axios from "./api-backend.js"

const PlaneService = {
    getAllPlanes: async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/planes`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching planess:", error);
            throw error;
        }   
    }
};

    export default PlaneService;
