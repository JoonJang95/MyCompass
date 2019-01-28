import React from 'react';
import MapboxGL from 'mapbox-gl';
const { MB_APIKEY } = require('../../envConfigs.js');

var stores = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.034084142948, 38.909671288923]
      },
      properties: {
        iconSize: [50, 50],
        phoneFormatted: '(202) 234-7336',
        phone: '2022347336',
        address: '1471 P St NW',
        city: 'Washington DC',
        country: 'United States',
        crossStreet: 'at 15th St NW',
        postalCode: '20005',
        state: 'D.C.'
      }
    }
  ]
};

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

      stores.features.forEach(marker => {
        new MapboxGL.Marker()
          .setLngLat(marker.geometry.coordinates)
          .addTo(this.map);
      });
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div
        className="map"
        ref={ele => {
          this.container = ele;
        }}
      />
    );
  }
}

export default Map;
