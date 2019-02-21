// main server file where server setup is done using Express and with request handler functions

// 1) Request handler for a GET request from client with ingredients as params => will call Nutrition helper then send back results to client
// 2) Request handler for a GET request from client with a Receipe name (clicked on client side) => will call Youtube helper
// 3) Request handler for a GET request from client on main page endpoint => compare current date & Ingredients table update date from DB
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const helper = require('../helpers/apiHelpers');
const db = require('../helpers/dbHelpers');

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));

// Probably not needed //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
      console.log(err);
      return res.status(500).send('Something went wrong!');
    }
    // respond with an array of objects which contain recipie information
    console.log(recipes);
    db.selectAllRecipes((err, savedRecipes) => {
      if (err) {
        return console.log(err);
      }
      _.forEach(recipes, (recipe) => {
        const previousInstances = _.filter(savedRecipes, savedRecipe => savedRecipe.recipe === recipe.name).length;
        if (previousInstances === 0) {
          db.saveRecipe(recipe.name, recipe.recipeId, (err) => {
            if (err) {
              console.log(err);
            }
            db.selectSingleRecipeById(recipe.recipeId, (err, singleRecipeArray) => {
              if (err) {
                console.log(err);
              }
              _.forEach(recipe.ingredients.allIngredients, (ingredient) => {
                db.saveRecipeIngredient(singleRecipeArray[0].id, ingredient);
              });
            });
          });
        }
      });
    });
    return res.status(200).send(recipes);
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
      _.forEach(ingredients, (newIngredient) => {
        // see if potential new ingredient already exists in database
        const priorInstances = _.filter(tableData, oldIngredient => oldIngredient.ingredient === newIngredient).length;
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

app.get('/single', (req, res) => {
  db.selectSingleRecipeByName(req.body.recipeName, (err, singleRecipeArray) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong!');
    }
    return helper.rfnSingleRecipe(singleRecipeArray[0].idRecipieFoodNutrition, (err, recipe) => {
      if (err) {
        res.status(500).send('Something went wrong!');
      }
      res.status(200).send(recipe);
    });
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
              return db.selectSingleRecipeById(randomRecipe.recipeId, (err, singleRecipeArray) => {
                if (err) {
                  return res.status(500).send('Something Went Wrong!');
                }
                const ingredients = randomRecipe.ingredients.split("\n");
                // Save the recipe of the day
                res.status(204).send(randomRecipe);
                db.saveRecipeOfTheDay(randomRecipe.name, randomRecipe.videoInfo.id.videoId, randomRecipe.instructions, singleRecipeArray[0].id, randomRecipe.cookTime, randomRecipe.date);
                _.forEach(ingredients, (ingredient) => {
                  db.saveRecipeIngredient(singleRecipeArray[0].id, ingredient);
                });
                return 'Finished';
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

// get the current recipe of the day and update if necessary
app.get('/recipeoftheday', (req, res) => {
  db.selectAllRecipeOfTheDay((err, oldRecipeOfTheDays) => {
    if (oldRecipeOfTheDays[oldRecipeOfTheDays.length - 1].date !== new Date().getDate()) {
      axios.post('/random').then((res) =>{
        res.status(204).send(res.data);
      });
    } else {
      const recipeOfTheDay = oldRecipeOfTheDays[oldRecipeOfTheDays.length - 1];
      db.getRecipeIngredients(recipeOfTheDay.id, (err, ingredients) => {
        if (err) {
          res.status(500).send('Something went wrong!');
        }
        ingredients = _.map(ingredients, (ingredient) => {
          return ingredient.ingredients;
        });
        recipeOfTheDay.ingredients = ingredients.join('\n');
        res.status(200).send(recipeOfTheDay);
      });
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

app.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password  || req.body.password === "" || req.body.username === "") {
    return res.status(500).redirect('/restrictedhome');
  }
  return db.selectAllUsers((err, users) => {
    if (err) {
      console.error(err);
    }
    const sameNameCounter = _.filter(users, (user) => {
      return user.username === req.body.username;
    }).length;
    if (sameNameCounter === 0) {
      process.env.LOCAL_USER = req.body.username;
      db.saveUser(req.body.username, helper.hasher(req.body.password));
      return res.status(204).redirect('/home');
    } else {
      return res.status(500).redirect('/restrictedhome');
    }
  })
});

app.get('/login', (req, res) => {
  db.selectAllUsers((err, users) => {
    const user = _.filter(users, (storedUser) => {
      return storedUser.username === req.body.username;
    })[0];
    if (user) {
      if (user.password === helper.hasher(req.body.password)) {
        process.env.LOCAL_USER = req.body.username;
        res.status(200).redirect('/home');
      } else {
        res.status(500).redirect('/restrictedhome');
      }
    } else {
      res.status(500).redirect('/restrictedhome');
    }
  })
});

app.get('/disliked', (req, res) => {
  db.selectDislikedRecipes(req.userId, (err, ids) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    }
    res.status(200).send(ids);
  });
});

app.post('/disliked', (req, res) => {
  db.selectDislikedRecipes(req.userId, (err, ids) => {
    const previousInstances = _.filter(ids, id => req.recipeId === id.idRecipes).length;
    if (previousInstances.length === 0) {
      return db.dislikeRecipe(req.userId, req.recipeId, (err) => {
        if (err) {
          return res.status(500).send('Something Went Wrong!');
        }
        return res.status(204).send('Saved Recipe To The Saved Table');
      });
    }
    return res.status(500).send('Recipe Already Saved');
  });
});

app.get('/saved', (req, res) => {
  db.selectLikedRecipes(req.userId, (err, ids) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    }
    res.status(200).send(ids);
  });
});

app.post('/saved', (req, res) => {
  db.selectLikedRecipes(req.userId, (err, ids) => {
    const previousInstances = _.filter(ids, id => req.recipeId === id.idRecipes).length;
    if (previousInstances.length === 0) {
      return db.saveLikedRecipe(req.userId, req.recipeId, (err) => {
        if (err) {
          return res.status(500).send('Something Went Wrong!');
        }
        return res.status(204).send('Saved Recipe To The Saved Table');
      });
    }
    return res.status(500).send('Recipe Already Saved');
  });
});

// Able to set port and still work //
const port = process.env.PORT || 3001;

// Listen and console log current port //
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
