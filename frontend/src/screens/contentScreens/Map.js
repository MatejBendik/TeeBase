import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { getUsersLocationFetch } from "../../actions/user/getUsersLocationFetch";

const center = {
  lat: 49.0566535,
  lng: 20.3034108,
};

/* const usersLocation = [
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
]; */

const currentPosition = {
  lat: 49.0566535,
  lng: 20.3034108,
};

function Map() {
  const [usersLocation, setUsersLocation] = useState();

  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await getUsersLocationFetch();
        if (data === null) {
          alert("Nepodarilo sa načítať lokácie.");
        } else {
          setUsersLocation(Object.values(data));
        }
      } catch (err) {
        alert("Nepodarilo sa načítať lokácie.");
      }
    };

    getLocations();
  }, []);

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
    <div>
      <h2
        style={{
          backgroundColor: " rgba(206, 205, 205, 0.218)",
          padding: 10,
          textAlign: "center",
          borderRadius: 20,
        }}
      >
        Pozri, kde sa nachádzajú tvoji kamoši, ktorí sa tiež učia (alebo sa len
        tvária ;) .
      </h2>
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

        {Array.isArray(usersLocation)
          ? usersLocation.map((user) => {
              let lat = parseFloat(user.location.lat);
              let lng = parseFloat(user.location.lng);
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
                      <p>{user.username}</p>
                    </div>
                  </InfoWindow>
                </Marker>
              );
            })
          : null}
      </GoogleMap>
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
