const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Korrekte Art, das User-Modell zu importieren
const authenticateToken = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userController');


// Route zum Erstellen eines neuen Benutzers (z.B. Registrierung)
router.post('/', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({
      username,
      password,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route zum Abrufen des Benutzerprofils (erfordert Authentifizierung)
router.get('/profile', authenticateToken, getUserProfile);

// Route zum Abrufen aller Benutzer (erfordert Authentifizierung)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

// Korrektur: Richtiges module.exports verwenden
module.exports = router;
