import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
import MapCanvas from './MapCanvas.jsx';
import Sidebar from './Sidebar.jsx';
import Favorites from './Favorites.jsx';
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
      favoriteSpots: [],
      currentUser: '',
      gotLocation: false
    };

    this.getLocation = this.getLocation.bind(this);
    this.getNearbyRecommendations = this.getNearbyRecommendations.bind(this);
    this.searchArea = this.searchArea.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.addLocationtoFavorites = this.addLocationtoFavorites.bind(this);
    this.removeLocationFromFavorites = this.removeLocationFromFavorites.bind(
      this
    );
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
    navigator.geolocation.getCurrentPosition(
      pos => {
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
        console.log(results);
        results.forEach(result => {
          let photo = 'no photo';
          let text = 'no description';
          let url = 'URL N/A';

          // Check text is not blank
          if (Object.keys(result.snippets.items[0]).length !== 0) {
            text = result.snippets.items[0].detail.object.text;
            url = result.snippets.items[0].detail.object.canonicalUrl;
          }

          // Gen Photo URL
          if (result.photo) {
            let prefix = result.photo.prefix;
            let size = `${result.photo.height}x${result.photo.width}`;
            let suffix = result.photo.suffix;

            photo = `${prefix}${size}${suffix}`;
          }

          // Check URL not blank
          if (Object.keys(result.snippets.items[0]))
            geoJSONStore.push({
              coordinates: [
                result.venue.location.lng,
                result.venue.location.lat
              ],
              name: result.venue.name,
              text: text,
              photo: photo,
              address: result.venue.location.address,
              city: result.venue.location.city,
              state: result.venue.location.state,
              zipcode: result.venue.location.postalCode,
              url: url
            });
        });

        this.setState({
          geoJSONStore: geoJSONStore,
          currentSearch: searchValue
        });
      })
      .catch(err => {
        console.log('error with get nearby recommendations request: ', err);
      });
  }

  searchArea(e) {
    e.preventDefault();
    console.log('searching');
    const searchValue = e.target.value;

    this.getNearbyRecommendations(searchValue);
  }

  addLocationtoFavorites(locationInfo) {
    this.setState(
      {
        favoriteSpots: [...this.state.favoriteSpots, locationInfo]
      },
      () => {
        console.log('worked!', this.state.favoriteSpots);
      }
    );
  }

  removeLocationFromFavorites(locationIndex) {
    let newFavSpots = [...this.state.favoriteSpots];
    newFavSpots.splice(locationIndex, 1);

    this.setState({
      favoriteSpots: newFavSpots
    });
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
                  <div className="appWrapper">
                    <MapCanvas
                      {...this.state}
                      saveMarkers={this.saveCurrentMarkers}
                      addFav={this.addLocationtoFavorites}
                    />
                    <Sidebar
                      searchFunc={this.searchArea}
                      currUser={this.state.currentUser}
                    />
                    <Favorites
                      favSpots={this.state.favoriteSpots}
                      removeSpot={this.removeLocationFromFavorites}
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
