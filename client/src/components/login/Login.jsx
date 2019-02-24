// login view which contains
// 1) a credential component (with username and password input forms, a login button and a signup button)
// 2) a recipe of the day video player component
// 3) a recipe instructions component (with a scrolling list of instructions)
import React from 'react';
import Credentials from './Credentials.jsx';
import RecipeInstructions from './RecipeInstructions.jsx';
import VideoPlayer from '../VideoPlayer.jsx';
import kitchen from '../../../images/kitchen.png';
import fridge from '../../../images/refrigerator-512.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { recipe, signUp, login } = this.props;
    return (
      <div>
        <div className="credentials">
          <Credentials signUp={signUp} login={login} />
        </div>
        <div className="appName">
          {/* <h1 className="mealMaker">mealMaker</h1> */}
          {/* <div>
              <img src={fridge} alt="" margin="auto" width="250px" display="block" />
              
            </div> */}
          <div>
            <img alt="" align="left" src={fridge} height="200px" width="200px" />
            <h1 className="loginMeal">mealMaker</h1>
            <h5>FROM: operation-FRND</h5>
          </div>
        </div>
        {/* <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> */}
        {/* <div>Icons made by <a href="https://www.flaticon.com/<?=_('authors').'/'?>freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
        {/* <div className="title">
          <h2>Recipe of the day</h2>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="vidPlayer"><VideoPlayer recipe={recipe} /></td>
              <td className="instructions">
                <RecipeInstructions recipe={recipe} />
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
    );
  }
}
export default Login;
