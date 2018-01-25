var mongoose = require('mongoose');
var pry = require('pryjs');
var User = require('../../api/models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var express = require('express');
var app = express();
var UserValidation = require('../services/userValidation').UserValidation;
var userValidation = new UserValidation();

exports.Login = function (req, res) {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    userValidation.validateUser(req, res);
};

exports.Signup = function(req, res){
    console.log(req.body);
    var user = new User({
        login_name: req.body.loginName,
        password: userValidation.generateHashPassword(req.body.password),
        email: req.body.email,
        first_name: req.body.firstName,
        last_name: req.body.lastName
    });
    user.save(function(err, results){
        if(results._id !=  null){
            res.send("Successfully signed up user");
        }
    })
};