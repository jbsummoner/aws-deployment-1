const express = require('express');
const http = require('http');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
require('dotenv-flow').config();

const app = express();
const server = http.createServer(app);

// Importing Routes
const IndexRoutes = require('./routes');
const { errorHandlerMiddleware } = require('./middleware');

// settings
app.set('port', process.env.PORT || 3000);
app.set('webAddress', process.env.WEB_ADDRESS || '0.0.0.0');

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(IndexRoutes);

// Error Handler
app.use(errorHandlerMiddleware);

module.exports = { server, app };
