// a component with
// a receipe name
// a match percentage
// a 'save/like recipe' button
// a 'dislike recipe' button
// ingredients

import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
// import green from '@material-ui/core/colors/green';

const StyledButtonSave = withStyles({
  root: {
    background: 'forestgreen',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 28,
    padding: '0 20px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const StyledButtonDislike = withStyles({
  root: {
    background: 'firebrick',
    hover: 'red',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 28,
    padding: '0 20px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const RecipeListItem = ({ recipe, saveRecipe, saveDislikeRecipe, selectRecipe, changeView }) => {

  return (
    <div
      className="recipe-list-item"
    >
      <table>
        <tbody>
          <tr>
            <td>
              <img src={recipe.image} alt="" />
            </td>
            <td>
              <div
                className="name"
                onClick={() => {
                  const ingObj = recipe.ingredients;
                  const newIng = _.flatten(ingObj.allIngredients, ingObj.missedIngredients, ingObj.unusedIngredients, ingObj.usedIngredients);
                  const newRecipe = {
                    cookTime: recipe.cookTime,
                    image: recipe.image,
                    ingredients: newIng,
                    instructions: recipe.instructions,
                    link: recipe.videoId,
                    name: recipe.name,
                    recipeId: recipe.recipeId,
                  };
                  selectRecipe(newRecipe);
                  changeView('recipe');
                }}
                role="presentation"
              >
                <b>
                  {recipe.name}
                </b>
              </div>
              <div className="cookTime">
                <b>Cook Time:</b>
                {' '}
                {recipe.cookTime}
                {' '}
                minutes
              </div>
              <div className="ingredients-used">
                <b>Uses: </b>
                {recipe.ingredients.usedIngredients}
                <br />
                <b>Match Percentage: </b>
                {recipe.percentage}
                %
              </div>
              <div>
                <StyledButtonSave type="button" className="save-recipe-button" variant="contained" onClick={() => saveRecipe(recipe)}> Save that recipe </StyledButtonSave>
                <StyledButtonDislike type="button" className="dislike-recipe-button" variant="contained" onClick={() => saveDislikeRecipe(recipe)}> Never again! </StyledButtonDislike>
              </div>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};


export default RecipeListItem;
