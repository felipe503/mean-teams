const express = require("express");
const router = express.Router();
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

//group profile
router.get('/profile',(req, res, next) => {
  Group.getAllGroups((groups) => {
    res.json(groups);
  });
});

module.exports = router;
