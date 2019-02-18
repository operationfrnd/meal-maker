const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../index.html')));
// app.use(express.static('../index.html'));

app.get('/', (req, res) => {
  console.log(req);
  res.send("Done");
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});