// a component with
// a receipe name
// a match percentage
// a 'save/like recipe' button
// a 'dislike recipe' button
// ingredients

import React from 'react';

const RecipeListItem = ({ recipe }) => {

  return (
    <div className="recipe-list-item">
      <b>Recipe Name:</b> {recipe.name} 
      <br />
      <b>Cook Time:</b> {recipe.cooktime} 
      <br />
      {/* <b>Uses:</b> {recipe.ingredients.usedIngredients} <br /> */}
      <b>Match Percentage:</b> {recipe.percentage}%
    </div>
  );
};


export default RecipeListItem;