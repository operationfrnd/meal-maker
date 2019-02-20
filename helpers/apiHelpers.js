// Helper functions interacting with APIs
// 1) Helper interacting with the Receipe-Food-Nutrition api => retrieving receipes based on a list of ingredients
// 2) Helper interacting with the Youtube api => retrieving a video (top result) based on a search with a name of receipe
// 3) Helper interacting with the MealDB api => retrieving a list of all ingredients available in the MealDB api (optional)

const hash = require('hash-sum');
const axios = require('axios');
const _ = require('lodash');

// where api key was imported from, might need to make your own file
// const keys = require('./keys');
// make .env files locally to assign api keys (see .env.example)

const recFoodNutrApi = function (ingredients, callback) {
  if (!callback) {
    return Error('Function requires callback!!!');
  }
  // get 20 recipies based upon input ingredients
  return axios({
    method: 'get',
    headers: {
      'X-RapidAPI-Key': process.env.RECIPE_FOOD_NUTRITION_API_KEY,
    },
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?includeIngredients=${ingredients}&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&limitLicense=true&offset=0&number=10`
  }).then((result) => {
    // return recipies array
    const recipes = _.map(result.data.results, (recipe) => {
      const recipeInfo = {};
      recipeInfo.name = recipe.title;
      recipeInfo.recipeId = recipe.id;
      recipeInfo.cookTime = recipe.readyInMinutes;
      recipeInfo.instructions = _.map(recipe.analyzedInstructions[0].steps, (instruction) => {
        return instruction.step;
      });
      recipeInfo.ingredients = {};
      recipeInfo.ingredients.missedIngredients = _.map(recipe.missedIngredients, (ingredient) => {
        return ingredient.originalString;
      });
      recipeInfo.ingredients.usedIngredients = _.map(recipe.usedIngredients, (ingredient) => {
        return ingredient.originalString;
      });
      recipeInfo.ingredients.unusedIngredients = _.map(recipe.unusedIngredients, (ingredient) => {
        return ingredient.originalString;
      });
      recipeInfo.ingredients.allIngredients = [];
      _.forEach(recipeInfo.ingredients, (ingredients, key) => {
        if (key !== 'unusedIngredients') {
          _.forEach(ingredients, (ingredient) => {
            recipeInfo.ingredients.allIngredients.push(ingredient);
          });
        }
      });
      return recipeInfo;
    });
    return callback(null, recipes);
  }).catch((err) => {
    return callback(err, null);
  });
};

const rfnRandomRecipe = function (callback) {
  // get request for random recipe
  axios({
    method: 'get',
    headers: {
      'X-RapidAPI-Key': process.env.RECIPE_FOOD_NUTRITION_API_KEY
      ,
    },
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&limitLicense=false',
  }).then((recipe) => {
    // create object for storing vital recipe information
    const receipeInfo = {};
    // get recipe name/title
    receipeInfo.name = recipe.data.recipes[0].title;
    //get recipe id as it is in the rfn api
    receipeInfo.recipeId = recipe.data.recipes[0].id;
    // get recipe cooktime
    receipeInfo.cookTime = recipe.data.recipes[0].readyInMinutes;
    // get recipe instructions
    receipeInfo.instructions = _.map(recipe.data.recipes[0].analyzedInstructions[0].steps, (step, stepNumber) => {
      return step.step;
    }).join("\n");
    // get recipe ingredients
    receipeInfo.ingredients = _.map(recipe.data.recipes[0].extendedIngredients, (ingredient, index) => {
      return ingredient.originalString;
    }).join("\n");
    // do a quick search to get a youtube video on preparation of the dish
    youTubeApi(`cook ${receipeInfo.name}`, (anError, video) => {
      if (anError) {
        return callback(anError, null);
      }
      // store video info and current date then preform the callback
      receipeInfo.videoInfo = video;
      receipeInfo.date = new Date().getDate();
      return callback(null, receipeInfo);
    });
  }).catch((err) => {
    callback(err, null);
  })
}

const mealDBIngredientSearch = function (callback) {
  // get all ingredients
  return axios({
    method: 'get',
    url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  }).then((ingredients) => {
    // sort ingredients alphabetically
    const arrayOfIngredients = _.sortBy(_.map(ingredients.data.meals, (ingredient, index) => {
      return ingredient.strIngredient;
    }));
    // return the callback on ingredients
    return callback(null, arrayOfIngredients);
  }).catch((err) => {
    console.log(err);
    return callback(err, null);
  });
};

const youTubeApi = function(query, callback) {
  // search for videos based on the query
  return axios({
    method: 'get',
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${process.env.YOUTUBE_API_KEY}&q=${query}&maxResults=5`,
  }).then((searchResults) => {
    // preform a callback with the first object full of video data from the search results
    callback(null, searchResults.data.items[0]);
  }).catch((err) => {
    callback(err, null);
  });
};

const hasher = function(password) {
  return hash(password);
}

module.exports.recFoodNutrApi = recFoodNutrApi;
module.exports.mealDBIngredientSearch = mealDBIngredientSearch;
module.exports.youTubeApi = youTubeApi;
module.exports.rfnRandomRecipe = rfnRandomRecipe;
module.exports.hasher = hasher;
