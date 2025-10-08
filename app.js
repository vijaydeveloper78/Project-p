require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Create app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
const authRoutes = require('./src/routes/authRoutes');
const imageRoutes = require('./src/routes/imageRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('.');
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
