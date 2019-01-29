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
      .then(results => {
        let { isValid } = results.data;
        switch (true) {
          case isValid === 404:
            alert('username does not exist');
            break;
          case isValid:
            auth.login(() => {
              console.log('redirecting');
              this.props.history.push('/');
              this.props.setUser(this.state.username);
              // if (this.props.gotLocation) {
              //   console.log('updating current user');
              //   this.props.setUser(this.state.username);
              // }
            });
            break;
          default:
            alert('Wrong Username or Password');
        }
      })
      .catch(err => {
        console.log('error submitting credentials: ', err);
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
              if (!this.state.username || !this.state.password) {
                alert('Please fill out both username & password');
              } else {
                this.submitLogin();
              }
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
