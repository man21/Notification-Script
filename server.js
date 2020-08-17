
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
const port = process.env.PORT || 3002;


var request = require('request');
var cheerio = require('cheerio');
var searchTerm = 'screen+scraping';
var url = 'https://useinfluence.co'// + searchTerm;
// request(url, function(err, resp, body){
//   $ = cheerio.load(body);

//   links = $('script'); 
//   $(links).each(function(i, link){
//     console.log($(link).text() + ':\n  ' + $(link).attr('src'));

//   });
// });


request(url, function(err, resp, body){
  // $ = cheerio.load(body);

  var jsLink = []

   $ = cheerio.load(body, {xmlMode: true});

   var  str = $('script:not([src])')[0].children[0].data

  links = $('script'); 
  $(links).each(function(i, link){

    var data ;
    data =   $(link).attr('src') 

    if(data == undefined){

      var first  = str.indexOf(".src")
      data = str.slice(first, str.indexOf('.js', first )).replace(/\s/g,'').slice(6)+ ".js"
      // console.log(data, "!!!!!!!!!!11")
    } 

    if(!jsLink.includes(data)){
      jsLink.push(data)

    }

    // console.log(data)
    //console.log($(link).text() + ':\n  ' + $(link).attr('src'));
  });

  console.log(jsLink)
});




// var Crawler = require("crawler");
 
// var c = new Crawler({
//     maxConnections : 10,
//     // This will be called for each crawled page
//     callback : function (error, res, done) {
//         if(error){
//             console.log(error);
//         }else{
//             var $ = res.$;
//             // $ is Cheerio by default
//             //a lean implementation of core jQuery designed specifically for the server
//             console.log($("title").text());
//         }
//         done();
//     }
// });

// // Queue just one URL, with default callback
// // c.queue('http://www.amazon.com');
 
// // // Queue a list of URLs
// // c.queue(['http://www.google.com/','http://www.yahoo.com']);
 
// // Queue URLs with custom callbacks & parameters
// c.queue([{
//     uri: 'https://useinfluence.co',
//     jQuery: false,
 
//     // The global callback won't be called
//     callback: function (error, res, done) {
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Grabbed', res.body.length, 'bytes');
//         }
//         done();
//     }
// }]);
 
// Queue some HTML code directly without grabbing (mostly for tests)
// c.queue([{
//     html: '<p>This is a <strong>test</strong></p>'
// }]);




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





 
