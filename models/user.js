const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  skills:{
    type: Object
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}
module.exports.getUserByEmail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}
module.exports.addUser = function(newUser, callback){
  // email must be unique, so i check if email exist on db
  let email = newUser.email;
  User.getUserByEmail(email,(err, user) => {
    if(!user || user == null){
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
        });
      });
    } else {
      //avoiding doubles register with same email
      callback(new Error('Error'));
    }
  });
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.updateUser = function(updateUser, callback){
  const query = {email: updateUser.email};
  const update = {
    name:updateUser.name,
    username:updateUser.username,
    email:updateUser.email,
    password:updateUser.password,
    skills:updateUser.skills
  };
  const options = {new: true};
  User.findOneAndUpdate(query, update, options,(err, user) => {
    if(err) throw err;
    callback(null, user);
  });
}

module.exports.getUsersByGroup = function(group,callback){

}
