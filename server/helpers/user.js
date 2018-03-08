var User = require('../models/user');


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
        res.json(users);
    }).catch(function(err){
        console.log(err);
        res.send(err);
    });
}

// Register new user
exports.register = function(req,res) {
    console.log(req.body);
    User.create(req.body).then(function(newUser){
        res.status(201).json(newUser);
    }).catch(function(err){
        console.log(err);
        res.send(err);
    });
}   

exports.login = function(req,res) {
    console.log(req.body);
    User.findOne({username: req.body.username}).then(function(user){
        user.comparePass(req.body.password, function(err, isMatch){
            if(isMatch) {
                res.json({message: "Correct!"});
            }
        })
    });
}

module.exports = exports;