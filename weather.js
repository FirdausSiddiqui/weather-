const express=require("express");
const http=require("http");
var bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{

  res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res)
{
  var cityName=req.body.cityname;
  var url="http://api.weatherstack.com/current?access_key=761e03c74e03de7cc64654e24e393b99&query="+cityName;

  http.get(url,function(response)
  {
  response.on("data",function(data)
  {
  var weatherData=JSON.parse(data);
  var temp=weatherData.current.temperature;
  var city=weatherData.location.name;
  var weather_description=weatherData.current.weather_descriptions;
  res.write("<h1>weather application</h1>");
  res.write("<h1>Temperature of the "+city+" is "+temp+" degree celcius</h1>");
  res.write("<p>"+weather_description+"</p>");
  res.send();
  })
  });
});


app.listen(3030,function()
{
  console.log("the server is running on port 3030");
});
