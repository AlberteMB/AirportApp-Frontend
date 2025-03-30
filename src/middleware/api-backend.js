import axios from "axios";

const ApiAirports = axios.create({
    baseURL: "http://localhost:8080/api/airports",
});

export default ApiAirports;