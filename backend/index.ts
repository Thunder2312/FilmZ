const express = require('express');
const userRoutes = require('./routes/app');
require('dotenv').config();
const cors = require('cors');
const app = express();
const movieRoutes = require('./routes/movies')
const theaterRoutes = require('./routes/theater')
const showtimeRoutes = require('./routes/showtimes')
const screenRoutes = require('./routes/screens');
// Option 1: Allow a specific origin
app.use(cors({
  origin: 'http://localhost:4200', // Angular app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
const PORT = process.env.PORT || 3000;

// Mount routes
app.use('/user', userRoutes);
app.use('/movies', movieRoutes);
app.use('/theaters', theaterRoutes);
app.use('/showtimes', showtimeRoutes);
app.use('/screens', screenRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
