const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  Name: {
    type: String,
    
  },
  Age: {
    type: Number,
   
  },
  Dept: {
    type: String,
   
  },
  Salary: {
    type: Number,
    
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
