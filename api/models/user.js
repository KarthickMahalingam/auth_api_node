var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var timestamps =  require('mongoose-timestamp');
var Schema = mongoose.Schema;
var pry = require('pryjs');
var jwt = require('jsonwebtoken');

var UserSchema = new Schema({
    login_name: String,
    password: String,
    first_name: String,
    last_name: String,
    email: String,
    last_logged_in: Date,
    admin: Boolean
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


UserSchema.plugin(timestamps);
var User = mongoose.model('User', UserSchema);
module.exports = User;


