// login view which contains
// 1) a credential component (with username and password input forms, a login button and a signup button)
// 2) a recipe of the day video player component
// 3) a recipe instructions component (with a scrolling list of instructions)
import React from 'react';
import Credentials from './Credentials.jsx';
import RecipeInstructions from './RecipeInstructions.jsx';
import VideoPlayer from '../VideoPlayer.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // display: 'off', // initial state of display is off
      // what: 'Reveal Translation' // which means the 'Reveal Translation' text is displayed
    };
  }

  render() {
    const { recipe } = this.props;
    return (
      <div>
        <div className="credentials">
          <Credentials />
        </div>
        <div className="appName">
          <h1>Meal Maker</h1>
        </div>
        <div className="title">
          <h2>Recipe of the day</h2>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="vidPlayer"><VideoPlayer recipe={recipe} /></td>
              <td className="instructions"><RecipeInstructions recipe={recipe} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Login;
