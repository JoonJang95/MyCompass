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
      lookingFor: 'food',
      recommendations: []
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState(
          {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
            gpsAccuracy: pos.coords.accuracy
          },
          () => {
            this.getNearbyRecommendations();
          }
        );
      },
      err => {
        console.log('Could not get current location: ', err);
      },
      { enableHighAccuracy: true }
    );
  }

  getNearbyRecommendations() {
    console.log('new hey call');
    const endPoint = 'https://api.foursquare.com/v2/search/recommendations?';
    const parameters = {
      client_id: FourSquareID,
      client_secret: FourSquareSecret,
      ll: `${this.state.latitude}, ${this.state.longitude}`,
      llAcc: this.state.gpsAccuracy,
      intent: this.state.lookingFor,
      limit: 10,
      openNow: true,
      v: '20190123'
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(({ data }) => {
        const { results } = data.response.group;
        console.log('data from 4square', results);
        this.setState(
          {
            recommendations: results
          },
          () => {
            console.log('new state rec', this.state.recommendations);
          }
        );
      })
      .catch(err => {
        console.log('error with get nearby recommendations request: ', err);
      });
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
