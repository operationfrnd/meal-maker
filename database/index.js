// Setting up the mysql database & connection and ORM (sequelize)

// 1) Database creation & Table schemas
// 2) Function to save ingredients into the ingredients table (received from mealDB)
// 3) Function to retrieve all ingredients from the DB to make them available to client as options
// 4) Function to save a receipe into the 'liked' table
// 5) Function to save a receipe into the 'dislike' table (optional)


var mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  database: 'mealmaker',
  password: '',
});

connection.connect(function (err) {
  if (!err) {
    console.log('Houston, we have a db connection');
  } else {
    console.log('There was a problem connecting to the db');
  }
});

module.exports.connection = connection;

