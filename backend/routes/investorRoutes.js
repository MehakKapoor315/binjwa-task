const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const Service = require('../models/Service');
const Insight = require('../models/Insight');

// GET /api/investor/property — Fetch all properties
router.get('/property', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/investor/service — Fetch all services
router.get('/service', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/investor/insight — Fetch all insights
router.get('/insight', async (req, res) => {
  try {
    const insights = await Insight.find().sort({ createdAt: -1 });
    res.json({ success: true, data: insights });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
