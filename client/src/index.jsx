// rendering all components
/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './components/login/login.jsx';
import Recipe from './components/Recipe.jsx';
import sampledata from './example_rfn_data';
import Credentials from './components/login/Credentials.jsx';
import RecipeInstructions from './components/login/RecipeInstructions.jsx';
import VideoPlayer from './components/login/VideoPlayer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  // function to retrieve recipes to display 
  getRecipes() {
    return axios.get('/api/recipes') // sends a GET request to serve at endpoint '/api/recipes'
      .then((results) => {
        // console.log(results);
        this.setState({ // change the state
          recipes: results, // by making the data received back fron the server available 
        })
      }).catch((err) => {
        console.log(err, 'error while retrieving data from server')
      })
  }

  // 

  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo">Meal Maker</span>
          <Credentials /> 
        </div>

        <div className="main">
        
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));