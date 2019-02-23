// an item with
// a recipe name
// a percentage match
// ingredients
import React from 'react';

const SavedRecipeListItem = ({ savedRecipe, changeView, selectRecipe }) => (
  <div className="saved-recipe-list-item">
    <div onClick={() => {
      selectRecipe(savedRecipe);
      changeView('recipe');
    }}
    >
      <b> {savedRecipe.name} </b>
    </div>
    <br />
    <sup>Cook Time: 
    {' '}{savedRecipe.cookTime} 
    minutes
    </sup>
    <br />
    {/* <b>Uses:</b>
    {savedRecipe.ingredients.usedIngredients}
    <br /> */}
    {/* <b>Match Percentage:</b>
    {savedRecipe.percentage}
    % */}
  </div>
);


export default SavedRecipeListItem;
