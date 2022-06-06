// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let city;
// Require Express to run server and routes
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { stringify } = require('querystring');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8082;
const server = app.listen(port, listening);

function listening() {
  console.log(`runnnig on localhost:${port}`);
}
function calculateData(datex) {
  let dateFuture = new Date(datex);
  let todayDate = new Date();
  let dateDiff = dateFuture - todayDate;
  let dateDiffInDays = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
  console.log('xxxx');
  console.log(dateDiffInDays);
  return dateDiffInDays;
}
// '--------------------------------------------------------------------lat lon
// app.post('/sendingCityDate', getLocations);
let departDate;
app.post('/sendingCityDataToServer', function (req, res) {
  city = req.body.location;
  departDate = req.body.data;
  console.log('Oras si data');
  console.log(city, departDate);
});

function getLocations(req, resp) {
  console.log('xx');
  console.log(departDate);
  console.log(city);
  const getLoc = fetch(
    `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=Vanesa_chi`
  )
    .then((response) => response.json())
    .then((data) => {
      resp.send(data);
    })

    .catch((error) => console.log('error', error));
}
app.get('/sendingLatandLonToClient', getLocations);
// '--------------------------------------------------------------------weather
let lat, lng;
app.post('/sendingLatandLonToServer', function (req, res) {
  lat = req.body.lat;
  lng = req.body.lon;
  country = req.body.country;
  console.log('lat, lon & country');
  console.log(lat, lng, country);
});

async function getWeather(req, resp) {
  let apikey = process.env.API_W_KEY;
  console.log(apikey);
  console.log('este in functie');

  let interval = calculateData(departDate);
  console.log('interval');
  console.log(interval);
  let dataToSend = { weather: [], counter: '' };
  dataToSend.counter = interval.toString();
  if (interval <= 7) {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${apikey}`
      );

      const data = await response.json();
      console.log('a facut fetch pe getWeather');
      dataToSend.weather = data;
      resp.send(dataToSend);
    } catch (error) {
      console.log('Request Failed', err);
    }
  } else {
    fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${apikey}`
    )
      .then((response) => response.json()) // convert to json
      .then((jsonx) => {
        // resp.send(jsonx);
        dataToSend.weather = jsonx;
        resp.send(dataToSend);
      })
      .catch((err) => console.log('Request Failed', err)); // Catch errors}
  }
}
app.get('/sendWeatherToClient', getWeather);
// '--------------------------------------------------------------------image
function getImage(req, resp) {
  let apikey = process.env.API_P_KEY;
  console.log(city);
  const getImg = fetch(
    `https://pixabay.com/api/?key=${apikey}&q=${city}&image_type=photo`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.hits.length != 0) {
        resp.send(data);
      } else {
        const getImg2 = fetch(
          `https://pixabay.com/api/?key=${apikey}&q=${country}&image_type=photo`
        )
          .then((response) => response.json())
          .then((data) => resp.send(data));
      }
    })

    .catch((error) => console.log('error', error));
}
app.get('/sendingImageToClient', getImage);
