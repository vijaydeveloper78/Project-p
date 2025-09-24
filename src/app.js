require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Create app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON body

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Photo Studio Admin Dashboard API running...');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected ');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
  })
  .catch((err) => console.error('MongoDB connection error ', err));
