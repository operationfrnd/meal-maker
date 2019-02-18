const express = require('express');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});