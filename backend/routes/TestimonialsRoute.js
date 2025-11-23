const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonials');

// GET all testimonials with a limit (e.g., GET /api/testimonials?limit=3)
router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const testimonials = await Testimonial.find()
      .sort({ date: -1 })
      .limit(limit ? parseInt(limit) : 0);  // Apply limit if provided
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST a new testimonial
router.post('/', async (req, res) => {
  try {
    const { name, message, isVerified } = req.body;
    const newTestimonial = new Testimonial({ name, message, isVerified });
    const saved = await newTestimonial.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Update a testimonial by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, message, isVerified } = req.body;
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, message, isVerified },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a testimonial by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
