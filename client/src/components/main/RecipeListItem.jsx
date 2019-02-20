// a component with 
// a receipe name
// a match percentage
// a 'save/like recipe' button
// a 'dislike recipe' button
// ingredients 



import React from 'react';

var RecipeInstructions = ({ recipe }) => (
  <div className="instructions-list">
    <b>Recipe Name:</b> {recipe.name} <br />
    <b>Cook Time:</b> {recipe.cookTime} <br />
    <b>Uses:</b> {recipe.ingredients.usedIngredients} <br />
  </div >
);


export default RecipeInstructions;