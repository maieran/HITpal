const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Training = sequelize.define('Training', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  workoutType: { type: DataTypes.STRING, allowNull: false },
  repetitions: { type: DataTypes.INTEGER, allowNull: false },
  sets: { type: DataTypes.INTEGER, allowNull: false },
  weight: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Training;
