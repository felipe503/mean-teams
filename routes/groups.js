const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Group = require('../models/group');

//register group
router.post('/register', (req, res, next) => {
  let newGroup = new Group({
    name: req.body.name,
    users:req.body.users
  });

  Group.addGroup(newGroup, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failed to register group'});
    } else {
      res.json({success: true, msg: 'Group registered'});
    }
  });
});

//group all
router.get('/all',passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Group.getAllGroups((groups) => {
    res.json({name: groups});
  });
});

//group add users
router.post('/addUsers', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let group = new Group({
    name: req.body.name,
    users: req.body.users
  });
  Group.addUsersToGroup(group, group.users, (err, group) => {
    if(err){
      res.json({success: false, msg: 'Failed to add users'});
    } else {
      res.json({success: true, msg: 'Users: '+group.users+' added to '+group.name});
    }
  });
});
module.exports = router;
