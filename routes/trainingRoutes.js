const express = require('express');
const router = express.Router();
const { Training } = require('../models/Training'); // Ihr Training-Modell importieren

// Route zum Erstellen eines neuen Trainings
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    // Erstellen eines neuen Trainings
    const training = await Training.create({
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
