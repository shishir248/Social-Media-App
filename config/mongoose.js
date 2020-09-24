//Get mongoose
const mongoose = require('mongoose');

//Provide connection
mongoose.connect('mongodb://localhost/codeial_development');
const db = mongoose.connection;

//To check if connected to database
db.on('error', console.error.bind(console, 'Error connecting to Database'));
db.once('open', function () {
    console.log("Connected to database");
})

module.exports = db;