var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.clearDb = function() {
    User.remove({}, function(){
        console.log("Cleared db");
    });
}

exports.createDummy = function(){
    var user = new User({username: "dummy", password: "password123"});
    user.save(function(err){
        if(err) throw err;
    });
}

// FOR DEBUG ONLY, show all users
exports.showAll = function(req,res) {
    User.find().then(function(users){
        res.send(users);
    }).catch(function(err){
        console.log(err);
        res.send(err);
    });
}

// Register new user
exports.register = function(req,res) {
    User.create(req.body).then(function(newUser){
        var token = jwt.sign({id: newUser._id}, config.secret, {expiresIn: 86400}); // expires in 24 hours
        res.status(201).send({auth: true, token: token});
    }).catch(function(err){
        console.log(err);
        res.send(err);
    });
}

exports.getUser = function(req,res) {
    // Get token provided through headers (default key is x-access token)
    var token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).send({auth: false, message: 'No token provided'});
    }

    jwt.verify(token, config.secret, function(err,decoded){
        if(err){
            return res.status(500).send({auth: false, message: 'Failed to authenticate token'});
        }
        // Will send back the decoded userId if verified
        //res.status(201).send(decoded);
        // Get user but project the password to nothing so we cannot see their password
        User.findById(decoded.id, {password: 0}).then(function(user){
            res.status(201).send(user);
        }).catch(function(err){
            res.send({message: 'Error: No user found'});
        });
    });
}

exports.login = function(req,res) {
    var responseObj = {
        auth: false,
        token: null,
        message: 'Incorrect username or password'
    };

    User.findOne({username: req.body.username}).then(function(user){
        user.comparePass(req.body.password, function(err, isMatch){
            if(isMatch) {
                var token = jwt.sign({id: user._id}, config.secret, {
                    expiresIn: 86400
                });

                responseObj.auth = true;
                responseObj.token = token;
                responseObj.message = 'Logged in successfully.';   
                return res.status(201).send(responseObj);           
            }            
        })
    }).catch(function(err){
        res.send({message: err});
    });
    res.status(401).send(responseObj);
}

module.exports = exports;