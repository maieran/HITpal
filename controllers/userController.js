const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Importieren des User-Modells

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



// Abrufen des Benutzerprofils
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Überprüfe, ob `userId` hier korrekt ist
    console.log('Fetching user with ID:', userId); // Füge Logging hinzu

    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });

    if (!user) {
      console.log('User not found with ID:', userId); // Logging hinzugefügt
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    console.error('Error fetching user profile:', error); // Logging hinzugefügt
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

module.exports = {
  loginUser,
  getUserProfile
};
