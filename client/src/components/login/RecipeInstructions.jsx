// component with a list of instructions for the recipe of the day which can be scrolled
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { ListItemText } from '@material-ui/core';
import { inflate } from 'zlib';

class RecipeInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: props.recipe,
    };
  }

  render() {
    const { currentVideo } = this.state;
    let video;
    let steps;

    if (typeof (currentVideo.instructions) === 'string') {
      video = currentVideo;
      steps = currentVideo.instructions.split('\n');
    } else {
      video = currentVideo;
      steps = currentVideo.instructions;
    }
    console.log(video.ingredients);

    if (typeof (video.ingredients) === 'string') {
      video.ingredients = video.ingredients.split('\n').join(', ');
    } else {
      video.ingredients = video.ingredients.join(', ');
    }
    console.log(video.ingredients.split('\n').join(', '));
    return (
      <div className="instructions-list">
        <h3>{video.name}</h3>
        <Paper style={{ maxHeight: 250, overflow: 'auto' }}>
          <b>Cook Time: </b>
          {video.cookTime}
          {' '}
          minutes
          <br />
          <b>Ingredients: </b>
          {video.ingredients}
          <br />
          {/* {video.instructions} */}
          <br />
          <b>Instructions: </b>
          <ul>
            {steps.map(step => <li key={step}>{step}</li>)}
          </ul>
        </Paper>
      </div>
    );
  }
}
export default RecipeInstructions;
