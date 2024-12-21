const mongoose = require("mongoose");

const uri =
  "mongodb+srv://abhinandhc:abhinandhc@cluster0.jlt5c.mongodb.net/databaseName?retryWrites=true&w=majority";

async function connectToDatabase() {
  try {
    await mongoose.connect(uri); 
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    
  }
}

connectToDatabase();
