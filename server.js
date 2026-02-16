require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./backend-engine/routes/authRoutes');
const projectRoutes = require('./backend-engine/routes/projectRoutes');
const sequelize = require('./backend-engine/config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Database Connection & Sync
const PORT = process.env.PORT || 5000;

require('./backend-engine/models');
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected and synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});