// a component with
// a title/text: Saved Recipes
// a list of items

import React from 'react';
import SavedRecipesListItem from './SavedRecipesListItem.jsx';

const SavedRecipesList = ({savedRecipes}) => (
  <div className="recipe-list">
    {savedRecipes.map(savedRecipe => <SavedRecipesListItem savedRecipe={savedRecipe} />)
    }
  </div>
);
export default SavedRecipesList;
