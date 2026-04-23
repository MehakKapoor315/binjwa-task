const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const Service = require('../models/Service');
const Insight = require('../models/Insight');
const { protect } = require('../middleware/authMiddleware');

// Apply protection to all routes in this file
router.use(protect);

// --- PROPERTY ADMIN ---
router.post('/property', async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/property/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/property/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Property deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// --- SERVICE ADMIN ---
router.post('/service', async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/service/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/service/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// --- INSIGHT ADMIN ---
router.post('/insight', async (req, res) => {
  try {
    const insight = await Insight.create(req.body);
    res.status(201).json({ success: true, data: insight });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/insight/:id', async (req, res) => {
  try {
    const insight = await Insight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: insight });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/insight/:id', async (req, res) => {
  try {
    await Insight.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Insight deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
