// a component with
// a title/text: Saved Recipes
// a list of items

import React from 'react';
import SavedRecipesListItem from './SavedRecipesListItem.jsx';

const SavedRecipesList = ({ savedRecipes, changeView, selectRecipe}) => (
  <div className="recipe-list">
    {savedRecipes.map(savedRecipe => <SavedRecipesListItem key={savedRecipe.name} savedRecipe={savedRecipe} changeView={changeView} selectRecipe={selectRecipe} />)
    }
  </div>
);
export default SavedRecipesList;
