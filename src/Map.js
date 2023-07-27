import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Cuboid from "./Cuboid";

const Map = () => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubnlyYWplbmRyYTk5IiwiYSI6ImNsa2piYnl1dzAzZzYzdXBjOWljdmMyYzkifQ.Hh0kzUgAfyQfdnkwjsnV7w';
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 10,
    });

    return () => map.current.remove();
  }, []);

  const handleCapture = () => {

    map.current.once('render', () => {
      map.current.getCanvas().toBlob((blob) => {
        setCapturedImage(URL.createObjectURL(blob));
      });
    });
    map.current.triggerRepaint();
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
      <button onClick={handleCapture}>Capture Image</button>
      {capturedImage && <Cuboid textureUrl={capturedImage} />}
    </div>
  );
};

export default Map;