const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/authMiddleware');
const Training = require('../models/Training');

// Route: Training erstellen
router.post(
  '/',
  authenticateToken,
  [
    body('name').notEmpty().withMessage('Name des Trainings ist erforderlich'),
    body('repetitions').isInt({ min: 1 }).withMessage('Repetitions müssen eine positive Zahl sein'),
    body('sets').isInt({ min: 1 }).withMessage('Sets müssen eine positive Zahl sein'),
    body('weight').isFloat({ min: 0 }).withMessage('Weight muss eine positive Zahl sein'),
    body('duration').isFloat({ min: 0 }).withMessage('Duration muss eine positive Zahl sein'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, repetitions, sets, weight, duration } = req.body;
    try {
      console.log('req.user.userId:', req.user.userId); // Debugging
      const training = await Training.create({
          name,
          repetitions,
          sets,
          weight,
          duration,
          userId: req.user.userId, // Authentifizierter Benutzer
      });      
      res.status(201).json(training);
    } catch (error) {
      res.status(500).json({ message: 'Fehler beim Erstellen des Trainings', error });
    }
  }
);

// Route: Alle Trainings eines Benutzers anzeigen
/* router.get('/', authenticateToken, async (req, res) => {
  try {
    const trainings = await Training.findAll({ where: { userId: req.user.id } });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Trainings', error });
  }
}); */

// Route: Alle Trainings eines Benutzers anzeigen
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('req.user:', req.user); // Debugging: Ausgabe des authentifizierten Benutzers

    const trainings = await Training.findAll({ where: { userId: req.user.userId } }); // Stelle sicher, dass du "userId" statt "id" verwendest
    res.json(trainings);
  } catch (error) {
    console.error("Fehler beim Abrufen der Trainings:", error); // Ausführlichere Fehlermeldung
    res.status(500).json({ message: 'Fehler beim Abrufen der Trainings', error });
  }
});



// Route: Training aktualisieren
router.put(
  '/:id',
  authenticateToken,
  [
    body('name').optional().notEmpty().withMessage('Name des Trainings ist erforderlich'),
    body('repetitions').optional().isInt({ min: 1 }).withMessage('Repetitions müssen eine positive Zahl sein'),
    body('sets').optional().isInt({ min: 1 }).withMessage('Sets müssen eine positive Zahl sein'),
    body('weight').optional().isFloat({ min: 0 }).withMessage('Weight muss eine positive Zahl sein'),
    body('duration').optional().isFloat({ min: 0 }).withMessage('Duration muss eine positive Zahl sein'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, repetitions, sets, weight, duration } = req.body;
    try {
      const training = await Training.findByPk(req.params.id);
      if (!training || training.userId !== req.user.userId) {
        return res.status(404).json({ message: 'Training nicht gefunden' });
      }

      // Aktualisieren der Trainingsdaten
      await training.update({
        name: name || training.name,
        repetitions: repetitions || training.repetitions,
        sets: sets || training.sets,
        weight: weight || training.weight,
        duration: duration || training.duration,
      });

      res.json(training);
    } catch (error) {
      console.log("Fehler beim Aktualisieren der Trainings:", error);
      res.status(500).json({ message: 'Fehler beim Aktualisieren des Trainings', error });
    }
  }
);

// Route: Training löschen
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const training = await Training.findByPk(req.params.id);
    if (!training || training.userId !== req.user.userId) {
      return res.status(404).json({ message: 'Training nicht gefunden' });
    }

    await training.destroy();
    res.json({ message: 'Training erfolgreich gelöscht' });
  } catch (error) {
    console.log("Fehler beim Löschen der Trainings:", error);
    res.status(500).json({ message: 'Fehler beim Löschen des Trainings', error });
  }
});

module.exports = router;
