// rendering all components
/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
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
      show: 'search',
    };
    this.getRandomRecipe = this.getRandomRecipe.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
    this.getSavedRecipes = this.getSavedRecipes.bind(this);
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
          recipes: results, // by making the data received back fron the server available
        });
      }).catch((err) => {
        console.log(err, 'error while retrieving data from server');
      });
  }

  getRandomRecipe() {
    return axios.get('/recipeoftheday') // sends get request to server for random recipe
      .then((recipe) => {
        // debugger;
        // console.log(recipe, 'recipe');
        // console.log(this);
        this.setState({

          recipeOfTheDay: recipe.data,
        });
      })
      .catch((err) => {
        console.log(`there was an error retriving random recipe : ${err}`);
      });
  }

  getSavedRecipes() {
    return axios.get('/saverecipes') // sends get request to server for saved recipes
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
    console.log('grabbing');
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



  render() {
    console.log(this);
    const { recipeOfTheDay, savedRecipes, recipes, ingredients } = this.state;
    return (
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
          />
        </div>
      </div>
    );


    // <div>
    //   <div className="nav">
    //     <span className="logo">Meal Maker</span>
    //     <Credentials />
    //   </div>

    //   <div className="main">
    //   <div className="videoPlayer">
    //     <VideoPlayer recipe={this.state.recipeOfTheDay} />
    //   </div>
    //   <div className="recipeInstructions">
    //   <RecipeInstructions recipe={this.state.recipeOfTheDay}/>
    //   </div>
    //   </div>
    // </div>
    // );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
