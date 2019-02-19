// component with a recipe name & a video player
import React from 'react';

var VideoPlayer = ({ video }) => (
  <div className="video-player">
    <div className="video-player-details">
      <h3>{video.title}</h3>
    </div>
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="embed-responsive-item" src={video.url} allowFullScreen></iframe>
    </div>
  </div>
);

VideoPlayer.propTypes = {
  video: React.PropTypes.object.isRequired
};

export default VideoPlayer;