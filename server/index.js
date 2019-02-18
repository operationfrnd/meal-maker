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
  axios.get('../data/example_rfn_data.json')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send(err);
    });
});

// Able to set port and still work //
const port = process.env.PORT || 3000;

// Listen and console log current port //
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});