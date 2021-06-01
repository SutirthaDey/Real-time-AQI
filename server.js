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
app.post('/', function(req, res){
    const lat=req.body.latitude;
    const long=req.body.longitude;
    const data={
      status:"Success",
      latitude:lat,
      longitude:long
    }
    url1="https://api.waqi.info/feed/geo:" + lat + ";" + long + "/?token=" + api_key + "";
    url2="https://api.openweathermap.org/data/2.5/air_pollution/history?lat=22.06047&lon=88.109737&start=1622246400&end=1622264400&appid=095ed0eb2eca12fc9a1de055bf7bb87b#";
    https.get(url1, function(response){
      response.on("data",function(data){
        let weatherData = JSON.parse(data);
        console.log(weatherData);
        res.send(weatherData);
      })
    })
  });
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
