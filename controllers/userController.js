const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/User'); // Importieren des User-Modells

// Registrierung eines neuen Benutzers
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Einloggen eines Benutzers
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Abrufen des Benutzerprofils
const getUserProfile = async (req, res) => {
  try {
    // Die Authentifizierung sollte hier überprüft werden
    const userId = req.user.id; // Angenommen, der Benutzer-Id wurde durch Middleware hinzugefügt

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
