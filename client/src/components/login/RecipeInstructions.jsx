// component with a list of instructions for the recipe of the day which can be scrolled
import React from 'react';

class RecipeInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { recipe } = this.props;
    const steps = recipe.instructions.split('\n');
    return (
      <div className="instructions-list">
        <h3>{recipe.name}</h3>
        <b>Cook Time: </b>
        {recipe.cooktime}
        {' '}
        minutes
        <br />
        <b>Ingredients: </b>
        {recipe.ingredients}
        <br />
        <b>Instructions: </b>
        {/* {recipe.instructions} */}
        <ul>
          { steps.map(step => <li key={step}>{ step }</li>) }
        </ul>
        <br />
      </div>
    );
  }
}
export default RecipeInstructions;
