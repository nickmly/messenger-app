var mongoose = require('mongoose');
var Message = require('./message');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
   username: {
       type: String,
       required: true,
       unique: true
   },
   password: {
       type: String,
       required: true
   },
   messages: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Message'
   }]
});

userSchema.pre('save', function(next){
    var user = this;
    // If the password wasn't modified, move on
    if(!user.isModified('password')) return next();
    // Otherwise, hash the new password
    bcrypt.hash(user.password, 10).then(function(hashedPwd){
        user.password = hashedPwd;
        next();
    }, function(err){
        return next(err);
    });
});

userSchema.methods.comparePass = function(plainPwd, next) {
    bcrypt.compare(plainPwd, this.password, function(err,isMatch){
        if(err) return next(err);
        next(null, isMatch);
    });
};

module.exports = mongoose.model("User", userSchema);