import React from 'react';

const Login = () => {
  return (
    <div>
      <form className="loginForm">
        <h1 className="loginHeader">MyCompass App</h1>
        <input type="text" class="login-input" placeholder="username" />
        <input type="password" class="login-input" placeholder="password" />
        <button className="login-button">Login</button>
        <p className="login-forgot">Forgot Password?</p>
      </form>
    </div>
  );
};

export default Login;
