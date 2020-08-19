

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3002;

const providerRoutes = require('./routes/provider');
const configurationRoutes = require('./routes/configuration');

const dataUsageRouter = require('./routes/dataUsage');

const thirdPartyRouter = require('./routes/thirdParty');


const mongoose = require('mongoose');







// var request = require('request');
// var cheerio = require('cheerio');
// var url = 'http://localhost:3002'




// request(url, function(err, resp, body){
//   // $ = cheerio.load(body);

//   var jsLink = []

//    $ = cheerio.load(body, {xmlMode: true});

//    var  str = $('script:not([src])')[0].children[0].data

//   links = $('script'); 
//   $(links).each(function(i, link){

//     var data ;
//     data =   $(link).attr('src') 

//     if(data == undefined){

//       var first  = str.indexOf(".src")
//       data = str.slice(first, str.indexOf('.js', first )).replace(/\s/g,'').slice(6)+ ".js"
//       // console.log(data, "!!!!!!!!!!11")
//     } 

//     var arr = data.split("/");

//     var result =  arr[2]


//     if(!result.includes("bootstrap") || !result.includes("jquery") ||  !result.includes("bootstrapcdn")){


//       if(!jsLink.includes(result)){ 
//         jsLink.push(result)
  
//       }
//     }


   

//     // console.log(data)
//     //console.log($(link).text() + ':\n  ' + $(link).attr('src'));
//   });

//   // console.log(jsLink)
// });





mongoose.connect("mongodb+srv://admin_abc:admin_abc@tehcollegeplacement-an6dx.mongodb.net/cookie?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
   
  })
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);


//body parser middlewares
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));





// app.use(hsts({ maxAge: 5184000 }));
app.use(compression());

// app.use(express.static(path.join(__dirname, 'HTML')));

app.use('/', express.static(path.join(__dirname, 'HTML')))


app.use('/provider', providerRoutes);
app.use('/configuration', configurationRoutes)
app.use('/dataUsage', dataUsageRouter)
app.use('/thirdParty', thirdPartyRouter);


//start server
app.listen(port, function () {
    console.log("server connection established");
});





 
