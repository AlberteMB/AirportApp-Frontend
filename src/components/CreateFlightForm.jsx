import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useAppServices } from "../middleware/appServicesContext";

const CreateFlightForm = () => {
  const appService = useAppServices();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedAirport = location.state?.airport;
  const { airportId } = useParams();
  const { planes, airports } = location.state || {}; // Get planes and airports from location state

  // Form data state
  const [formData, setFormData] = useState({
    flightNumber: "",
    departureTime: dayjs(),
    arrivalTime: dayjs(),
    departureAirportId: airportId,
    arrivalAirportId: "",
    flightStatus: "",
    plane: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flightData = {

      }
      await appService.flight.createFlight(formData);
      navigate("/flights");
    } catch (error) {
      console.error("Error creating flight", error);
    }
  };

    return (

    );
};

export default CreateFlightForm;