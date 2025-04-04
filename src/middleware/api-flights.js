import axios from "axios";

const API_KEY = "e16696ec95mshe0a5945976a7866p15253djsn06e8f1ed0a21"; 
const BASE_URL = "https://aerodatabox.p.rapidapi.com";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos
const cache = new Map();

// Limpieza de caché periódica
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      cache.delete(key);
    }
  }
}, CACHE_TTL);

const GetAirportFlights = async (airportIata, flightType = "Arrival") => {
  if (!airportIata || airportIata.length !== 3) {
    throw new Error("Debe proporcionar un código IATA de 3 letras.");
  }

  const cacheKey = `${airportIata}-${flightType}`;

  if (cache.has(cacheKey) && Date.now() - cache.get(cacheKey).timestamp < CACHE_TTL) {
    return cache.get(cacheKey).data;
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/flights/airports/${airportIata}/${flightType.toLowerCase()}`,
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com"
        },
        params: {
          direction: flightType === "Arrival" ? "Inbound" : "Outbound",
          withLeg: false,
          ...(flightType === "Arrival" ? { originCountry: "ES" } : { destinationCountry: "ES" })
        }
      }
    );

    const flights = response.data?.flights || [];
    cache.set(cacheKey, { data: flights, timestamp: Date.now() });

    return flights;

  } catch (error) {
    if (error.response) {
      console.error(`Error en API AeroDataBox: ${error.response.status} - ${error.response.data}`);
      
      if (error.response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        return GetAirportFlights(airportIata, flightType);
      }

      if (error.response.status === 401) {
        throw new Error("API Key no válida o expirada.");
      }

      if (error.response.status === 400) {
        throw new Error("Solicitud incorrecta. Verifica los parámetros.");
      }
    } else if (error.request) {
      console.error("No se recibió respuesta de la API.");
    } else {
      console.error("Error en la configuración de la petición.");
    }

    throw error;
  }
};

export default GetAirportFlights;
