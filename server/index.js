var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Set up body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/// Mongoose setup ///
var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/message-app');
mongoose.Promise = Promise;
//////////////////////
var userRoutes = require('./routes/user');
var messageRoutes = require('./routes/message');

app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.get('/', function(req,res){
    res.send("Root route");
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, function(){
    console.log(`Server started on ${PORT}`)
});