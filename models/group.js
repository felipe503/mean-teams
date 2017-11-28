const mongoose = require('mongoose');
const config = require('../config/database');

//Group Schema
const GroupSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  users:{
    type: Array
  }
});

const Group = module.exports = mongoose.model('Group', GroupSchema);

module.exports.getGroupByName = function(name, callback){
  const query = {name: name}
  Group.findOne(query, callback);
}

module.exports.addGroup = function(newGroup, callback){
  Group.getGroupByName(newGroup.name, (err, group) => {
    if(err) throw err;
    if(!group){
      newGroup.save(callback);
    } else {
      callback(new Error('Error'));
    }
  });
}

module.exports.getAllGroups = function(callback){
  Group.find({}, (err, results) => {
    if(err) throw err;
    callback(results);
  });
}

module.exports.addUsersToGroup = function (group, users, callback) {
  const query = {name: group.name};
  const update = {users:group.users};
  const options = {new: true};
  Group.findOneAndUpdate(query, update, options,(err, group) => {
    if(err) throw err;
    callback(null, group);
  });
};
