// 1) Database creation & Table schemas
// 2) Function to save ingredients into the ingredients table (received from mealDB)
// 3) Function to retrieve all ingredients from the DB to make them available to client as options
// 4) Function to save a receipe into the 'liked' table
// 5) Function to save a receipe into the 'dislike' table (optional)

// const axios = require('axios');
const connection = require('../database/index.js');
const saveRecipe = (userId, recipeId) => {
  let q = [userId, recipeId];
  connection.query('INSERT INTO saved (idUsers, idRecipes) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      console.log('could not save user recipe to database');
    } else {
      console.log('successfully saved recipe to user');
    }
  });
}

const dislikeRecipe = (userId, recipeId) => {
  let q = [userId, recipeId];
  connection.query('INSERT INTO saved (idUsers, idRecipes) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      console.log('could not save DISliked recipe to database');
    } else {
      console.log('successfully saved DISliked recipe to user');
    }
  });
}
// saveRecipe(123, 4565);
module.exports = { saveRecipe, dislikeRecipe };