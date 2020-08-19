const mongoose = require('mongoose')
const Provider = require('../modals/provider')


var request = require('request');
var cheerio = require('cheerio');
// var url = 'https://useinfluence.co'


exports.searchDomain = async (req, res) => {

    if (!req.body.websiteUrl) {
        res.sendStatus(400)
    } else {

       await request(req.body.websiteUrl, async function(err, resp, body){
          
            var jsLink = []
          
             $ = await cheerio.load(body, {xmlMode: true});
          
             var  str = $('script:not([src])')[0].children[0].data
          
            links = $('script'); 
            $(links).each(function(i, link){
          
              var data ;
              data =   $(link).attr('src') 
          
              if(data == undefined){
          
                var first  = str.indexOf(".src")
                data = str.slice(first, str.indexOf('.js', first )).replace(/\s/g,'').slice(6)+ ".js"
              } 
          
              var arr = data.split("/");
          
              var result =  arr[2]
          
              jsLink.push(result)
                       
            
          
            });      
            
            res.send(jsLink)
          });
 



    }
}


exports.storeType = (req, res) => {

    if (!req.body.websiteUrl) {
        // console.log(req.body)
        res.sendStatus(400)
    } else {

    req.body.provider.map( provider  =>  {

        var register = Provider({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.websiteUrl,
            websiteUrl: req.body.websiteUrl,
            type: provider.type,
            provider: provider.policyUrl,
            createdAt: new Date(),
            updatedAt: new Date()
        });
         register.save().then(function (result) {
            if (!result) {
                throw "RECORD NOT SAVED"
            } else {
                res.sendStatus(200)
            }
        }).catch((err) => {
            res.status(500).send(err)
        })

    })

        
    }

}


exports.fetchAll = (req, res) =>{

    Provider.find().exec().then((result) =>{
        res.send(result)
    })
}


exports.fetchById = (req, res) =>{

    Provider.find({_id: req.params.id}).exec().then((result) =>{
        res.send(result)
    })
}

exports.fetchByWebsite = (req, res) =>{

    Provider.find({websiteUrl: req.query.websiteUrl}).exec().then((result) =>{
        res.send(result)
    })
}