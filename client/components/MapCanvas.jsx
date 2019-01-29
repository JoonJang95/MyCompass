import React from 'react';
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
    console.log('map component updating');
    if (
      prevProps.longitude !== this.props.longitude ||
      prevProps.latitude !== this.props.latitude ||
      (prevProps.currentUser !== this.props.currentUser &&
        this.props.gotLocation)
    ) {
      console.log('creating new map');
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
        console.log('there were old markers, so will remove them');
        this.deleteCurrentMarkers(this.state.mapMarkers);
      }
      console.log('adding new Marks!');
      let markerList = [];
      this.props.geoJSONStore.forEach(location => {
        let popup = new MapboxGL.Popup().setHTML(
          `<div class="popupWrapper"><img src=${
            location.photo
          } alt="photo not available" height="100" width="145"><h3>${
            location.name
          }</h3><p class="popupText">${location.text}</p></div>`
        );

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
    console.log('saving Markers!');
    this.setState(
      {
        mapMarkers: markers
      },
      () => {
        console.log('saved markers', this.state.mapMarkers);
      }
    );
  }

  deleteCurrentMarkers(markers) {
    markers.forEach(marker => {
      marker.remove();
    });
    console.log('removed markers');
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
