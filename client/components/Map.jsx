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
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.049766, 38.900772]
      },
      properties: {
        iconSize: [50, 50],
        phoneFormatted: '(202) 507-8357',
        phone: '2025078357',
        address: '2221 I St NW',
        city: 'Washington DC',
        country: 'United States',
        crossStreet: 'at 22nd St NW',
        postalCode: '20037',
        state: 'D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.043929, 38.910525]
      },
      properties: {
        iconSize: [50, 50],
        phoneFormatted: '(202) 387-9338',
        phone: '2023879338',
        address: '1512 Connecticut Ave NW',
        city: 'Washington DC',
        country: 'United States',
        crossStreet: 'at Dupont Circle',
        postalCode: '20036',
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