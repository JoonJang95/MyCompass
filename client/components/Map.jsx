import React from 'react';
import MapboxGL from 'mapbox-gl';
const { MB_APIKEY } = require('../../envConfigs.js');

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    console.log('Location found, displaying map');
    if (
      prevProps.longitude !== this.props.longitude ||
      prevProps.latitude !== this.props.latitude
    ) {
      MapboxGL.accessToken = MB_APIKEY;
      const { longitude, latitude } = this.props;

      this.map = new MapboxGL.Map({
        container: this.container,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [longitude, latitude],
        zoom: 11
      });
    }

    if (this.props.geoJSONStore.length > 0) {
      console.log('adding Marks!');
      this.props.geoJSONStore.forEach(location => {
        console.log('add', this.marker);
        this.marker = new MapboxGL.Marker()
          .setLngLat(location.coordinates)
          .addTo(this.map);
      });
    }
  }

  removeMarkers() {
    console.log(this.marker);
    // this.marker.remove();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="map"
          ref={ele => {
            this.container = ele;
          }}
        />
        <div onClick={this.removeMarkers}>click me</div>
      </React.Fragment>
    );
  }
}

export default Map;
