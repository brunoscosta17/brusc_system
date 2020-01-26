var mongoose = require('mongoose');
var faker = require('faker');

let PersonModel = require('../models/PersonModel');

mongoose.connect('mongodb://localhost:27017/auth_angular',
    { useNewUrlParser: true }
);

async function add(num) {
    try {
        for (let i = 0; i <= num; i++) {
            const person = new PersonModel();
            person.name = faker.name.firstName();
            person.country = faker.address.country();
            person.email = faker.internet.email();
            person.company = faker.company.companyName();
            await person.save();
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