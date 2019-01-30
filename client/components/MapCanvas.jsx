import React from 'react';
import ReactDOM from 'react-dom';
import MapboxGL from 'mapbox-gl';
const { MB_APIKEY } = require('../../envConfigs.js');

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapMarkers: []
    };

    this.saveCurrentMarkers = this.saveCurrentMarkers.bind(this);
    this.deleteCurrentMarkers = this.deleteCurrentMarkers.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.longitude !== this.props.longitude ||
      prevProps.latitude !== this.props.latitude ||
      (prevProps.currentUser !== this.props.currentUser &&
        this.props.gotLocation)
    ) {
      MapboxGL.accessToken = MB_APIKEY;
      const { longitude, latitude } = this.props;

      this.map = new MapboxGL.Map({
        container: this.container,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [longitude, latitude],
        zoom: 12
      });

      // Add Current Position

      let ele = document.createElement('div');
      ele.className = 'currentPositionMarker';

      let userLocation = new MapboxGL.Marker(ele)
        .setLngLat([longitude, latitude])
        .addTo(this.map);
    }

    // Add Markers w/ popups
    if (prevProps.currentSearch !== this.props.currentSearch) {
      if (this.state.mapMarkers.length > 0) {
        this.deleteCurrentMarkers(this.state.mapMarkers);
      }
      // Set up markers storage
      let markerList = [];

      this.props.geoJSONStore.forEach(location => {
        // Set up JSX Ele to place in mapbox popup
        let popUpDiv = document.createElement('div');
        let PopUpJSX = () => {
          return (
            <div className="popupWrapper">
              <img
                src={location.photo}
                alt="photo not available"
                height="100"
                width="145"
              />
              <h3>{location.name}</h3>
              <p className="popupText">{location.text}</p>
              <button onClick={() => this.props.addFav(location)}>
                Favorite this location
              </button>
            </div>
          );
        };

        ReactDOM.render(<PopUpJSX />, popUpDiv);

        let popup = new MapboxGL.Popup().setDOMContent(popUpDiv);

        let marker = new MapboxGL.Marker()
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(this.map);

        markerList.push(marker);
      });

      this.saveCurrentMarkers(markerList);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  saveCurrentMarkers(markers) {
    this.setState({
      mapMarkers: markers
    });
  }

  deleteCurrentMarkers(markers) {
    markers.forEach(marker => {
      marker.remove();
    });
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

export default MapCanvas;
