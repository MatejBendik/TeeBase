import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const center = {
  lat: 49.0566535,
  lng: 20.3034108,
};

const usersLocation = [
  {
    name: "Miro",
    lat: 49.0566535,
    lng: 20.4034108,
  },
  {
    name: "Mato",
    lat: 49.5566535,
    lng: 20.3034108,
  },
  {
    name: "Oliver",
    lat: 49.4566535,
    lng: 20.7034108,
  },
  {
    name: "Lukas",
    lat: 49.0566535,
    lng: 20.8034108,
  },
  {
    name: "David",
    lat: 49.0566535,
    lng: 20.734108,
  },
];

const currentPosition = {
  lat: 49.0566535,
  lng: 20.3034108,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC2-n39eQnutXECIDc-9tlNMNFmxzshDtE",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    console.log(bounds);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div style={{ display: "flex" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDragEnd={() => console.log(map.getBounds())}
      >
        <Marker position={currentPosition}>
          <InfoWindow
            options={{
              pixelOffset: {
                width: 0,
                height: -45,
              },
            }}
            position={currentPosition}
          >
            <div>
              <p>Tu si ty</p>
            </div>
          </InfoWindow>
        </Marker>

        {usersLocation.map((user) => {
          let lat = parseFloat(user.lat);
          let lng = parseFloat(user.lng);
          return (
            <Marker
              position={{ lat: lat, lng: lng }}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            >
              <InfoWindow
                options={{
                  pixelOffset: {
                    width: 0,
                    height: -45,
                  },
                }}
                position={{ lat: lat, lng: lng }}
              >
                <div>
                  <p>{user.name}</p>
                </div>
              </InfoWindow>
            </Marker>
          );
        })}
      </GoogleMap>
      <div></div>
    </div>
  ) : (
    <></>
  );
}

const containerStyle = {
  width: "100%",
  height: "80vh",
};

export default React.memo(Map);
