const { Sequelize } = require('sequelize');

// Stellen Sie sicher, dass Ihre Datenbank-Konfiguration korrekt ist
const sequelize = new Sequelize('mydatabase', 'myuser', 'mypassword', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Stellen Sie sicher, dass der Fehler weitergegeben wird
  }
};

module.exports = { connectDB, sequelize };
