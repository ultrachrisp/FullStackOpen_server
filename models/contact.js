const mongoose = require('mongoose');

const url = process.env.MONGODB;

console.log('connecting to',url);

mongoose.set('useFindAndModify', false);

mongoose.connect(url, {useNewUrlParser: true})
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch(error =>{
        console.log('error connecting to MongoDB:', error.message);
    });

const contactSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
});

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Contact', contactSchema);
