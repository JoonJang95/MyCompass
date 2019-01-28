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
        zoom: 12
      });
    }

    if (this.props.geoJSONStore.length > 0) {
      console.log('adding Marks!');
      this.props.geoJSONStore.forEach(location => {
        let marker = new MapboxGL.Marker()
          .setLngLat(location.coordinates)
          .addTo(this.map);
      });
    }
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
      </React.Fragment>
    );
  }
}

export default Map;
