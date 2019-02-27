// component (with username and password input forms, a login button and a signup button)
import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Credentials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    const {
      signUp, login, buttonClicked, whichFailed,
    } = this.props;

    return (
      <div>
        <input id="username" type="text" name="username" placeholder="Username" />
        <input id="password" type="password" name="password" placeholder="Password" />
        <br />
        <div className="login-loader">
          {buttonClicked ? <CircularProgress /> : <div>{whichFailed ? `Failed to ${whichFailed}!` : '' }</div>}
        </div>
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="login"
          onClick={() => {
            const user = document.getElementById('username').value;
            const pw = document.getElementById('password').value;
            login(user, pw);
          }}
        >
        Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="signUp"
          onClick={() => {
            const user = document.getElementById('username').value;
            const pw = document.getElementById('password').value;
            signUp(user, pw);
          }}
        >
        Sign Up
        </Button>
      </div>
    );
  }
}
export default Credentials;
