var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

let app = express();

let api = require('./routes/api');
var auth = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auth_angular',
    { useNewUrlParser: true }
);

app.use('/', api);
app.use('/auth', auth);

app.use((req, res, next) => {
    res.status(404).send({ message: 'Not found!' });
});

app.listen(3000);