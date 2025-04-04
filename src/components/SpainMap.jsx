import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import AirportPopup from "./AirportPopup"
import L from "leaflet"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"
import FlightsLayer from "./FlightsLayer"
import GetAirportFlights from "../middleware/api-flights"

// Config icon
const DefaultIcon = L.icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

// Actualizar la definición de props en SpainMap
const SpainMap = ({ airports = [], selectedAirport, setSelectedAirport }) => {
  const [flightData, setFlightData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [noFlightsMessage, setNoFlightsMessage] = useState("")

  useEffect(() => {
    if (selectedAirport) {
      // Reset states when a new airport is selected
      setIsLoading(true)
      setError(null)
      setNoFlightsMessage("")

      console.log(`Queuing flight request for airport: ${selectedAirport.iata}`)

      // Función para hacer las peticiones secuencialmente
      const fetchSequentially = async () => {
        try {
          // Primero obtenemos las llegadas
          const arrivalData = await GetAirportFlights(selectedAirport.iata, "Arrival")
          console.log(`Received arrival data for ${selectedAirport.iata}`, arrivalData)

          // Después obtenemos las salidas
          const departureData = await GetAirportFlights(selectedAirport.iata, "Departure")
          console.log(`Received departure data for ${selectedAirport.iata}`, departureData)

          // Actualizamos el estado con los datos obtenidos
          setFlightData((prev) => ({
            ...prev,
            [selectedAirport.iata]: {
              arrivals: arrivalData,
              departures: departureData,
            },
          }))

          // Verificamos si hay vuelos
          if (arrivalData.length === 0 && departureData.length === 0) {
            setNoFlightsMessage(`No se encontraron vuelos domésticos para ${selectedAirport.name}`)
          }
        } catch (err) {
          console.error(`Error fetching flights for ${selectedAirport.iata}:`, err)
          setError(`Failed to load flights: ${err.message}`)
        } finally {
          setIsLoading(false)
        }
      }

      fetchSequentially()
    }
  }, [selectedAirport])

  return (
    <div className="map-container">
      {isLoading && <div className="loading-overlay">Cargando datos de vuelos...</div>}
      {error && <div className="error-message">{error}</div>}
      {noFlightsMessage && <div className="info-message">{noFlightsMessage}</div>}

      <MapContainer center={[40.416775, -3.70379]} zoom={6} style={{ width: "100%", height: "800px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {airports.map((airport) => (
          <Marker
            key={airport.id}
            position={[airport.latitude, airport.longitude]}
            eventHandlers={{
              click: () => setSelectedAirport && setSelectedAirport(airport),
            }}
          >
            <Popup maxWidth={250}>
              <AirportPopup
                airport={airport}
                flightData={flightData[airport.iata]}
                isLoading={isLoading && selectedAirport?.iata === airport.iata}
                setSelectedAirport={setSelectedAirport}
              />
            </Popup>
          </Marker>
        ))}

        {selectedAirport && flightData[selectedAirport.iata] && (
          <FlightsLayer flightData={flightData[selectedAirport.iata]} />
        )}
      </MapContainer>
    </div>
  )
}

export default SpainMap

