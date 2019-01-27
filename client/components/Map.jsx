import React from 'react';
import mapboxgl from 'mapbox-gl';
import dotenv from 'dotenv';

const Map = () => {
  var map = new mapboxgl.Map({
    container: 'map',
    style: '',
    center: [-21.92, 64.1436],
    zoom: 13
  });

  return <div ref={map} />;
};

export default Map;
