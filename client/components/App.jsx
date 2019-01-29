import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
import MapCanvas from './MapCanvas.jsx';
import Sidebar from './Sidebar.jsx';
import Error from './Error.jsx';
import auth from './Auth.js';
import { FourSquareID, FourSquareSecret } from '../../envConfigs.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: -73.968285,
      latitude: 40.785091,
      gpsAccuracy: 30,
      currentSearch: '',
      geoJSONStore: [],
      currentUser: '',
      gotLocation: false
    };

    this.getLocation = this.getLocation.bind(this);
    this.getNearbyRecommendations = this.getNearbyRecommendations.bind(this);
    this.searchArea = this.searchArea.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  setCurrentUser(user) {
    this.setState({
      currentUser: user
    });
  }

  getLocation(user) {
    console.log('updating location');
    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
        this.setState({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
          gpsAccuracy: pos.coords.accuracy,
          gotLocation: true
        });
      },
      err => {
        console.log('Could not get current location: ', err);
      },
      { enableHighAccuracy: true }
    );
  }

  getNearbyRecommendations(searchValue) {
    const endPoint = 'https://api.foursquare.com/v2/search/recommendations?';
    const parameters = {
      client_id: FourSquareID,
      client_secret: FourSquareSecret,
      ll: `${this.state.latitude}, ${this.state.longitude}`,
      llAcc: this.state.gpsAccuracy,
      intent: searchValue,
      limit: 10,
      openNow: true,
      v: '20190123'
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(({ data }) => {
        const { results } = data.response.group;
        const geoJSONStore = [];

        results.forEach(result => {
          let photo = 'no photo';
          let text = 'no description';

          if (Object.keys(result.snippets.items[0]).length !== 0) {
            text = result.snippets.items[0].detail.object.text;
          }

          if (result.photo) {
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
        });

        this.setState(
          {
            geoJSONStore: geoJSONStore,
            currentSearch: searchValue
          },
          () => {
            console.log('obtained nearby data', this.state.geoJSONStore);
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

    this.getNearbyRecommendations(searchValue);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              if (auth.isAuthenticated()) {
                return (
                  <div className="AppWrapper">
                    <MapCanvas
                      {...this.state}
                      saveMarkers={this.saveCurrentMarkers}
                    />
                    <Sidebar
                      searchFunc={this.searchArea}
                      currUser={this.state.currentUser}
                    />
                  </div>
                );
              } else {
                return (
                  <Redirect
                    to={{
                      pathname: 'login',
                      state: {
                        from: props.location
                      }
                    }}
                  />
                );
              }
            }}
          />
          <Route
            exact
            path="/login"
            render={props => <Login {...props} setUser={this.setCurrentUser} />}
          />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

//trying out react router (this marks the spot before implementing router);

export default App;
