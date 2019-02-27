// Setting up the mysql database & connection and ORM (sequelize)

// 1) Database creation & Table schemas
// 2) Function to save ingredients into the ingredients table (received from mealDB)
// 3) Function to retrieve all ingredients from the DB to make them available to client as options
// 4) Function to save a receipe into the 'liked' table
// 5) Function to save a receipe into the 'dislike' table (optional)


const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports.connection = connection;
