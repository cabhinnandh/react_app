import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useLocation } from "react-router-dom"; 

const AddDetails = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Age: "",
    Dept: "",
    Salary: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation(); 


  useEffect(() => {
    if (location.state && location.state.item) {
      setFormData(location.state.item); 
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData._id ? "PUT" : "POST"; 
      const url = formData._id
        ? `http://localhost:8080/update/${formData._id}`
        : "http://localhost:8080/add";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Employee details saved successfully!");
        setErrorMessage("");
        setFormData({
          Name: "",
          Age: "",
          Dept: "",
          Salary: "",
        });
      } else {
        throw new Error("Failed to save employee details");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "400px",
        margin: "auto",
        mt: 4,
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Employee Details
      </Typography>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="Name"
        name="Name"
        value={formData.Name}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        label="Age"
        name="Age"
        value={formData.Age}
        onChange={handleChange}
        variant="outlined"
        type="number"
        required
      />
      <TextField
        label="Department"
        name="Dept"
        value={formData.Dept}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        label="Salary"
        name="Salary"
        value={formData.Salary}
        onChange={handleChange}
        variant="outlined"
        type="number"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default AddDetails;
