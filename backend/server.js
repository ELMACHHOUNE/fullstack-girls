const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");  // Import authRoutes.js

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);  // Use the auth routes for '/api/auth'

// Example of a test route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running...");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
