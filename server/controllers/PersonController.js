var PersonModel = require('../models/PersonModel');

module.exports = {
    all: (req, res) => {
        PersonModel.find({}).lean().exec((error, people) => {
            if (error)
                return res.json(error);
            return res.json(people);
        });
    }
}