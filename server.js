
// Require Express to run server and routes
const express=require("express");
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=3000;
app.listen(port,function(){
    console.log(`server is working on ${port}`);
});

const weatherData=[];
    
//POST ROUTE
app.post("/addWeather",addWeather);
function addWeather(req, res) {
    newData={
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
    weatherData.push(newData);
    res.send(weatherData);
    console.log(weatherData);
};

app.get("/all", getData);
    function getData(req, res){
    res.send(weatherData);
    console.log(weatherData);
    };
    