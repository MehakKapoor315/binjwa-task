require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const investorRoutes = require('./routes/investorRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', adminRoutes);
app.use('/api/investor', investorRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Commercial Real Estate Platform API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
