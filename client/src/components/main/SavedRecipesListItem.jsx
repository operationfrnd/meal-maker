// an item with
// a recipe name
// a percentage match
// ingredients
import React from 'react';

const SavedRecipeListItem = ({ savedRecipe }) => (
  <div className="saved-recipe-list-item">
    <b>Recipe Name:</b>
    {savedRecipe.name}
    <br />
    <b>Cook Time:</b>
    {savedRecipe.cookTime}
    <br />
    <b>Uses:</b>
    {savedRecipe.ingredients.usedIngredients}
    <br />
    <b>Match Percentage:</b>
    {savedRecipe.percentage}
    %
  </div>
);


export default SavedRecipeListItem;
