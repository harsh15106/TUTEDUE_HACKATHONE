import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet-geosearch/dist/geosearch.css';
import './MapView.css';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const SearchControl = () => {
  const map = useMap();
  const searchControlRef = useRef(null);

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      showMarker: true,
      showPopup: true,
      marker: {
        icon: markerIcon
      },
      popupFormat: ({ label }) => `📍 ${label}`,
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Search location...',
      keepResult: true
    });

    searchControlRef.current = searchControl;
    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const MapView = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  }, []);

  return (
    <div className="mapview-container">
      <h2>Supplier Delivery Locations</h2>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '500px', borderRadius: '12px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={position} icon={markerIcon}>
            <Popup>You are here</Popup>
          </Marker>
          <SearchControl />
        </MapContainer>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default MapView;
