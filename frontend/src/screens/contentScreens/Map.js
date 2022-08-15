import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFoYXJzaGktYnl0ZXMiLCJhIjoiY2t6bm9vZGhiMG4wbDJubWdramNuYXA0cCJ9.a3hxMhSWb5XrZncyOgPmug";

export default function Map() {
  let [longitude, latitude, zoomSize] = [49, 20, 11];
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(zoomSize);
  const [resetBtn, setResetBtn] = useState(0);

  function updateMap(longitude, latitude) {
    // reset and initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: zoomSize,
    });
    setLng(longitude);
    setLat(latitude);
    setZoom(zoomSize);
  }

  /*   new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
   */
  function initialMap() {
    // on click reset map location
    setResetBtn(0);
    updateMap(longitude, latitude);
  }

  useEffect(() => {
    // initialize map only once
    if (map.current) return;
    updateMap(lng, lat);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      setResetBtn(1);
    });
  });

  return (
    <>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>

      <div ref={mapContainer} className="currentLocation" />

      {resetBtn === 1 && (
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab
            variant="extended"
            color="warning"
            aria-label="add"
            onClick={() => initialMap()}
            title="Reset Location"
          >
            <NavigationIcon sx={{ mr: 1 }} />
            Reset Location
          </Fab>
        </Box>
      )}
    </>
  );
}
