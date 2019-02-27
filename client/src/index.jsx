/* eslint-disable class-methods-use-this */
// rendering all components
/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ChatBot from 'react-simple-chatbot';
import Login from './components/login/Login.jsx';
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
      userId: 0,
      selectedRecipe: randomRecipe,
      authorized: false,
      show: 'login',
      userName: '',
      buttonClicked: false,
    };
    // binding all functions to the index component
    this.getRandomRecipe = this.getRandomRecipe.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
    this.getSavedRecipes = this.getSavedRecipes.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.saveDislikeRecipe = this.saveDislikeRecipe.bind(this);
    this.selectRecipe = this.selectRecipe.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    const { authorized } = this.state;
    this.getRandomRecipe();
    this.grabIngredients();
    if (authorized) {
      this.setState({
        show: 'home',
      });
    }
  }

  // function to retrieve recipes to display
  getRecipes(ingredients) {
    const { userId } = this.state;
    return axios.get('/food', {
      params: {
        userId,
        ingredients,
      },
    }) // sends a GET request to serve at endpoint '/food'
      .then((results) => {
        this.setState({ // change the state
          recipes: results.data, // by making the data received back fron the server available
        });
      }).catch((err) => {
        console.log(err, 'error while retrieving data from server');
      });
  }

  // function to retrieve the recipe of the day
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

  // function to retrieve all saved recipes for the current user
  getSavedRecipes() {
    const { userId } = this.state;
    return axios.get('/savedrecipes', {
      params: {
        userId,
      },
    }) // sends get request to server for saved recipes
      .then((results) => {
        this.setState({
          savedRecipes: results.data,
        });
      })
      .catch((err) => {
        console.log(`there was an error retrieving saved recipes : ${err}`);
      });
  }

  // gets all ingredients saved to db to for autocomplete component
  grabIngredients() {
    axios.get('/ingredients')
      .then((allIngOptions) => {
        this.setState({
          ingredients: allIngOptions.data,
        });
      })
      .catch((error) => {
        console.log(error, 'error in getting all ingredients');
      });
  }

  // sends a POST request to serve at endpoint '/toBeSaved'
  // eslint-disable-next-line class-methods-use-this
  saveRecipe(recipe) {
    const { userId } = this.state;
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

  // sends a POST request to serve at endpoint '/toBeSaved'
  // eslint-disable-next-line class-methods-use-this
  saveDislikeRecipe(recipe) {
    const { userId } = this.state;
    return axios.post('/toBeSavedDislike', {
      userId,
      recipeId: recipe.recipeId,
    })
      .then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err, 'error while trying to save recipe into DB');
      });
  }

  // function to update the state with a selected recipe => passed down to list items below
  selectRecipe(recipe) {
    this.setState({
      selectedRecipe: recipe,
    });
  }


  signUp(user, pw) {
    this.setState({ buttonClicked: true });
    console.log(`thank you for signing up, ${user}`);
    console.log(`Hello, ${user}`);
    axios.post('/api/users', {
      user: {
        username: user,
        password: pw,
      },
    })
      .then((res) => {
        console.log('made to signup');
        console.log(res.data.user, res.data.user.id, 'RESPONSE');
        console.log('where is res');
        this.setState({
          authorized: true,
          userId: res.data.user.id,
          userName: res.data.user.username,
        });
        setTimeout(() => this.setState({ buttonClicked: false }), 500);
        this.componentDidMount();
      })
      .catch((bool) => {
        setTimeout(() => this.setState({ buttonClicked: false }), 500);
        console.log(bool, 'could not log in after signup');
      });
  }

  login(user, pw) {
    this.setState({ buttonClicked: true });
    console.log('logged in');
    console.log(`Hello, ${user}`);
    axios.post('/api/users/login', {
      user: {
        username: user,
        password: pw,
      },
    })
      .then((res) => {
        console.log(res, 'LOGGING IN');
        this.setState({
          authorized: true,
          userId: res.data.user.id,
          userName: res.data.user.username,
        });
        setTimeout(() => this.setState({ buttonClicked: false }), 500);
        this.componentDidMount();
      })
      .catch(() => {
        setTimeout(() => this.setState({ buttonClicked: false }), 500);
        console.log('could not log in');
      });
  }

  render() {
    const { show } = this.state;
    let mainComponent = 'login';
    const {
      recipeOfTheDay, selectedRecipe, savedRecipes, recipes, ingredients, userName, buttonClicked,
    } = this.state;
    if (show === 'login') {
      mainComponent = <Login recipe={recipeOfTheDay} signUp={this.signUp} login={this.login} buttonClicked={buttonClicked} />;
    } else if (show === 'home') {
      mainComponent = (
        <Main
          recipes={recipes}
          recipeOfTheDay={recipeOfTheDay}
          selectedRecipe={selectedRecipe}
          savedRecipes={savedRecipes}
          ingredients={ingredients}
          getRecipes={this.getRecipes}
          saveRecipe={this.saveRecipe}
          saveDislikeRecipe={this.saveDislikeRecipe}
          getSavedRecipes={this.getSavedRecipes}
          selectRecipe={this.selectRecipe}
          user={userName}
        />
      );
    }
    return (
      <div>
        {mainComponent}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
