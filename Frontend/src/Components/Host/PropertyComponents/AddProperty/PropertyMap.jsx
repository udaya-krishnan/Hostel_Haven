import React, { useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SearchBox } from '@mapbox/search-js-react';
import { REACT_APP_MAPBOX_TOKEN } from '../../../../secure';

function PropertyMap({ onLocationSelect }) {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });

  const [clickedLocation, setClickedLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapboxToken = REACT_APP_MAPBOX_TOKEN;

  // Function to fetch place name using reverse geocoding
  const fetchPlaceName = async (longitude, latitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      } else {
        return "Unknown Location";
      }
    } catch (error) {
      console.error("Error fetching place name:", error);
      return "Error fetching location";
    }
  };

  const handleMapClick = async (event) => {
    const [longitude, latitude] = event.lngLat.toArray();
    setClickedLocation({ latitude, longitude });
    setSelectedPlace(null);
    const placeName = await fetchPlaceName(longitude, latitude);
    onLocationSelect({
      latitude,
      longitude,
      name: placeName,
    });
  };

  const handleSearchResult = (result) => {
    const [longitude, latitude] = result.center;
    setClickedLocation({ latitude, longitude });
    setSelectedPlace(result);
    onLocationSelect({
      latitude,
      longitude,
      name: result.place_name,
    });
  };

  return (
    <div className="w-full h-auto bg-gray-100 rounded-lg overflow-hidden shadow">
      <div className="p-4 bg-white shadow-md rounded-t-lg">
        {/* <SearchBox
          accessToken={mapboxToken}
          onResult={handleSearchResult}
          placeholder="Search for a location..."
          className="w-full p-2 border border-gray-300 rounded"
        /> */}
      </div>

      <Map
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        style={{ width: '100%', height: '400px' }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        mapboxAccessToken={mapboxToken}
        onMove={(event) => setViewport(event.viewState)}
        onClick={handleMapClick}
      >
        <NavigationControl position="top-left" />
        {clickedLocation && (
          <Marker
            latitude={clickedLocation.latitude}
            longitude={clickedLocation.longitude}
            color="red"
          />
        )}
        {selectedPlace && (
          <Marker
            latitude={selectedPlace.geometry.coordinates[1]}
            longitude={selectedPlace.geometry.coordinates[0]}
            color="blue"
          />
        )}
      </Map>

      {/* Display clicked location details */}
      {clickedLocation && (
        <div className="p-4 bg-white shadow-lg rounded-b-lg">
          <h3 className="text-lg font-bold">Clicked Location Details</h3>
          <p>Latitude: {clickedLocation.latitude}</p>
          <p>Longitude: {clickedLocation.longitude}</p>
        </div>
      )}

      {/* Display selected place details */}
      {selectedPlace && (
        <div className="p-4 bg-white shadow-lg rounded-b-lg">
          <h3 className="text-lg font-bold">Search Result</h3>
          <p>Name: {selectedPlace.place_name}</p>
          <p>Latitude: {selectedPlace.geometry.coordinates[1]}</p>
          <p>Longitude: {selectedPlace.geometry.coordinates[0]}</p>
        </div>
      )}
    </div>
  );
}

export default PropertyMap;