
var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 3000;

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.listen(port);
console.log("Server running at Port 3000");

 
