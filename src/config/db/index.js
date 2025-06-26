const mongoose = require("mongoose");

mongoose.set('strictQuery', true); // Add this line

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/f8education_dev");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { connect };
