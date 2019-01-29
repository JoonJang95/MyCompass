import React from 'react';
import auth from './Auth.js';

const Login = props => {
  return (
    <div>
      <form className="loginForm">
        <h1 className="loginHeader">MyCompass App</h1>
        <input type="text" className="login-input" placeholder="username" />
        <input type="password" className="login-input" placeholder="password" />
        <button
          onClick={e => {
            e.preventDefault();

            auth.login(() => {
              props.history.push('/');
            });
          }}
          className="login-button"
        >
          Login
        </button>
        <p className="login-forgot">Forgot Password?</p>
      </form>
    </div>
  );
};

export default Login;
