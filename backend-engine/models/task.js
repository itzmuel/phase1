const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  content: { type: DataTypes.STRING, allowNull: false },
  isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Task;