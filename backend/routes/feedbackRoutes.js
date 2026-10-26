const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// 1. GET all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. GET single feedback by ID (for edit view)
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. POST create new feedback
router.post('/', async (req, res) => {
  try {
    const { courseName, courseDuration, feedbackComments, feedbackRating, courseId } = req.body;
    const newFeedback = new Feedback({
      courseName,
      courseDuration: courseDuration || '4 Weeks',
      feedbackComments,
      feedbackRating,
      ...(courseId && { courseId })
    });
    const saved = await newFeedback.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. PUT update existing feedback
router.put('/:id', async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 5. DELETE feedback
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;