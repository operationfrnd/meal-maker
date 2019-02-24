// component (with username and password input forms, a login button and a signup button)
import React from 'react';
import Button from '@material-ui/core/Button';

class Credentials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.clearField = this.clearField.bind(this);
  }

  // validateForm() {
  //   return this.state.email.length > 0 && this.state.password.length > 0;
  // }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }

  // handleSubmit = event => {
  //   event.preventDefault();
  // }
  // onClick() {
  //   console.log('clicked');
  // }
  clearField(user, pw){
    document.getElementById('username').reset();
    document.getElementById('password').reset();
  }

  render() {
    // <div className="Login">
    //   <form onSubmit={this.handleSubmit}>
    //     Username: <input type="text" name="username"> </input>
    //     Password: <input type="text" name="password"> </input>
    //   </form>
    //   <button type="submit"> Login </button>
    //   <button type="submit"> Sign Up </button>
    // </div>
    const { signUp, login } = this.props;

    return (
    // <form>
    // <input type="text" name="username" placeholder="Username"/>
    // <input type="text" name="password" placeholder="Password" />
    // </form>
    //   <button type="submit" value="Login" onClick={this.onclick.bind(this)}/>
    //   <button type="submit" value="Sign Up" />

      <div>
        <input id="username" type="text" name="username" placeholder="Username" />
        <input id="password" type="password" name="password" placeholder="Password" />
        <Button variant="contained" color="primary" type="submit" value="login" onClick={() => {
          const user = document.getElementById('username').value;
          const pw = document.getElementById('password').value;
          login(user, pw);
          // this.clearField();
          // this.clearField('password');
          // this.username.value = '';
          // this.password.value = '';
        }}
        >
        Login
        </Button>
        <Button variant="contained" color="primary" type="submit" value="signUp" onClick={() => {
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
