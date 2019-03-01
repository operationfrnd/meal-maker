// main server file where server setup is done using Express and with request handler functions

// 1) Request handler for a GET request from client with ingredients as params => will call Nutrition helper then send back results to client
// 2) Request handler for a GET request from client with a Receipe name (clicked on client side) => will call Youtube helper
// 3) Request handler for a GET request from client on main page endpoint => compare current date & Ingredients table update date from DB

require('dotenv').config();
const axios = require('axios');
const errorHandler = require('errorhandler');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const _ = require('lodash');
const helper = require('../helpers/apiHelpers');
const db = require('../helpers/dbHelpers');

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(require('morgan')('dev'));

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(require('../routes'));

if (!isProduction) {
  app.use(errorHandler());
}

// get recipies depending upon passed in ingredients //
app.get('/food', (req, res) => {
  helper.recFoodNutrApi(req.query.ingredients, (err, recipes) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong!');
    }
    // respond with an array of objects which contain recipe information
    console.log(recipes);
    db.selectAllRecipes((error, savedRecipes) => {
      if (err) {
        return console.log(error);
      }
      _.forEach(recipes, (recipe) => {
        const previousInstances = _.filter(savedRecipes, savedRecipe => savedRecipe.recipe === recipe.name).length;
        if (previousInstances === 0) {
          db.saveRecipe(recipe.name, recipe.recipeId, recipe.image, (err) => {
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
    if (req.query.userId) {
      return db.selectDislikedRecipes(req.query.userId, (err, dislikedRecipes) => {
        const recipeNames = _.map(dislikedRecipes, (dislikedRecipe) => {
          return dislikedRecipe.idRecipes;
        });
        const filtered = _.filter(recipes, (recipe) => {
          return !_.includes(recipeNames, recipe.recipeId.toString());
        });
        console.log(filtered);
        return res.status(200).send(filtered);
      });
    }
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

// get a single recipe by its name
app.get('/single', (req, res) => {
  db.selectSingleRecipeByName(req.body.recipeName, (err, singleRecipeArray) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong!');
    }
    // get a recipe's info throuhg its id
    return helper.rfnSingleRecipe(singleRecipeArray[0].idRecipieFoodNutrition, (err, recipe) => {
      if (err) {
        return res.status(500).send('Something went wrong!');
      }
      // send back recipe info
      res.status(200).send(recipe);
    });
  });
});

// get a random recipe
app.post('/random', (req, res) => {
  // First get a random recipe //
  helper.rfnRandomRecipe((err, randomRecipe) => {
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
            return db.saveRecipe(randomRecipe.name, randomRecipe.recipeId, randomRecipe.recipeImage, (err) => {
              if (err) {
                return res.status(500).send('Something Went Wrong!');
              }
              // Get the recently saved recipe
              return db.selectSingleRecipeById(randomRecipe.recipeId, (err, singleRecipeArray) => {
                if (err) {
                  return res.status(500).send('Something Went Wrong!');
                }
                const ingredients = randomRecipe.ingredients.split('\n');
                // Save the recipe of the day
                res.status(204).send(randomRecipe);
                db.saveRecipeOfTheDay(randomRecipe.name, randomRecipe.videoInfo.id.videoId, randomRecipe.instructions, singleRecipeArray[0].id, randomRecipe.cookTime, randomRecipe.recipeImage, randomRecipe.date);
                _.forEach(ingredients, (ingredient) => {
                  db.saveRecipeIngredient(singleRecipeArray[0].id, ingredient);
                });
                return 'Finished';
              });
            });
          }
          // Save the recipe of the day //
          return db.saveRecipeOfTheDay(randomRecipe.name, randomRecipe.videoInfo.id.videoId, oldRecipe.id, randomRecipe.recipeImage, randomRecipe.date);
        });
      }
    });
  });
});

// get the current recipe of the day and update if necessary
app.get('/recipeoftheday', (req, res) => {
  //db.selectAllRecipeOfTheDay((err, oldRecipeOfTheDays) => {
    // if (oldRecipeOfTheDays[oldRecipeOfTheDays.length - 1].date !== new Date().getDate()) {
    //   axios.post('/random').then((res) => {
    //     res.status(204).send(res.data);
    //   });
    // } else {
      // const recipeOfTheDay = oldRecipeOfTheDays[oldRecipeOfTheDays.length - 1];
      // db.getRecipeIngredients(recipeOfTheDay.idRecipe, (error, ingredients) => {
      //   if (error) {
      //     res.status(500).send('Something went wrong!');
      //   }
      //   ingredients = _.map(ingredients, ingredient => ingredient.ingredients);
      //   recipeOfTheDay.ingredients = ingredients.join('\n');
      //   res.status(200).send(recipeOfTheDay);
      // });
    // }
  // });
});

// client requests a single youtube video from a search query
app.get('/search', (req, res) => {
  helper.youTubeApi(req.query.q, (err, searchResult) => {
    if (err) {
      return res.status(500).send('Something went wrong!');
    }
    // send back the video inforamtion
    res.status(200).send(searchResult);
  });
});

// when client requests to sign up/create a new user
app.post('/signup', (req, res) => {
  console.log(req.body, typeof (req.body.params.username), 'BODY');
  if (!req.body.params.username || !req.body.params.password || req.body.params.password === '' || req.body.params.username === '') {
    return res.status(500).redirect('/restrictedhome');
  }
  return db.selectAllUsers((err, users) => {
    if (err) {
      console.error(err);
    }
    const sameNameCounter = _.filter(users, user => user.username === req.body.params.username).length;
    if (sameNameCounter === 0) {
      process.env.LOCAL_USER = req.body.params.username;
      db.saveUser(req.body.params.username, helper.hasher(req.body.params.password), true, (err, result) => {
        if (err) {
          console.log(err, 'HEY not Saved');
        } else {
          console.log(result, 'Saved user')
        }
      });
      return res.status(204).redirect('/home');
    }
    return res.status(500).redirect('/restrictedhome');
  });
});

// when client requests to login => authentication request
app.get('/login', (req, res) => {
  console.log(req, 'LOGIN Parm');
  db.selectAllUsers((err, users) => {
    const user = _.filter(users, storedUser => storedUser.username === req.query.username)[0];
    if (user) {
      if (user.password === helper.hasher(req.bquery.password)) {
        process.env.LOCAL_USER = req.query.username;
        res.status(200).redirect('/home');
      } else {
        res.status(500).redirect('/restrictedhome');
      }
    } else {
      res.status(500).redirect('/restrictedhome');
    }
  });
});

// when client wants to retrieve all disliked recipes for a particular user
app.get('/disliked', (req, res) => {
  db.selectDislikedRecipes(req.userId, (err, ids) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    }
    res.status(200).send(ids);
  });
});

// when client wants add a particular recipe to the disliked table
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

// when client wants to retrieve all the saved recipes for a particular user
app.get('/savedrecipes', (req, res) => {
  const { userId } = req.query;
  db.selectLikedRecipes(userId, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    }
    else {
      console.log('next step');
      // get the recipeIds from the DB
      const recipeIds = results.map(result => result.idRecipes);

      const recipesObj = [];
      // get an array of objects named recipeInfo from rfn and youtube for each id
      const recipesInfo = recipeIds.forEach((id, index) => helper.rfnSingleRecipe(id, (err, result) => {
        if (err) {
          console.log(err, 'error in getting recipe saved');
          return;
        }
        console.log(`${result}, from saved db`);
        recipesObj.push(result);

        if (index === recipeIds.length - 1) {
          res.status(200).send(recipesObj); // send that array back to client
        }
        console.log(recipesObj);
      }));
    }
  });
});

// when client wants to save a recipe into DB
app.post('/toBeSaved', (req, res) => {
  const { userId, recipeId } = req.body;
  db.selectLikedRecipes(userId, (err, ids) => {
    const previousInstances = _.filter(ids, id => recipeId === id.idRecipes).length;
    if (previousInstances === 0) {
      return db.saveLikedRecipe(userId, recipeId, (err) => {
        if (err) {
          return res.status(500).send('Something Went Wrong!');
        }
        console.log('recipe saved into DB');
        return res.status(204).send('Saved Recipe To The Saved Table');
      });
    }
    return res.status(500).send('Recipe Already Saved');
  });
});

// when client wants to save a recipe into DB
app.post('/toBeSavedDislike', (req, res) => {
  // const userId = req.body.userId;
  // const recipeId = req.body.recipeId;
  const { userId, recipeId } = req.body;
  db.selectDislikedRecipes(userId, (err, ids) => {
    const previousInstances = _.filter(ids, id => recipeId === id.idRecipes).length;
    if (previousInstances === 0) {
      return db.dislikeRecipe(userId, recipeId, (err) => {
        if (err) {
          return res.status(500).send('Something Went Wrong!');
        }
        console.log('recipe saved into DB dislike table');
        return res.status(204).send('Saved Recipe To The Dislike Table');
      });
    }
    return res.status(500).send('Recipe Already Saved');
  });
});

app.post('/originalRecipes', (req, res) => {
  db.addOriginalRecipe(req.body.name, req.body.ingredients, req.body.instructions, req.body.cooktime, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(200);
    }
  });
});

// Able to set port and still work //
const port = process.env.PORT || 3001;

// Listen and console log current port //
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

module.exports.app = app;
module.exports.port = port;
