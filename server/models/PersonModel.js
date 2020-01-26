var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PersonModel = new Schema({
    'name': String,
    'country': String,
    'email': String,
    'company': String
});

module.exports = mongoose.model('Person', PersonModel);