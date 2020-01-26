var express = require('express');

let router = express.Router();

let PersonController = require('../controllers/PersonController');
let ProductController = require('../controllers/ProductController');

router.get('/people', PersonController.all);
router.get('/products', ProductController.all);

module.exports = router;