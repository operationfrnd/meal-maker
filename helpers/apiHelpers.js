// Helper functions interacting with APIs
// 1) Helper interacting with the Receipe-Food-Nutrition api => retrieving receipes based on a list of ingredients
// 2) Helper interacting with the Youtube api => retrieving a video (top result) based on a search with a name of receipe
// 3) Helper interacting with the MealDB api => retrieving a list of all ingredients available in the MealDB api (optional)

const axios = require('axios');
const _ = require('lodash');

// where api key was imported from, might need to make your own file
const keys = require('./keys');

const recFoodNutrApi = function (ingredients, callback) {
  if (!callback) {
    return Error('Function requires callback!!!');
  }
  // get 20 recipies based upon input ingredients
  return axios({
    method: 'get',
    headers: {
      'X-RapidAPI-Key': keys.apiKey1,
    },
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?includeIngredients=${ingredients}&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&limitLicense=true&offset=0&number=20`
  }).then((result) => {
    // return recipies array
    return callback(null, result.data.results);
  }).catch((err) => {
    return callback(err, null);
  });
};

const mealDBApi = function (callback) {
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
  return axios({
    method: 'get',
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${keys.apiKey2}&q=${query}&maxResults=5`,
  }).then((searchResults) => {
    console.log(searchResults.data.items);
    callback(null, searchResults.data.items[0]);
  }).catch((err) => {
    callback(err, null);
  });
};

module.exports.recFoodNutrApi = recFoodNutrApi;
module.exports.mealDBApi = mealDBApi;
module.exports.youTubeApi = youTubeApi;
