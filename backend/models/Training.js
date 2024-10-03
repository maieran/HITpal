const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); // Import der User-Modelldatei

const Training = sequelize.define('Training', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Referenziert die Tabelle 'Users'
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Name des Trainings
  },
  repetitions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false, // In Minuten
  },
  trainingDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

// Beziehung zwischen Training und User herstellen
Training.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Training, { foreignKey: 'userId' });

module.exports = Training;
