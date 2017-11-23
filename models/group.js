const mongoose = require('mongoose');
const config = require('../config/database');

//Group Schema
const GroupSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  users:{
    type: Array,
    required: true
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
