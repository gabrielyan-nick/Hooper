import React, { useState } from "react";
import Map from "react-map-gl";


const MainMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 36.40292260918253,
    latitude: 49.91435295466242,
    zoom: 14,
  });

  return (
    <Map
      {...viewState}
      style={{ width: "100%", height: "100vh" }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    />
  );
};

export default MainMap;
