import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
// import Map from './Map.jsx';
import Sidebar from './Sidebar.jsx';
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

    this.getNearbyRecommendations = this.getNearbyRecommendations.bind(this);
    this.searchArea = this.searchArea.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
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
        this.setState(
          {
            recommendations: results
          },
          () => {
            console.log(this.state.recommendations);
          }
        );
      })
      .catch(err => {
        console.log('error with get nearby recommendations request: ', err);
      });
  }

  searchArea(e) {
    e.preventDefault();

    const searchValue = e.target.value;
    console.log('search called with:', searchValue);

    this.setState(
      {
        lookingFor: searchValue
      },
      () => {
        console.log('invoking 4Square API');
        this.getNearbyRecommendations();
      }
    );
  }

  render() {
    return (
      <div className="AppWrapper">
        <Sidebar searchFunc={this.searchArea} />
      </div>
    );
  }
}

{
  /* <Map location={this.state} /> */
}

export default App;
