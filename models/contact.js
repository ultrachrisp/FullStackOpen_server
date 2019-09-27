const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB;

mongoose.set('useFindAndModify', false);

mongoose.connect(url, {useNewUrlParser: true})
    .then(() => console.log('connected to MongoDB') )
    .catch(error => console.log('error connecting to MongoDB:', error.message) );

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    number: {
        type: String,
        required: true,
        minlength: 8,
        unique: true
    }
});

contactSchema.plugin(uniqueValidator);
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Contact', contactSchema);
