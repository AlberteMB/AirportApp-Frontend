import axios from "axios"

const API_KEY = "e16696ec95mshe0a5945976a7866p15253djsn06e8f1ed0a21"
const BASE_URL = "https://aerodatabox.p.rapidapi.com"
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const cache = new Map()

// Función simplificada para obtener vuelos
const GetAirportFlights = async (airportIata, flightType = "Arrival") => {
  try {
    // Delay de 1 segundo para evitar rate limits
    await delay(1000)

    const cacheKey = `${airportIata}-${flightType}`

    // Si ya hay datos en caché, los devolvemos
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    // Headers para la API
    const headers = {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
    }

    // Construimos la URL correctamente
    const url = `${BASE_URL}/flights/airports/iata/${airportIata}/${flightType.toLowerCase()}`
    console.log(`Realizando petición a: ${url}`)

    // Parámetros específicos según el tipo de vuelo
    const params = {
      withLeg: true,
      withCancelled: true,
      withCodeshared: true,
      withCargo: false,
      withPrivate: false,
      withLocation: true,
    }

    // Para llegadas, filtramos por país de origen España
    if (flightType === "Arrival") {
      params.originCountry = "ES"
    }
    // Para salidas, filtramos por país de destino España
    else {
      params.destinationCountry = "ES"
    }

    // Hacemos la petición a la API
    const response = await axios.get(url, {
      headers: headers,
      params: params,
    })

    // Extraemos los vuelos
    const flights = response.data?.flights || []

    // Mapeamos los datos para devolverlos en un formato estructurado
    const formattedFlights = flights.map((flight) => ({
      number: flight.number || "Desconocido",
      status: flight.status || "Sin información",
      airline: flight.airline?.name || "Desconocida",
      aircraft: flight.aircraft?.model || "No especificado",
      reg: flight.aircraft?.reg || "No disponible",
      departure: {
        airport: flight.departure?.airport?.name || "Desconocido",
        timeLocal: flight.departure?.scheduledTimeLocal || "Sin horario",
        terminal: flight.departure?.terminal || "N/A",
        gate: flight.departure?.gate || "N/A",
        location: flight.departure?.airport?.location || null,
        country: flight.departure?.airport?.countryCode || null,
      },
      arrival: {
        airport: flight.arrival?.airport?.name || "Desconocido",
        timeLocal: flight.arrival?.scheduledTimeLocal || "Sin horario",
        location: flight.arrival?.airport?.location || null,
        country: flight.arrival?.airport?.countryCode || null,
      },
    }))

    // Filtramos adicionalmente para asegurarnos de que son vuelos domésticos
    const domesticFlights = formattedFlights.filter((flight) => {
      // Para llegadas, verificamos que el país de origen sea España
      if (flightType === "Arrival") {
        return flight.departure.country === "ES"
      }
      // Para salidas, verificamos que el país de destino sea España
      else {
        return flight.arrival.country === "ES"
      }
    })

    console.log(`Vuelos domésticos encontrados para ${airportIata} (${flightType}):`, domesticFlights.length)

    // Guardamos en caché y devolvemos los datos
    cache.set(cacheKey, domesticFlights)
    return domesticFlights
  } catch (error) {
    console.error("Error al obtener vuelos:", error)

    // Manejo básico de errores
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.statusText}`)
    }

    // Relanzamos el error para manejarlo en el componente
    throw error
  }
}

export default GetAirportFlights


