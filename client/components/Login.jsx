import React from 'react';
import auth from './Auth.js';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitLogin() {
    axios
      .post('/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(({ data }) => {
        if (results.data.valid) {
          auth.login(() => {
            props.history.push('/');
          });
        } else {
          alert('Wrong Username or Password');
        }
      })
      .catch(err => {
        console.log('error checking credentials: ', err);
      });
  }

  render() {
    return (
      <div>
        <form className="loginForm">
          <h1 className="loginHeader">MyCompass App</h1>
          <input
            name="username"
            onChange={this.onInputChange}
            type="text"
            className="login-input"
            placeholder="username"
          />
          <input
            name="password"
            onChange={this.onInputChange}
            type="password"
            className="login-input"
            placeholder="password"
          />
          <button
            onClick={e => {
              e.preventDefault();
            }}
            className="login-button"
          >
            Login
          </button>
          <p className="login-forgot">Forgot Password?</p>
        </form>
      </div>
    );
  }
}

export default Login;
