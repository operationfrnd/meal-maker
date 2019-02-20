// 1) Database creation & Table schemas
// 2) Function to save ingredients into the ingredients table (received from mealDB)
// 3) Function to retrieve all ingredients from the DB to make them available to client as options
// 4) Function to save a receipe into the 'liked' table
// 5) Function to save a receipe into the 'dislike' table (optional)

// const axios = require('axios');
const connection = require('../database/index.js').connection;

const selectSingleRecipe = (idOriginalDB, callback) => {
  connection.query(`SELECT * FROM Recipes WHERE idRecipieFoodNutrition = ${idOriginalDB}`, (err, recipe) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, recipe);
    }
  });
};

const selectAllRecipes = (callback) => {
  connection.query('SELECT * FROM Recipes', (err, results) => {
    if (err) {
      console.log('error in retrieving all recipes');
      callback(err, null);
    } else {
      console.log('success in retrieving all recipes');
      callback(null, results);
    }
  });
}

const saveRecipe = (recipeName, idOriginalDB, callback) => {
  let q = [recipeName, idOriginalDB]; 
  connection.query('INSERT INTO Recipes (recipe, idRecipieFoodNutrition) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const selectLikedRecipes = (userId, callback) => {
  connection.query(`SELECT * FROM Saved WHERE idUsers = ${userId}`, (err, recipes) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, recipes);
  })
}

const saveLikedRecipe = (userId, recipeId, callback) => {
  let q = [userId, recipeId];
  connection.query('INSERT INTO Saved (idUsers, idRecipes) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const selectAllRecipeOfTheDay = (callback) => {
  connection.query('SELECT * FROM RecipeOfTheDay', (err, recipes) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  })
};

const saveRecipeOfTheDay = (revcipeName, videoLink, recipeInstructions, ourDbRecipeId, cooktime, currentDate) => {
  let q = [revcipeName, videoLink, recipeInstructions, ourDbRecipeId, cooktime, currentDate];
  connection.query('INSERT INTO RecipeOfTheDay (name, link, instructions, idRecipe, cooktime, date) VALUES (?, ?, ?, ?, ?, ?)', q, (err, results) => {
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

const selectDislikedRecipes = (userId, callback) => {
  connection.query(`SELECT * FROM Saved WHERE idUsers = ${userId}`, (err, recipes) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, err);
    }
  });
};

const dislikeRecipe = (userId, recipeId, callback) => {
  let q = [userId, recipeId];
  connection.query('INSERT INTO Dislikes (idUsers, idRecipes) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
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

const saveRecipeIngredient = (recipeId, ingredientId) => {
  let q = [recipeId, ingredientId];
  connection.query('INSERT INTO recipesIngredients (idRecipe, ingredients) VALUES (?, ?)', q, (err, results) => {
    if (err) {
      console.log('error in saving id pairs to db');
    } else {
      console.log('saved id pairs to db');
    }
  });
}

const getRecipeIngredients = (recipeId, callback) => {
  connection.query(`SELECT * FROM recipesIngredients WHERE idRecipe = ${recipeId}`, (err, ingredients) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, ingredients);
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

const selectAllUsers = (callback) => {
  connection.query('SELECT * FROM Users', (err, users) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, users);
    }
  })
};

const saveUser = (username, password) => {
  const q = [username, password];
  connection.query('INSERT INTO Users (username, password) VALUES (?, ?)', q, (err) => {
    if (err) {
      console.log('could not insert new user into Users table');
    } else {
      console.log('successfully added new user to Users table');
    }
  });
};

module.exports = { selectSingleRecipe, selectAllRecipes, saveRecipe, selectLikedRecipes, saveLikedRecipe, selectAllRecipeOfTheDay, saveRecipeOfTheDay, updateRecipeOfTheDay, selectDislikedRecipes, dislikeRecipe, saveIngredient, saveRecipeIngredient, getRecipeIngredients, selectAllIngredients, selectAllUsers, saveUser,
};
