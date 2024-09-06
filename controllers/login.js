// controllers/login.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Einloggen eines Benutzers
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Suche nach einem Benutzer mit der angegebenen E-Mail
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(400).json({ message: 'Benutzer nicht gefunden' });
      }
  
      // Überprüfe, ob das Passwort korrekt ist
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Ungültiges Passwort' });
      }
  
      // Erstelle ein JWT-Token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  
      // Sende das Token als Antwort
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Login fehlgeschlagen', error: error.message });
    }
  };

  module.exports = loginUser;