// main server file where server setup is done using Express and with request handler functions

// 1) Request handler for a GET request from client with ingredients as params => will call Nutrition helper then send back results to client
// 2) Request handler for a GET request from client with a Receipe name (clicked on client side) => will call Youtube helper 
// 3) Request handler for a GET request from client on main page endpoint => compare current date & Ingredients table update date from DB

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');

const app = express();

// Probably not needed //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Needed for React at Some Point // 
// app.use(express.static(path.join(__dirname, [REACT DIRECTORY])));

app.get('/', (req, res) => {
  console.log(req);
  axios.get('../client/src/example_rfn_data.json')
    .then((result) => {
      console.log(result);
      res.send(result);
    }).catch((err) => {
      console.error(err);
      res.send(err);
    });
});

// Able to set port and still work //
const port = process.env.PORT || 3000;

// Listen and console log current port //
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
