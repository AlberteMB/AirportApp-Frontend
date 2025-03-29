import axios from "axios";

const ApiAirports = axios.create({
    baseURL: "/api/airports",
});

export default ApiAirports;