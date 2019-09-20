const mongoose = require('mongoose');

if ( process.argv.length<3 ) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

// const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`;
<<<<<<< HEAD
const url = `mongodb+srv://goTime:${password}@cluster0-ax72n.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const Contact = mongoose.model('Contact', contactSchema);

if(process.argv[3] && process.argv[4]){
    const contact = new Contact({
        name: String(process.argv[3]),
        number: Number(process.argv[4])
    });

    contact.save().then(response => {
        console.log(`added ${response.name} number ${response.number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`);
        });
        mongoose.connection.close();
    });
}
=======
const url = `mongodb+srv://goTime:${password}@cluster0-ax72n.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// });

// note.save().then(response => {
//     console.log('note saved!');
//     mongoose.connection.close();
// });

Note.find({}).then(result => {
  result.forEach(note => {
      console.log(note);
  });
    mongoose.connection.close();
});
>>>>>>> c3c8a8ba7c234f0eb3eba7d8b456c463adfde88b

