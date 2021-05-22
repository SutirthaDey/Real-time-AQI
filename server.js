const express= require("express");
const app= express();

const https= require("https");
var path = require('path');
const api_key="de4f0539cec6c36bb2c3bc2dacefdd8d9104077f";
var url="";
var weatherData=0;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '1mb'}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/"+"index.html");
});
//"22.56263","88.36304"
app.post('/', function(req, res){
    const lat=req.body.latitude;
    const long=req.body.longitude;
    const data={
      status:"Success",
      latitude:lat,
      longitude:long
    }
    url="https://api.waqi.info/feed/geo:" + lat + ";" + long + "/?token=" + api_key + "";
    https.get(url, function(response){

      response.on("data",function(data){
        weatherData = JSON.parse(data);
        //console.log(weatherData);
        res.send(weatherData);
      })
    })
});
app.listen(process.en.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
