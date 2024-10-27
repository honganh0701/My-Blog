import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Phải thêm .js
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Body parser
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`); // In ra method và đường dẫn của mỗi request
    next(); // Chuyển request tới middleware/route tiếp theo
  });
  

  app.use(cors({
    origin: 'http://localhost:5173', // Port mặc định của Vite
    credentials: true
}));

app.use('/api/auth', authRoutes);

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

// Thêm middleware để serve static files
app.use('/images', express.static('public/images'));