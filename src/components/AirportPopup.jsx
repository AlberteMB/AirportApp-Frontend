import { useState, useEffect } from "react"
import { Box, Typography, Checkbox, FormControlLabel, Divider } from "@mui/material"

const AirportPopup = ({ airport, flightData, isLoading, setSelectedAirport }) => {
  const [departuresChecked, setDeparturesChecked] = useState(false)
  const [arrivalsChecked, setArrivalsChecked] = useState(false)

  // Sincronizar el estado de los checkboxes con los datos de vuelos
  useEffect(() => {
    if (flightData) {
      setDeparturesChecked(!!flightData.departures)
      setArrivalsChecked(!!flightData.arrivals)
    } else {
      setDeparturesChecked(false)
      setArrivalsChecked(false)
    }
  }, [flightData])

  return (
    <Box
      sx={{
        minWidth: 200,
        p: 1,
        "& .MuiTypography-root": {
          lineHeight: 1.4,
        },
      }}
    >
      {/* Información del aeropuerto */}
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
        {airport.name}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "8px 4px",
          mb: 1,
        }}
      >
        <Typography variant="body3" fontWeight="500">
          <strong>IATA:</strong>
        </Typography>
        <Typography variant="body3">{airport.iata || airport.code}</Typography>

        <Typography variant="body3" fontWeight="500">
          <strong>Región:</strong>
        </Typography>
        <Typography variant="body3">{airport.region}</Typography>

        <Typography variant="body3" fontWeight="500">
          <strong>Ciudad:</strong>
        </Typography>
        <Typography variant="body3">{airport.city}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Estado de carga */}
      {isLoading && (
        <Typography variant="body2" sx={{ my: 1, fontStyle: "italic" }}>
          Cargando datos de vuelos...
        </Typography>
      )}

      {/* Checkboxes */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={departuresChecked}
              onChange={(e) => {
                setDeparturesChecked(e.target.checked)
                if (setSelectedAirport) {
                  setSelectedAirport(e.target.checked ? { ...airport, flightType: "Departure" } : null)
                }
              }}
              size="small"
              sx={{ py: 0 }}
              disabled={isLoading}
            />
          }
          label="Salidas"
          sx={{ m: 0 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={arrivalsChecked}
              onChange={(e) => {
                setArrivalsChecked(e.target.checked)
                if (setSelectedAirport) {
                  setSelectedAirport(e.target.checked ? { ...airport, flightType: "Arrival" } : null)
                }
              }}
              size="small"
              sx={{ py: 0 }}
              disabled={isLoading}
            />
          }
          label="Llegadas"
          sx={{ m: 0 }}
        />
      </Box>
    </Box>
  )
}

export default AirportPopup

