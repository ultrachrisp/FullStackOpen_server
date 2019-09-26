const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const Contact = require('./models/contact');
// const cors = require('cors');

const app = express();
// app.use(cors());
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

morgan.token('body', function(req, res) {
	return JSON.stringify({name: req.body.name, number:req.body.number});
});

app.use(express.static('build'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.post('/api/persons', (req, res, next) => {
    const { body } = req;

    if(!body.name || !body.number){
        res.status(412).send({ error: 'Fields are empty'});
    }

    const contact = new Contact({
        name: body.name,
        number: body.number
    });
    
    contact
        .save()
        .then(savedContact => res.json(savedContact.toJSON()) )
        .catch(error => next(error));
});

app.get('/api/persons', (req, res, next) => {
    Contact.find({})
        .then(contacts => res.json(contacts.map(contact => contact.toJSON())) )
        .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id)
        .then(contact => res.json(contact.toJSON()) )
        .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const update = {
        name: req.body.name,
        number: req.body.number
    };

    Contact.findByIdAndUpdate(req.params.id, update, { new: true })
        .then(updatedContact => res.json(updatedContact.toJSON() ))
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end() )
        .catch(error => next(error));
});

app.get('/info', (req, res, next) => {
    Contact.find({})
        .then(contacts => 
            res.send(`<p>Phonebook has info for ${contacts.length} people.</p><p>${new Date(Date.now())}`)
        )
        .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return res.status(400).send({ error: 'malformatted id'});
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
  }
    return next(error);
};
app.use(errorHandler);

var PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
