// component with a recipe name & a video player
import React from 'react';

var VideoPlayer = ({ recipe }) => (
  <div className="video-player">
    <div className="video-player-details">
      <h3>{recipe.name}</h3>
    </div>
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${recipe.link}`} allowFullScreen></iframe>
    </div>
  </div>
);

VideoPlayer.propTypes = {
  recipe: React.PropTypes.object.isRequired
};

export default VideoPlayer;