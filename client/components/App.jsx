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

    this.getLocation = this.getLocation.bind(this);
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
        console.log(results);
        const geoJSONStore = [];

        results.forEach(result => {
          console.log(result);
          let photo = 'no photo';
          let text = 'no description';

          if (Object.keys(result.snippets.items[0]).length !== 0) {
            console.log('text called');
            text = result.snippets.items[0].detail.object.text;
          }

          if (result.photo) {
            console.log('photo called');
            let prefix = result.photo.prefix;
            let size = `${result.photo.height}x${result.photo.width}`;
            let suffix = result.photo.suffix;

            photo = `${prefix}${size}${suffix}`;
          }

          geoJSONStore.push({
            coordinates: [result.venue.location.lng, result.venue.location.lat],
            name: result.venue.name,
            text: text,
            photo: photo
          });
          console.log('end of this round');
        });

        console.log('state obj', geoJSONStore);
        // this.setState(
        //   {
        //     recommendations: results
        //   },
        //   () => {
        //     console.log('obtained nearby data', this.state.recommendations);
        //   }
        // );
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
