// 1) Database creation & Table schemas
// 2) Function to save ingredients into the ingredients table (received from mealDB)
// 3) Function to retrieve all ingredients from the DB to make them available to client as options
// 4) Function to save a receipe into the 'liked' table
// 5) Function to save a receipe into the 'dislike' table (optional)

// const axios = require('axios');
const connection = require('../database/index.js').connection;

const selectAllRecipes = (callback) => {
  connection.query('SELECT * FROM Recipes', (err, results) => {
    if (err) {
      console.log('error in retrieving all ingredients');
      callback(err, null);
    } else {
      console.log('success in retrieving all ingredients');
      callback(null, results);
    }
  });
}

const saveRecipe = (recipeName, idOriginalDB) => {
  let q = [recipeName, idOriginalDB]; 
  connection.query('INSERT INTO Recipes (recipe, idRecipieFoodNutrition) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      console.log('could not save recipe');
    } else {
      console.log('saved recipe successfully');
    }
  });
};

const saveLikedRecipe = (userId, recipeId) => {
  let q = [userId, recipeId];
  connection.query('INSERT INTO Saved (idUsers, idRecipes) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      console.log('could not save user recipe to database');
    } else {
      console.log('successfully saved recipe to user');
    }
  });
};

const saveRecipeOfTheDay = (videoLink, ourDbRecipeId, currentDate) => {
  let q = [videoLink, ourDbRecipeId, currentDate];
  connection.query('INSERT INTO RecipeOfTheDay (link, idRecipe, date) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      console.log('could not save recipe of the day to database');
    } else {
      console.log('successfully saved recipe of the day to the database');
    }
  });
};

const updateRecipeOfTheDay = (videoLink, ourDbRecipeId, currentDate) => {
  connection.query(`UPDATE RecipeOfTheDay SET link = '${videoLink}', idRecipe = ${ourDbRecipeId} WHERE date = ${currentDate}`, (err, results) => {
    if (err) {
      console.log('could not update recipe of the day', err);
    } else {
      console.log('successfully updated recipe of the day');
    }
  });
};

const dislikeRecipe = (userId, recipeId) => {
  let q = [userId, recipeId];
  connection.query('INSERT INTO Dislikes (idUsers, idRecipes) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      console.log('could not save DISliked recipe to database');
    } else {
      console.log('successfully saved DISliked recipe to user');
    }
  });
};

const saveIngredient = (ingredientItem) => {
  let q = [ingredientItem];
  connection.query('INSERT INTO Ingredient (ingredient) VALUES (?)', q, (err, results) => {
    if (err) {
      console.log('error in saving ingredient to db');
    } else {
      console.log('saved ingredient to db');
    }
  });
};

const selectAllIngredients = (callback) => {
  connection.query('SELECT * FROM Ingredient', (err, results) => {
    if (err) {
      console.log('error in retrieving all ingredients');
    } else {
      console.log('success in retrieving all ingredients');
      callback(results);
    }
  });
};

module.exports = { selectAllRecipes, saveRecipe, saveLikedRecipe, saveRecipeOfTheDay, updateRecipeOfTheDay, dislikeRecipe, saveIngredient, selectAllIngredients };