var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ProductModel = new Schema({
    'name': String,
    'department': String,
    'price': String,
});

module.exports = mongoose.model('Product', ProductModel);