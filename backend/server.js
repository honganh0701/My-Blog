import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Phải thêm .js

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Body parser
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Personal Blog API" });
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});