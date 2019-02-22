// component with an input form, a + button and a submit button

import React, { Component, Fragment } from 'react';
import VideoPlayer from '../VideoPlayer.jsx';
import RecipeInstructions from '../login/RecipeInstructions.jsx';
// import PropTypes from "prop-types";
import AutoComplete from './AutoComplete.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { recipe, getRecipes, ingredients } = this.props;
    return (
      <div>
        <h2>Search</h2>
        <AutoComplete ingredients={ingredients} addIngredient={this.addIngredient} getRecipes={getRecipes} />
        <div className="recipe-of-the-day-container">
          <table>
            <tbody>
              <tr>
                <td className="vidPlayer"><VideoPlayer recipe={recipe} /></td>
                <td className="instructions"><RecipeInstructions recipe={recipe} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Search;
