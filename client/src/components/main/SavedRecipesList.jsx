// a component with
// a title/text: Saved Recipes
// a list of items

import React from 'react';
import SavedRecipesListItem from './SavedRecipesListItem.jsx';

const SavedRecipesList = ({ savedRecipes, changeView}) => (
  <div className="recipe-list">
    {savedRecipes.map(savedRecipe => <SavedRecipesListItem key={savedRecipe.name} savedRecipe={savedRecipe} changeView={changeView} />)
    }
  </div>
);
export default SavedRecipesList;
