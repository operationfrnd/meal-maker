// main server file where server setup is done using Express and with request handler functions

// 1) Request handler for a GET request from client with ingredients as params => will call Nutrition helper then send back results to client
// 2) Request handler for a GET request from client with a Receipe name (clicked on client side) => will call Youtube helper 
// 3) Request handler for a GET request from client on main page endpoint => compare current date & Ingredients table update date from DB

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const helper = require('../helpers/apiHelpers');

const app = express();

// Probably not needed //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../client/'));
// Needed for React at Some Point // 
// app.use(express.static(path.join(__dirname, [REACT DIRECTORY])));

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../client/src/example_rfn_data.json'), 'utf-8', (err, res2) => {
    console.log(JSON.parse(res2));
    res.send(res2);
  });
});

// get recipies depending upon passed in ingredients //
app.get('/food', (req, res) => {
  helper.recFoodNutrApi(req.query.ingredients, (err, recipes) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    }
    res.status(200).send(recipes);
  });
});

// Able to set port and still work //
const port = process.env.PORT || 3001;

// Listen and console log current port //
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
