// individual recipe view containing the recipe instructions and a youtube video player

import React from 'react';
import RecipeInstructions from './login/RecipeInstructions.jsx';
import VideoPlayer from './VideoPlayer.jsx';


const Recipe = ({ selectedRecipe }) => {
  return (
    <div className="selected-recipe">
      <table>
        <tbody>
          <tr>
            <td className="vidPlayer"><VideoPlayer recipe={selectedRecipe} /></td>
            <td className="instructions">
              <RecipeInstructions recipe={selectedRecipe} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Recipe;
