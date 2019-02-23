// a component with
// a list of recipe list items spaced
import React from 'react';
import RecipeListItem from './RecipeListItem.jsx';

const RecipeList = ({ recipes, onClick, saveRecipe, saveDislikeRecipe, selectRecipe }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => {
        return <RecipeListItem recipe={recipe}
                            key={recipe.recipeId} 
                            onClick={onClick} 
                            saveRecipe={saveRecipe}
                            saveDislikeRecipe={saveDislikeRecipe}
                            selectRecipe={selectRecipe} />;
      })}
    </div>
  );
};


export default RecipeList;
