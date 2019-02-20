// component with a list of instructions for the recipe of the day which can be scrolled
import React from 'react';

const RecipeInstructions = ({ recipe }) => (
  <div className="instructions-list">
    <h3>{recipe.name}</h3>
    <b>Cook Time:</b>
    {recipe.cooktime}
    <br />
    <b>Ingredients:</b>
    {recipe.ingredients}
    <br />
    <b>Instructions:</b>
    {recipe.instructions}
    <br />
  </div>
);
export default RecipeInstructions;
