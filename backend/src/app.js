const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;