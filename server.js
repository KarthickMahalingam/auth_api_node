var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    morgan = require('morgan');
var login = require('./api/routes/login');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./api/config/database');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(config.database);

app.use('/api', login);
app.use(passport.initialize());
app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.listen(port, function () {
    console.log('API listening started- listening on port: ' + port);
});

