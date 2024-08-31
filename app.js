const express = require('express');
const { sequelize, connectDB } = require('./config/database'); // Importieren der Datenbankkonfiguration

const app = express();

// Middleware
app.use(express.json());

// Importieren der Routen
const userRoutes = require('./routes/userRoutes');
const trainingRoutes = require('./routes/trainingRoutes');

// Routen
app.use('/api/users', userRoutes);
app.use('/api/trainings', trainingRoutes);

// Verbindung zur Datenbank herstellen
connectDB().then(() => {
  // Synchronisieren der Modelle (falls erforderlich)
  sequelize.sync().then(() => {
    // Server starten
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Unable to sync database:', err);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
