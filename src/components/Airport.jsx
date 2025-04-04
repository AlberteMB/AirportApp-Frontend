import { useEffect, useState } from "react"
import ApiAirports from "../middleware/api-backend"
import SpainMap from "../components/SpainMap"
import { Box, CircularProgress, Alert } from "@mui/material"

const Airport = () => {
  const [airports, setAirports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedAirport, setSelectedAirport] = useState(null)

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        // Cargar los aeropuertos
        const response = await ApiAirports.get("")

        if (!Array.isArray(response.data)) {
          throw new Error("Formato de datos inválido")
        }
        setAirports(response.data)
      } catch (error) {
        console.error("Error fetching airports:", error)
        setError(error.message || "Error al cargar los aeropuertos")
      } finally {
        setLoading(false)
      }
    }

    fetchAirports()
  }, [])

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1, position: "relative" }}>
        {loading ? (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : (
          <SpainMap airports={airports} selectedAirport={selectedAirport} setSelectedAirport={setSelectedAirport} />
        )}
      </Box>
    </Box>
  )
}

export default Airport







