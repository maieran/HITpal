const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database'); // Stellen Sie sicher, dass die Funktion hier importiert wird

const app = express();

// Middleware zum Parsen von JSON-Anfragen
app.use(express.json());

// Definieren Sie Ihre Routen hier
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Initialisieren der Datenbank
const initializeDatabase = async () => {
  try {
    await connectDB(); // Verbindet sich mit der Datenbank
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1); // Beenden Sie den Prozess im Falle eines Fehlers
  }
};

initializeDatabase().then(() => {
  // Starten Sie den Server, wenn die Datenbank erfolgreich verbunden ist
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
