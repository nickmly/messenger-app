var Message = require('../models/message');

// Get all messages
exports.getMessages = function(req,res){
    Message.find().then(function(messages){
        res.json(messages);
    }).catch(function(err){
        console.log(err);
    });
}

// Create a new message
exports.createMessage = function(req,res){
    console.log(req.body);
    Message.create(req.body).then(function(newMessage){
        res.status(201).json(newMessage); // send new message back with status code of 201
    }).catch(function(err){
        res.send(err);
        console.log(err);
    });
}

module.exports = exports;