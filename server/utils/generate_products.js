var mongoose = require('mongoose');
var faker = require('faker');

let ProductModel = require('../models/ProductModel');

mongoose.connect('mongodb://localhost:27017/auth_angular',
    { useNewUrlParser: true }
);

async function add(num) {
    try {
        for (let i = 0; i <= num; i++) {
            const prod = new ProductModel();
            prod.name = faker.commerce.productName();
            prod.department = faker.commerce.department();
            prod.price = faker.commerce.price();
            await prod.save();
        }
    } catch (error) {
        console.log(error);
    }
}

add(100)
    .then(() => {
        console.log('Success!');
        mongoose.disconnect();
    });