const contactRouter = require('express').Router();
const Contact = require('../models/contact');

contactRouter.get('/home', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

contactRouter.get('/list', (req, res, next) => {
    Contact.find({})
        .then(contacts => 
            res.send(`<p>Phonebook has info for ${contacts.length} people.</p><p>${new Date(Date.now())}`)
        )
        .catch(error => next(error));
});

contactRouter.get('/', (req, res, next) => {
    Contact.find({})
        .then(contacts => res.json(contacts.map(contact => contact.toJSON())) )
        .catch(error => next(error));
});

contactRouter.get('/:id', (req, res, next) => {
    Contact.findById(req.params.id)
        .then(contact => res.json(contact.toJSON()) )
        .catch(error => next(error));
});

contactRouter.post('/', (req, res, next) => {
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

contactRouter.put('/:id', (req, res, next) => {
    const update = {
        name: req.body.name,
        number: req.body.number
    };

    Contact.findByIdAndUpdate(req.params.id, update, { new: true })
        .then(updatedContact => res.json(updatedContact.toJSON() ))
        .catch(error => next(error));
});

contactRouter.delete('/:id', (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end() )
        .catch(error => next(error));
});

module.exports = contactRouter;
