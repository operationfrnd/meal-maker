// component with a list of instructions for the recipe of the day which can be scrolled
import React from 'react';

var RecipeInstructions = ({ recipe }) => (
  <div className="instructions-list">
    <b>Cook Time:</b> {recipe.cookTime} <br />
    <b>Ingredients:</b> {recipe.ingredients} <br />
    <b>Instructions:</b> {recipe.instructions} <br />
  </div >
);


export default RecipeInstructions;