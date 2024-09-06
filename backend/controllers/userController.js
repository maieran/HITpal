const User = require('../models/User'); // Importieren des User-Modells

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
  getUserProfile
};
