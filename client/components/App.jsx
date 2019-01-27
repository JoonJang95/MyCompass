import React from 'react';
import Login from './Login.jsx';
import Questions from './Questions.jsx';
import Map from './Map.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => console.log(pos.coords.latitude),
      err => console.log('err', err)
    );
  }

  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default App;
