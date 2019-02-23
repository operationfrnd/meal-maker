// component with a list of instructions for the recipe of the day which can be scrolled
import React from 'react';
import Paper from '@material-ui/core/Paper';

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
        <Paper style={{ maxHeight: 250, overflow: 'auto' }}>
          <b>Cook Time:</b>
          {recipe.cooktime}
          <br />
          <b>Ingredients:</b>
          {recipe.ingredients}
          <br />
          {/* {recipe.instructions} */}
          <b>Instructions:</b>
          <ul>
            { steps.map(step => <li>{ step }</li>) }
          </ul>
        </Paper>
        <br />
      </div>
    );
  }
}
export default RecipeInstructions;
