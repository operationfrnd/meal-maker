// individual recipe view containing the recipe instructions and a youtube video player

import React from 'react';
import RecipeInstructions from './login/RecipeInstructions.jsx';
import VideoPlayer from './VideoPlayer.jsx';


const Recipe = ({ recipe }) => {
  return (
    <div className="recipe">
      <h1>{recipe.name}</h1>
      <table>
        <tbody>
          <tr>
            <td className="vidPlayer"><VideoPlayer recipe={recipe} /></td>
            <td className="instructions">
              <RecipeInstructions recipe={recipe} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Recipe;
