// a component with
// a receipe name
// a match percentage
// a 'save/like recipe' button
// a 'dislike recipe' button
// ingredients

import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const StyledButtonSave = withStyles({
  root: {
    background: 'lightgreen',
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
    background: 'lightorange',
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

const RecipeListItem = ({ recipe, saveRecipe, saveDislikeRecipe, selectRecipe }) => {

  // const onClick = () => {
  //   console.log('clicked');
  // }

  return (
    <div className="recipe-list-item">
      {/* <b onClick={() => console.log('hey there')}>Recipe Name: </b> {recipe.name}  */}
      <div onClick={() => {
        selectRecipe(recipe);
        changeView('recipe');
      }}
      >
        <b> {recipe.name} </b>
      </div>
      <StyledButtonSave type="button" className="save-recipe-button" variant="contained" color="primary" onClick={() => saveRecipe(recipe)}> Save that recipe </StyledButtonSave>
      <StyledButtonDislike type="button" className="dislike-recipe-button" variant="contained" color="primary" onClick={() => saveDislikeRecipe(recipe)}> Never again! </StyledButtonDislike>
      <br />
      <b>Cook Time: </b> {recipe.cookTime} minutes
      <br />
      <b>Uses: </b> {recipe.ingredients.usedIngredients} <br />
      <b>Match Percentage: </b> {recipe.percentage}%
    </div>
  );
};


export default RecipeListItem;
