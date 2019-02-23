// component with an input form, a + button and a submit button

import React, { Component, Fragment } from 'react';
import VideoPlayer from '../VideoPlayer.jsx';
import RecipeInstructions from '../login/RecipeInstructions.jsx';
// import PropTypes from "prop-types";
import RecipeList from './RecipeList.jsx';
import AutoComplete from './AutoComplete.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { recipeOfTheDay, recipes, getRecipes, ingredients, saveRecipe, saveDislikeRecipe } = this.props;
    return (
      <div>
        <h2>Search</h2>
        <div className="Search-Comp">
        <AutoComplete ingredients={ingredients} addIngredient={this.addIngredient} getRecipes={getRecipes} />
        </div>

        <div>
          <RecipeList recipes={recipes} saveRecipe={saveRecipe} saveDislikeRecipe={saveDislikeRecipe}> </RecipeList>
        </div>


        <div className="recipe-of-the-day-container">
          <table>
            <tbody>
              <tr>
                <td className="vidPlayer"><VideoPlayer recipe={recipeOfTheDay} /></td>
                <td className="instructions"><RecipeInstructions recipe={recipeOfTheDay} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Search;
