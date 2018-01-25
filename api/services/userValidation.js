var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var bcrypt   = require('bcrypt-nodejs');

UserValidation = function() {
    this.validateUser = function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.sign(user.toJSON(), config.secret);
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            }
        });
    };

    this.generateHashPassword =  function(password){
        bcrypt.hash(password, 10, null, function(err, hash) {
            console.log(hash);
            return hash;

        });
    };
};
exports.UserValidation = UserValidation;