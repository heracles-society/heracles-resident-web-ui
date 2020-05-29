import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import React, {useState, useRef} from 'react';

import {wrapper, root} from './Map.module.css';
mapboxgl.accessToken =
  'pk.eyJ1IjoiY29udGFjdGF2aWtzYXJrYXIiLCJhIjoiY2s5eW11d3hxMHVkbjNrcXM3azdjbGphcyJ9.uBuuzGkPtqyetwkY8SnbWw';

export const Map = React.memo(props => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const {latitude, longitude, interactive, zoomLevel} = props;

  React.useEffect(() => {
    let active = true;
    const initializeMap = ({setMap, mapContainer}) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/contactaviksarkar/ck9zk6zkf1nc11ilhdqi20bgm', // stylesheet location
        center: [longitude, latitude],
        zoom: zoomLevel,
        interactive: interactive,
      });

      const size = 80;
      const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function () {
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },

        // called once before every frame where the icon will be used
        render: function () {
          const duration = 1000;
          const t = (performance.now() % duration) / duration;

          const radius = (size / 2) * 0.3;
          const outerRadius = (size / 2) * 0.7 * t + radius;
          const context = this.context;

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2,
          );
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
          context.fill();

          // draw inner circle
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = 'rgba(255, 100, 100, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          // update this image's data with data from the canvas
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          // continuously repaint the map, resulting in the smooth animation of the dot
          map.triggerRepaint();

          // return `true` to let the map know that the image was updated
          return true;
        },
      };

      map.on('load', () => {
        if (active) {
          setMap(map);
        }
        map.addImage('pulsing-dot', pulsingDot, {pixelRatio: 2});

        map.addSource('points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [longitude, latitude],
                },
              },
            ],
          },
        });
        map.addLayer({
          id: 'points',
          type: 'symbol',
          source: 'points',
          layout: {
            'icon-image': 'pulsing-dot',
          },
        });
        map.resize();
      });
    };

    if (!map) initializeMap({setMap, mapContainer});
    return () => {
      active = false;
    };
  }, [interactive, latitude, longitude, map, zoomLevel]);

  React.useEffect(() => {
    let active = true;
    if (active) {
      setMap(null);
    }
    return () => {
      active = false;
    };
  }, [latitude, longitude]);

  return (
    <div className={wrapper}>
      <div className={root} ref={el => (mapContainer.current = el)} />
    </div>
  );
});

Map.defaultProps = {
  interactive: false,
  longitude: 0,
  latitude: 0,
  zoomLevel: 13,
};

Map.propTypes = {
  interactive: PropTypes.bool,
  longitude: PropTypes.string,
  latitude: PropTypes.string,
};
