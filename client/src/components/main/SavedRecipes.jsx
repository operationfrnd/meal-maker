// a drawer (with a saved recipes list component and a saved recipe list item component)
import React from 'react';
import SavedRecipesList from './SavedRecipesList.jsx';

const SavedRecipes = ({ savedRecipes, changeView, selectRecipe }) => (

  <div className="saved-recipes-container">
    <h1>Your saved recipes</h1>
    <div>
      <SavedRecipesList savedRecipes={savedRecipes} changeView={changeView} selectRecipe={selectRecipe} />
    </div>
  </div>
);


export default SavedRecipes;
