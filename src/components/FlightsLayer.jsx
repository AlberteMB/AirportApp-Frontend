import { useMap, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { useEffect, useRef, useMemo } from "react"
import { MarkerClusterGroup } from "@changey/react-leaflet-markercluster";

const FlightsLayer = ({ flightData }) => {
  const map = useMap()
  const layerGroup = useRef(L.layerGroup())

  const flightIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "../icon/plane.png",
        iconSize: [25, 25],
      }),
    [],
  )

  useEffect(() => {
    // Limpiar y recrear el layerGroup cuando el mapa cambie
    layerGroup.current = L.layerGroup().addTo(map)
    return () => {
      map.removeLayer(layerGroup.current)
    }
  }, [map])

  // Procesar los datos de vuelos que ya tenemos
  const processedArrivals = useMemo(() => {
    if (!flightData?.arrivals) return []

    return flightData.arrivals
      .filter((flight) => {
        // Verificar si hay datos de ubicación
        const hasPosition =
          (flight.departure?.location?.lat && flight.departure?.location?.lon) ||
          (flight.departure?.airport?.location?.lat && flight.departure?.airport?.location?.lon)
        return hasPosition
      })
      .map((flight) => {
        // Obtener la ubicación
        const lat = flight.departure?.location?.lat || flight.departure?.airport?.location?.lat || 0
        const lon = flight.departure?.location?.lon || flight.departure?.airport?.location?.lon || 0

        return {
          ...flight,
          flightType: "Arrival",
          position: { lat, lon },
        }
      })
  }, [flightData?.arrivals])

  const processedDepartures = useMemo(() => {
    if (!flightData?.departures) return []

    return flightData.departures
      .filter((flight) => {
        // Verificar si hay datos de ubicación
        const hasPosition =
          (flight.arrival?.location?.lat && flight.arrival?.location?.lon) ||
          (flight.arrival?.airport?.location?.lat && flight.arrival?.airport?.location?.lon)
        return hasPosition
      })
      .map((flight) => {
        // Obtener la ubicación
        const lat = flight.arrival?.location?.lat || flight.arrival?.airport?.location?.lat || 0
        const lon = flight.arrival?.location?.lon || flight.arrival?.airport?.location?.lon || 0

        return {
          ...flight,
          flightType: "Departure",
          position: { lat, lon },
        }
      })
  }, [flightData?.departures])

  // Combinar todos los vuelos
  const allFlights = useMemo(() => {
    return [...processedArrivals, ...processedDepartures]
  }, [processedArrivals, processedDepartures])

  return (
    <MarkerClusterGroup chunkedLoading disableClusteringAtZoom={15} spiderfyOnMaxZoom={false}>
      {allFlights.map(
        (flight) =>
          flight.position?.lat &&
          flight.position?.lon && (
            <Marker
              key={`${flight.number}-${flight.flightType}`}
              position={[flight.position.lat, flight.position.lon]}
              icon={flightIcon}
            >
              <Popup>
                <strong>{flight.number}</strong>
                <br />
                Aerolínea: {flight.airline || "Desconocida"}
                <br />
                {flight.flightType === "Arrival"
                  ? `Origen: ${flight.departure?.airport || "Desconocido"}`
                  : `Destino: ${flight.arrival?.airport || "Desconocido"}`}
              </Popup>
            </Marker>
          ),
      )}
    </MarkerClusterGroup>
  )
}

export default FlightsLayer

