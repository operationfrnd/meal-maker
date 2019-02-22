// rendering all components
/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './components/login/Login.jsx';
import Recipe from './components/Recipe.jsx';
import sampleData from './example_rfn_data';
import Credentials from './components/login/Credentials.jsx';
import RecipeInstructions from './components/login/RecipeInstructions.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import randomRecipe from '../example_random.js';
import Main from './components/main/Main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipeOfTheDay: randomRecipe, // recipe of the day video
      savedRecipes: [],
      ingredients: [],
      userId: 1,
      // show: 'search',
    };
    this.getRandomRecipe = this.getRandomRecipe.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
    this.getSavedRecipes = this.getSavedRecipes.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  componentDidMount() {
    this.getRandomRecipe();
    // this.getSavedRecipes();
    this.grabIngredients();
  }

  // function to retrieve recipes to display
  getRecipes(ingredients) {
    return axios.get('/food', {
      params: {
        ingredients: ingredients,
      },
    }) // sends a GET request to serve at endpoint '/food'
      .then((results) => {
        console.log('results recipes', results);
        this.setState({ // change the state
          recipes: results.data, // by making the data received back fron the server available
        });
      }).catch((err) => {
        console.log(err, 'error while retrieving data from server');
      });
  }

  getRandomRecipe() {
    return axios.get('/recipeoftheday') // sends get request to server for random recipe
      .then((recipe) => {
        this.setState({
          recipeOfTheDay: recipe.data,
        });
      })
      .catch((err) => {
        console.log(`there was an error retriving random recipe : ${err}`);
      });
  }

  getSavedRecipes() {
    return axios.get('/savedrecipes') // sends get request to server for saved recipes
      .then((recipes) => {
        this.setState({
          savedRecipes: recipes,
        });
      })
      .catch((err) => {
        console.log(`there was an error retriving saved recipes : ${err}`);
      });
  }

  // gets all ingredients saved to db to for autocomplete component
  grabIngredients() {
    // console.log('grabbing');
    axios.get('/ingredients')
      .then((allIngOptions) => {
        console.log(Array.isArray(allIngOptions.data), 'Opt');
        this.setState({
          ingredients: allIngOptions.data,
        });
      })
      .catch((err) => {
        console.log('error in getting all ingredients');
      });
  }

  // sends a POST request to serve at endpoint '/toBeSaved'
  // eslint-disable-next-line class-methods-use-this
  saveRecipe(recipe) {
    const { userId } = this.state;
    // debugger;
    return axios.post('/toBeSaved', {
      userId,
      recipeId: recipe.recipeId,
    })
      .then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err, 'error while trying to save recipe into DB');
      });
  }


  render() {
    // console.log(this);
    const { recipeOfTheDay, savedRecipes, recipes, ingredients } = this.state;
    return (
      // <BrowserRouter>
      //   <Route path="/login" component={Login} />
      // </BrowserRouter>
      <div>
        <div>
          <Login recipe={recipeOfTheDay} />
        </div>
        <div>
          <Main
            recipes={recipes}
            recipe={recipeOfTheDay}
            savedRecipes={savedRecipes}
            ingredients={ingredients}
            getRecipes={this.getRecipes}
            saveRecipe={this.saveRecipe}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
