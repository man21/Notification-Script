
// var express = require("express");
// var app = express();
// var path = require("path");
// var port = process.env.PORT || 3000;

// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
// });
// app.listen(port);
// console.log("Server running at Port 3000");


const express = require('express');
const bodyParser = require('body-parser');

const hsts = require('hsts');
const path = require('path');
const compression = require('compression');

const mongoose = require('mongoose');
const url = require('./connection');

mongoose.connect(url,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
     
    })
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
  

const app = express();
const port = process.env.PORT || 3000;

//body parser middlewares
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(hsts({ maxAge: 5184000 }));
app.use(compression());

app.use(express.static(path.join(__dirname, 'HTML')));


const registerRoutes = require('./routes/register');
app.use('/register',registerRoutes);

//start server
app.listen(port, function () {
    console.log("server connection established");
});




 
