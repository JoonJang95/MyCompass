import React from 'react';
import Login from './Login.jsx';
import Questions from './Questions.jsx';
import RecommendationsMap from './RecommendationsMap.jsx';
import Recommendations from './Recommendations.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      gpsAccuracy: null,
      recommendations: [],
      lookingFor: null,
      headerlocation: null,
      last4sqCall: null
    };
  }

  getUserLocation() {
    navigator.geolocation.watchPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      };
    });
  }

  onLocationChange(region, gpsAccuracy) {
    this.setState({
      mapRegion: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
    });
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
        <RecommendationsMap />
      </div>
    );
  }
}

export default App;
