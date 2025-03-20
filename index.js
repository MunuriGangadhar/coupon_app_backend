require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB using env variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);

// Start server on PORT from env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${process.env.BASE_URL || `http://localhost:${PORT}`}`));