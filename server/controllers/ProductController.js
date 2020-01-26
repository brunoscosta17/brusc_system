var ProductModel = require('../models/ProductModel');

module.exports = {
    all: (req, res) => {
        ProductModel.find({}).lean().exec((error, products) => {
            if (error)
                return res.json(error);
            return res.json(products);
        });
    }
}