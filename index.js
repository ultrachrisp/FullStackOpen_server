const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();

// app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

morgan.token('body', function(req, res) {
	return JSON.stringify({name: req.body.name, number:req.body.number});
});

let phonebook = {
    "persons": [
        {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
        }
    ]
};

function generateID(){
    return Math.floor(Math.random()* 99999);
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
    res.json(phonebook.persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.persons.find(person => person.id === id);
    if(person){
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.post('/api/persons', (req, res) => {
    if(!req.body.name || !req.body.number) {
        res.status(412).send({ error: 'Fields are empty'});
    } else if(phonebook.persons.some(person => person.name === req.body.name)) {
        res.status(409).send({ error: 'Name must be unique'});
    } else {
        const newEntry = {...req.body, id: generateID()};
        phonebook.persons = phonebook.persons.concat(newEntry);

        res.send(newEntry);
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook.persons = phonebook.persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${phonebook.persons.length} people.</p><p>${new Date(Date.now())}`);
});

var PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
