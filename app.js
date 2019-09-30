const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRouter = require('./controllers/contact');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
console.log('connecting to', config.MONGODB);

mongoose.connect(config.MONGODB, {useNewUrlParser: true})
    .then(() => console.log('connected to MongoDB') )
    .catch(error => console.log('error connecting to MongoDB:', error.message) );

const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/persons', contactRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
