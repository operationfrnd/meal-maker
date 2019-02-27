// login view which contains
// 1) a credential component (with username & password input forms, login & signup button)
// 2) a recipe of the day video player component
// 3) a recipe instructions component (with a scrolling list of instructions)
import React from 'react';
import Credentials from './Credentials.jsx';
import logo from '../../../images/clearLogo.png';
import Background from '../../../images/opaque.jpg';

const sectionStyle = {
  height: '700px',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundImage: `url(${Background})`,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      recipe, signUp, login, buttonClicked, whichFailed,
    } = this.props;
    return (
      <div className="background" style={sectionStyle}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="credentials">
          <Credentials signUp={signUp} login={login} buttonClicked={buttonClicked} whichFailed={whichFailed} />
        </div>
        <div className="appName">
          <div>
            <img alt="" align="left" src={logo} height="200px" width="200px" />
            <h1 className="loginMeal">mealMaker</h1>
            <h5>FROM: operation-FRND</h5>
          </div>
        </div>
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

    );
  }
}
export default Login;
