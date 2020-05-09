import mapboxgl from 'mapbox-gl';
import React, {useState, useRef, useCallback} from 'react';

import {wrapper, root} from './Map.module.css';
mapboxgl.accessToken =
  'pk.eyJ1IjoiY29udGFjdGF2aWtzYXJrYXIiLCJhIjoiY2s5eW11d3hxMHVkbjNrcXM3azdjbGphcyJ9.uBuuzGkPtqyetwkY8SnbWw';

export const Map = props => {
  const [longitude, setLongitude] = useState(77.642412);
  const [latitude, setLatitude] = useState(12.911103);
  const [zoom, setZoom] = useState(13);
  const mapBoxRef = useRef(null);

  const mapEl = useCallback(
    mapElement => {
      if (mapElement !== null) {
        let map = mapBoxRef.current;
        if (map === null) {
          map = new mapboxgl.Map({
            container: mapElement,
            style:
              'mapbox://styles/contactaviksarkar/ck9zk6zkf1nc11ilhdqi20bgm',
            center: [longitude, latitude],
            zoom: zoom,
          });
          mapBoxRef.current = map;
        }
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
            context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2,
            );
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(
              0,
              0,
              this.width,
              this.height,
            ).data;

            // continuously repaint the map, resulting in the smooth animation of the dot
            map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
          },
        };
        map.on('move', () => {
          const lng = map.getCenter().lng.toFixed(4);
          const lat = map.getCenter().lat.toFixed(4);
          const zoom = map.getZoom().toFixed(2);

          setLongitude(lng);
          setLatitude(lat);
          setZoom(zoom);
        });

        map.on('load', function () {
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
        });
      }
    },
    [latitude, longitude, zoom],
  );

  return (
    <div className={wrapper}>
      <div className={root} ref={mapEl} />
    </div>
  );
};
