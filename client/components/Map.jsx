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
      prevProps.location.longitude !== this.props.location.longitude ||
      prevProps.location.latitude !== this.props.location.latitude
    ) {
      MapboxGL.accessToken = MB_APIKEY;
      const { longitude, latitude } = this.props.location;

      this.map = new MapboxGL.Map({
        container: this.container,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [longitude, latitude],
        zoom: 12
      });
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '700px',
      height: '400px'
    };

    return (
      <div
        className="map"
        style={style}
        ref={ele => {
          this.container = ele;
        }}
      />
    );
  }
}

export default Map;
