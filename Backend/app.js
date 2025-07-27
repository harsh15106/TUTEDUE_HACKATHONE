const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const dotenv = require("dotenv").config();
require("./database/connect");

// Import all your routes
const stockRoutes = require("./routes/stockPg");
const requestRoutes = require("./routes/RequestBySeller");
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile'); // <-- 1. IMPORT the profile routes

// --- Middleware ---
// 2. INCREASE the JSON body limit to allow for base64 image strings
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// --- API Routes ---
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1", stockRoutes); // Corrected variable name
app.use("/api/v1", requestRoutes);
app.use('/api/v1/profile', profileRoutes); // <-- 3. USE the profile routes with a base path

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
