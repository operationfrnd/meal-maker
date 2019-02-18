// Helper functions interacting with APIs
// 1) Helper interacting with the Receipe-Food-Nutrition api => retrieving receipes based on a list of ingredients
// 2) Helper interacting with the Youtube api => retrieving a video (top result) based on a search with a name of receipe
// 3) Helper interacting with the MealDB api => retrieving a list of all ingredients available in the MealDB api (optional)

const axios = require('axios');
const key1 = require('./keys');

const recFoodNutrApi = function (ingredients, callback) {
  if (!callback) {
    return Error('Function requires callback!!!');
  }
  return axios({
    method: 'get',
    headers: {
      'X-RapidAPI-Key': key1.apiKey1,
    },
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?includeIngredients=${ingredients}&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&limitLicense=true&offset=0&number=20`
  }).then((result) => {
    return callback(null, result.data.results);
  }).catch((err) => {
    return callback(err, null);
  });
}

const mealDBApi = function (callback) {
  axios({
    method: 'get',
    url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  }).then((ingredients) => {
    callback(null, ingredients);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports.recFoodNutrApi = recFoodNutrApi;