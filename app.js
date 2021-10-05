const express = require('express');
const https = require('https');
// const parser = require("body-parser");

const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "bab864acdd8c088fbaf6ecee58e9594d";
    const units = "metric";
    const url  = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&units=" + units + "&appid=" + apiKey;
   
    https.get(url, function(response){
        console.log(response.statusCode);

        // Get Data from the response and Parse that as a JSON.
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.list[0].main.temp;
            const description = weatherData.list[0].weather[0].description;
            const  feelsLike = weatherData.list[0].main.feels_like;
            const icon = weatherData.list[0].weather[0].icon;
            const iconImage = ("http://openweathermap.org/img/wn/" + icon + "@2x.png");   

            // Logging data being passed on the Console:
            console.log("real temp: " + temp);
            console.log("feels like: " + feelsLike);
            console.log(icon);
            console.log(iconImage);

            res.write("<h1>The weather in " + query + " is " + temp + " degrees Celsius right now.");
            res.write("<h3>Description: </h3>");
            res.write("<p>" + description + "</p>");
            res.write("<img src=" + iconImage + ">")
            res.send();
        });
    });
});




app.listen(3000, function(){
    console.log("Server started on port 3000");
})