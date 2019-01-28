import React from 'react';
import Login from './Login.jsx';
import Map from './Map.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: -73.968285,
      latitude: 40.785091
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude
        });
      },
      err => {
        console.log('Could not get current location: ', err);
      }
    );
  }

  render() {
    return (
      <div className="MapWrapper">
        <Map location={this.state} />
      </div>
    );
  }
}

export default App;
