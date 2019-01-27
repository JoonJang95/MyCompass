import React from 'react';
import Login from './Login.jsx';
import Questions from './Questions.jsx';
import Main from './Main.jsx';

const PAGES = {
  '/': Main,
  '/login': Login,
  '/questions': Questions
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  clickHandler(e) {
    console.log('hey');
    e.preventDefault();
    window.history.pushState('object or string', 'Title', '/questions');
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
