// main server file where server setup is done using Express and with request handler functions

// 1) Request handler for a GET request from client with ingredients as params => will call Nutrition helper then send back results to client
// 2) Request handler for a GET request from client with a Receipe name (clicked on client side) => will call Youtube helper 
// 3) Request handler for a GET request from client on main page endpoint => compare current date & Ingredients table update date from DB

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const helper = require('../helpers/apiHelpers');
const db = require('../helpers/dbHelpers');
const _ = require('lodash');

const app = express();

// Probably not needed //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../client/'));
// Needed for React at Some Point // 
// app.use(express.static(path.join(__dirname, [REACT DIRECTORY])));

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../client/src/example_rfn_data.json'), 'utf-8', (err, res2) => {
    res.send(res2);
  });
});

// get recipies depending upon passed in ingredients //
app.get('/food', (req, res) => {
  helper.recFoodNutrApi(req.query.ingredients, (err, recipes) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    }
    // respond with an array of objects which contain recipie information
    res.status(200).send(recipes);
  });
});

// get all ingredients stored in the MealDB //
app.get('/ingredients', (req, res) => {
  helper.mealDBIngredientSearch((err, ingredients) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    }
    // get all current ingredients stored in our own database
    db.selectAllIngredients((tableData) => {
      _.forEach(ingredients, (newIngredient, index) => {
        // see if potential new ingredient already exists in database
        const priorInstances = _.filter(tableData, (oldIngredient, index) => {
          return oldIngredient.ingredient === newIngredient;
        }).length;
        // save if it doesn't
        if (priorInstances === 0) {
          db.saveIngredient(newIngredient);
        } 
      });
    });
    // send back ingredients regardless of whether or not they were new
    res.send(ingredients);
  });
});

// get a random recipe
app.post('/random', (req, res) => {
  // First get a random recipe //
  return helper.rfnRandomRecipe((err, randomRecipe) => {
    if (err) {
      return res.status(500).send('Something Went Wrong!');
    }
    // Get all past recipe of the days //
    return db.selectAllRecipeOfTheDay((err, pastRecipeOfTheDays) => {
      if (err) {
        return res.status(500).send('Something Went Wrong!');
      }
      // See if recipe has already been a recipe of the day //
      const duplicateCount = _.filter(pastRecipeOfTheDays, (recipe) => {
        return recipe.name === randomRecipe.name;
      }).length;
      if (duplicateCount === 0) {
        // Get all recipes currently inside of our database //
        return db.selectAllRecipes((err, currentRecipes) => {
          if (err) {
            return res.status(500).send('Something Went Wrong!');
          }
          // See if we have an old recipe that is the same as the random recipe
          const oldRecipe = _.filter(currentRecipes, (recipe) => {
            return recipe.recipe === randomRecipe.name;
          })[0];
          // Save the random recipe if we don't have it already //
          if (!oldRecipe) {
            // Save the recipe
            return db.saveRecipe(randomRecipe.name, randomRecipe.recipeId, (err) => {
              if (err) {
                return res.status(500).send('Something Went Wrong!');
              }
              // Get the recently saved recipe
              return db.selectSingleRecipe(randomRecipe.recipeId, (err, singleRecipeArray) => {
                if (err) {
                  return res.status(500).send('Something Went Wrong!');
                }
                // Save the recipe of the day
                res.status(200).send(randomRecipe);
                return db.saveRecipeOfTheDay(randomRecipe.name, randomRecipe.videoInfo.id.videoId, singleRecipeArray[0].id, randomRecipe.date);
              });
            })
          } else {
            // Save the recipe of the day //
            return db.saveRecipeOfTheDay(randomRecipe.name, randomRecipe.videoInfo.id.videoId, oldRecipe.id, randomRecipe.date);
          }
        });
      }
    })
  });
});

app.get('/recipeoftheday', (req, res) => {
  db.selectAllRecipeOfTheDay((err, oldRecipeOfTheDays) => {
    if (oldRecipeOfTheDays[oldRecipeOfTheDays.length - 1].date !== new Date().getDate()) {
      axios.post('/random');
    } else {
      res.status(200).send(oldRecipeOfTheDays[oldRecipeOfTheDays.length - 1]);
    }
  });
});

// get a single youtube video from a search query
app.get('/search', (req, res) => {
  helper.youTubeApi(req.query.q, (err, searchResult) => {
    if (err) {
      return res.status(500).send("Something went wrong!");
    }
    // send back the video inforamtion
    res.status(200).send(searchResult);
  });
});

// Able to set port and still work //
const port = process.env.PORT || 3001;

// Listen and console log current port //
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
