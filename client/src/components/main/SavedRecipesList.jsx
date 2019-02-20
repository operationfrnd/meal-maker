// a component with
// a title/text: Saved Recipes
// a list of items

import React from 'react';
import SavedRecipesListItem from './SavedRecipesListItem.jsx';

var SavedRecipesList = ({savedRecipes}) => (
  <div className="recipe-list">
    {savedRecipes.map(recipe =>
      <SavedRecipesListItem recipe={recipe} />
    )}
  </div>
);
export default SavedRecipesList;
