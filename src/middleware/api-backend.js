import axios from "axios";

const airports = axios.create({
    baseURL: "http://localhost:8080/api/airports"
});

export default airports;