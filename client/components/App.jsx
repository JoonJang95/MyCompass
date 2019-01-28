import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import Map from './Map.jsx';
import { FourSquareID, FourSquareSecret } from '../../envConfigs.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: -73.968285,
      latitude: 40.785091,
      gpsAccuracy: 30,
      lookingFor: 'food'
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log('hey', pos);
        this.setState({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
          gpsAccuracy: pos.coords.accuracy
        });
      },
      err => {
        console.log('Could not get current location: ', err);
      },
      { enableHighAccuracy: true }
    );
  }

  getNearbyRecommendations() {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore';
    const parameters = {
      client_id: FourSquareID,
      client_secret: FourSquareSecret,
      section: this.state.lookingFor,
      ll: `${this.state.latitude}, ${this.state.longitude}`,
      llAcc: this.state.gpsAccuracy,
      limit: 10,
      openNow: 1
    };
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
