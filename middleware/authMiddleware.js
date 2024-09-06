const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log("Authorization Header:", authHeader); // Debugging: Ausgabe des Authorization-Headers
  console.log("Token:", token); // Debugging: Ausgabe des Tokens

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verify Error:", err); // Debugging: Ausgabe des Fehlerobjekts
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};


module.exports = authenticateToken;
