const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require('./config/database');

//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

const app = express();
const users = require('./routes/users');
//server initialisation
const port = 3030;
//CORS middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//body-parser Middleware
app.use(bodyParser.json());
//passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

//Index route
app.get('/', (req, res, next) => {
  // Handle the get for this route
  res.send('Invalid Endpoint');
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, ()=>{
  console.log('Server started at port '+port);
});
