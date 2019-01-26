import React from 'react';
import Login from './Login.jsx';
import Questions from './Questions.jsx';
import Main from './Main.jsx';

const PAGES = {
  '/': Main,
  '/questions': Questions,
  '/login': Login
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="wrapper">
        <Login />
      </div>
    );
  }
}

export default App;
