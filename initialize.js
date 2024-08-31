// initialize.js
const { Sequelize } = require('sequelize');

// Erstellen Sie eine Instanz von Sequelize
const sequelize = new Sequelize('mydatabase', 'myuser', 'mypassword', {
  host: 'localhost',  // oder IP-Adresse des Datenbankservers
  dialect: 'mysql'
});

// Funktion zur Verbindung zur Datenbank
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;  // Stellen Sie sicher, dass Fehler weitergegeben werden
  }
};

module.exports = { connectDB };
