

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

const beautify = require('js-beautify')

const fetch = require('node-fetch')


const AWS = require('aws-sdk');

const fs = require('fs');

var minify = require('terser')

const BUCKET_NAME = 'pixels';
const KEY = 'scribe-analytics.js';

const JSON_API = 'https://jsonplaceholder.typicode.com/todos/1';


const ACCESS_KEY = '6VNLBJMI1HA911G0UFVO';
const SECRET_KEY = 'SiZk68LCAIGH38oIOhRJ3hVuuXAhHj5Wt0GA785R';


var wasabiEndpoint = new AWS.Endpoint("s3.wasabisys.com");

    var s3 = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      region: "us-east-1",
      httpOptions: { timeout: 180000 }
    });


    /* 
    * @param {*} str
    * checks if str is a valid JSON object
    * returns boolean
    */
   function isJson(str) {
     try {
         JSON.parse(str);
     } catch (e) {
         return false;
     }
     return true;
   }



   app.post('/addData', function (req, res) {
    try {
      // read file from S3
      fs.readFile(path.resolve(__dirname, `${KEY}`), "utf8", (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            message: err
          });
        }

        const fileBody = beautify(data, { indent_size: 2, space_in_empty_paren: true });
        const fileBodyArray = fileBody.split('\n');

        const variableName = 'apiDataResponse';

        fetch(JSON_API)
          .then(res => res.text())
          .then(async (body) => {
            // check if json is valid
            if (!isJson(body)) {
              return res.status(400).send({
                message: 'Invalid JSON from API response'
              });
            }

            let lineNumber = 0;
            while(!fileBodyArray[lineNumber].includes(`${variableName} =`)) {
              lineNumber += 1;
            }

            const variableLine = fileBodyArray[lineNumber].split('=');

            let run = variableLine[1].includes('[]') ? false : true;
            let endLine = lineNumber + 1;

            while(run) {
              run = fileBodyArray[endLine].includes('}]') ? false : true;
              endLine += 1;
            }

            let newLines = `${variableLine[0]}= ${JSON.stringify([JSON.parse(body)])};`;
            fileBodyArray.splice(lineNumber, (endLine - lineNumber), newLines);

            // const minifiedJS = await minify(fileBodyArray.join('\n'), {
            //   output: {
            //     comments: false,
            //     keep_quoted_props: true
            //   },
            //   compress: {
            //     booleans: false,
            //     collapse_vars: false,
            //     reduce_vars: false,
            //     top_retain: [variableName] },
            //   mangle: false
            // });

            await s3.putObject({
              Bucket: BUCKET_NAME,
              Key: KEY,
              ContentType:'binary',
              Body: Buffer.from(fileBodyArray.join('\n'), 'binary'),
              ACL:'public-read'
            }).promise();

            res.status(200).send({
              message: 'success',
              url: `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${KEY}`
            });

          }).catch((err) => {
            // log error
            console.log(err);
            res.status(500).send({
              message: err
            });
          })
      });
    } catch (err) {
      // log error
      res.status(500).send({
        message: 'Something went wrong'
      });
    }
   })






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

app.use('/', express.static(path.join(__dirname, 'script')))


app.use('/provider', providerRoutes);
app.use('/configuration', configurationRoutes)
app.use('/dataUsage', dataUsageRouter)
app.use('/thirdParty', thirdPartyRouter);


//start server
app.listen(port, function () {
    console.log("server connection established");
});





 
