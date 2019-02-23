// component with a list of instructions for the recipe of the day which can be scrolled
import React from 'react';
import Paper from '@material-ui/core/Paper';

class RecipeInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: props.recipe,
    };
  }

  componentDidMount() {
    this.setState({
      currentVideo: this.props.recipe,
    })
  }

  render() {
    const { currentVideo } = this.state;
    // const { selectedRecipe } = this.props;
    const steps = currentVideo.instructions.split('\n');
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
            { steps.map(step => <li key={step}>{ step }</li>) }
          </ul>
        </Paper>
      </div>
    );
  }
}
export default RecipeInstructions;
