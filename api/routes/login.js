var express = require('express');
var morgan = require('morgan');
const routes = express.Router();
var app = express();
var bodyParser = require("body-parser");
var passport = require('passport');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

var LoginController = require('../../api/controllers/loginController');
routes.route('/login')
      .post(LoginController.Login);

routes.get('/', function(req, res){
   res.status(200).json({ message: 'connected'});
});

routes.route('/signup')
      .post(LoginController.Signup);

module.exports = routes;