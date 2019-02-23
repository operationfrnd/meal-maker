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
        <input id="password" type="text" name="password" placeholder="Password" />
        <Button variant="contained" color="primary" type="submit" value="login" onClick={() => console.log(document.getElementById('username').value)}>Login</Button>
        <Button variant="contained" color="primary" type="submit" value="signUp" onClick={() => signUp('Pineapple')}>Sign Up</Button>
      </div>
    );
  }
}
export default Credentials;
