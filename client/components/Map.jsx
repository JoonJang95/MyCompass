import React from 'react';
import MapboxGL from 'mapbox-gl';
const { MB_APIKEY, MB_STYLE } = require('../../envConfigs.js');

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    MapboxGL.accessToken = MB_APIKEY;

    this.map = new MapboxGL.Map({
      container: this.container,
      style: MB_STYLE,
      center: [-73.968285, 40.785091],
      zoom: 12
    });
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
      height: '500px'
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
