const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database'); // Stellen Sie sicher, dass die Funktion hier importiert wird
require('dotenv').config(); // Diese Zeile muss hinzugefügt werden, wenn sie noch nicht existiert.
const path = require('path');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes');
const app = express();

// Nutzen von Cross-Origin Resource Sharing, 
// falls später backend und fronend auf verschiedenen Servern ist 
app.use(cors());


// Middleware zum Parsen von JSON-Anfragen
//app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', require('./routes/userRoutes'));


app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes);



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
