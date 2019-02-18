// rendering all components
/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './components/Login.jsx';
import Recipe from './components/Recipe.jsx';
import sampledata from './example_rfn_data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  //function to retrieve recipes to display 
  getRecipes() {
    return axios.get('/api/recipes') // sends a GET request to serve at endpoint '/api/recipes'
      .then((results) => {
        // console.log(results);
        this.setState({ // change the state
          recipes: results.results, // by making the data received back fron the server available 
        })
      }).catch((err) => {
        console.log(err, 'error while retrieving data from server')
      })
  }

  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo">Meal Maker</span>
          <span className={this.state.view === 'phrases'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('phrases')}>
            Phrase List
          </span>
          <span className={this.state.view === 'practice'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('practice')}>
            Practice
          </span>
        </div>

        <div className="main">
          {this.state.view === 'phrases'
            ? <PhraseList data={this.state.data} />
            : <Practice phrase={this.state.currentPhrase} selectPhrase={this.selectPhrase} />
          }
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));