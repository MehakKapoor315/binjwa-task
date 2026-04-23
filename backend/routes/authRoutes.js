const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register — Create an admin user (One-time or for setup)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ email, password });
    res.status(201).json({ success: true, message: 'Admin created' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login — Authenticate admin and return token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'fallback_secret_123',
        { expiresIn: '30d' }
      );

      res.json({
        success: true,
        token,
        user: { id: user._id, email: user.email }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
