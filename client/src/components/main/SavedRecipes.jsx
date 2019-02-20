// a drawer (with a saved recipes list component and a saved recipe list item component)
import React from 'react';
import SavedRecipesList from './SavedRecipesList';

const SavedRecipes = ({ savedRecipes }) => (

  <div className="saved-recipes-container">
    <h1>Your saved receipes</h1>
    <div>
      <SavedRecipesList savedRecipes={savedRecipes} />
    </div>
  </div>
);


export default SavedRecipes;
