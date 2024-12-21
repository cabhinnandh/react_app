const express = require("express");
const employee = require("./model/employee.model");
const cors = require("cors");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import database configuration
require("./config/db");

const PORT = 8080;

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/name", (req, res) => {
  res.send("Hai");
});

app.post("/add", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log incoming data
    await employee.create(req.body);
    res.status(201).send({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).send({ message: "Error adding employee", error });
  }
});


app.get("/view", async (req, res) => {
  try {
    const employees = await employee.find();
    res.status(200).send(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send({ message: "Error fetching employees", error });
  }
});

app.delete("/remove/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await employee.findByIdAndDelete(id);
    res.status(200).send({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting employee", error });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await employee.findByIdAndUpdate(id, req.body);
    res.status(200).send({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Cannot update the data", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
