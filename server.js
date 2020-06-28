
// var express = require("express");
// var app = express();
// var path = require("path");
// var port = process.env.PORT || 3000;

// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
// });
// app.listen(port);
// console.log("Server running at Port 3000");


// const express = require('express');
// const bodyParser = require('body-parser');

// const hsts = require('hsts');
// const path = require('path');
// const compression = require('compression');

// const mongoose = require('mongoose');
// const url = require('./connection');

// mongoose.connect(url,
//     {
//       useNewUrlParser: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
     
//     })
//     mongoose.set('useNewUrlParser', true);
//     mongoose.set('useFindAndModify', false);
//     mongoose.set('useCreateIndex', true);
  

// const app = express();
// const port = process.env.PORT || 3000;

// //body parser middlewares
// app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ extended: false }));


// app.use(hsts({ maxAge: 5184000 }));
// app.use(compression());


// // app.use('/',function(req,res){
// //   res.sendFile(path.join(__dirname, 'HTML'));
// // });

//  app.use(express.static(path.join(__dirname, 'HTML')));


// const registerRoutes = require('./routes/register');
// app.use('/register',registerRoutes);

// //start server
// app.listen(port, function () {
//     console.log("server connection established");
// });




const express = require('express');
const bodyParser = require('body-parser');

// const Nightmare = require('nightmare');
// const cheerio = require('cheerio');

// const hsts = require('hsts');
const path = require('path');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3001;


// nightmare
//   .goto(url)
//   .wait('body')
//   .evaluate(() => document.querySelector('body').innerHTML)
//   .end()
// .then(response => {
//   console.log(getData(response));
// }).catch(err => {
//   console.log(err);
// });

// // Parsing data using cheerio
// let getData = html => {
//   data = [];
//   const $ = cheerio.load(html);
//   $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
//     data.push({
//       title : $(elem).text(),
//       link : $(elem).find('a.storylink').attr('href')
//     });
//   });
//   return data;
// }



// const mongoose = require('mongoose');
// const url = require('./connection');

// mongoose.connect(url,
//     {
//       useNewUrlParser: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
     
//     })
//     mongoose.set('useNewUrlParser', true);
//     mongoose.set('useFindAndModify', false);
//     mongoose.set('useCreateIndex', true);
  

//body parser middlewares
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));





// app.use(hsts({ maxAge: 5184000 }));
app.use(compression());

// app.use(express.static(path.join(__dirname, 'HTML')));

app.use('/', express.static(path.join(__dirname, 'HTML')))
// app.use("/api", api);

// const registerRoutes = require('./routes/register');
// app.use('/register',registerRoutes);

//start server
app.listen(port, function () {
    console.log("server connection established");
});





 
