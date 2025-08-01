const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router/router.js');

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas base
app.use('/api/konecta/', router);

module.exports = app;
