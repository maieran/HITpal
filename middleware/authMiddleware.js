
/*
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    if (!req.user) throw new Error();
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
*/

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

const authenticateToken = require('../middleware/authenticateToken');

// Route zum Abrufen des Benutzerprofils (erfordert Authentifizierung)
router.get('/profile', authenticateToken, getUserProfile);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  