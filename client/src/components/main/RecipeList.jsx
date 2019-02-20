// a component with 
// a list of recipe list items spaced
import React from 'react';

var RecipeList = ({ recipes }) => {
  const onClick = () => {
    console.log('clicked');
  }
  return (
  <div className="recipe-list">
    {recipes.map((recipe) => <RecipeListItem recipe={recipe} key={recipe.recipeId} onClick={onClick.bind(this)} />)}
  </div >
)};


export default RecipeList;
