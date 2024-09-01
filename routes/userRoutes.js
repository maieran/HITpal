const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Korrekte Art, das User-Modell zu importieren
console.log("User is: " + User);


// Route zum Erstellen eines neuen Benutzers
router.post('/', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/*
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
});*/

// Route zum Abrufen aller Benutzer
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
