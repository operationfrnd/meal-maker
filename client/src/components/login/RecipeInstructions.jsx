// component with a list of instructions for the recipe of the day which can be scrolled
import React from 'react';

class RecipeInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const steps = this.props.recipe.instructions.split('\n');
    const { recipe } = this.props;
    return (
      <div className="instructions-list">
        <h3>{recipe.name}</h3>
        <b>Cook Time:</b>
        {recipe.cooktime}
        <br />
        <b>Ingredients:</b>
        {recipe.ingredients}
        <br />
        <b>Instructions:</b>
        {/* {recipe.instructions} */}
        <ul>{ steps.map(step => <li>{ step }</li> ) }
        </ul>
        <br />
      </div>
    );
  }
}
export default RecipeInstructions;
