import React, { useState, useMemo, Fragment, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Map, { Marker, Popup } from "react-map-gl";
import { lightTheme, darkTheme } from "../styles/themes";
import { useGetMarkersQuery } from "../api/courtsApi";
import {
  FootballMarker,
  BasketballMarker,
  CourtPopup,
  LoadingScreen,
} from "./index";

const MainMap = ({ closeLoadingScreen }) => {
  const theme = useSelector((state) => state.storage.theme);
  const [currentMarkerId, setCurrentMarkerId] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 36.40292260918253,
    latitude: 49.91435295466242,
    zoom: 14,
  });
  const courtRef = useRef(null);

  const {
    data: markers = [],
    isLoading,
    isError,
    error,
  } = useGetMarkersQuery();

  const handleMarkerClick = (id) => setCurrentMarkerId(id);
  const onClosePopup = () => setCurrentMarkerId(null);

  const markersAndPopup = useMemo(
    () =>
      markers.map((marker) => (
        <Fragment key={marker._id}>
          <Marker
            latitude={marker.location.coordinates[0]}
            longitude={marker.location.coordinates[1]}
            onClick={() => handleMarkerClick(marker._id)}
          >
            {marker.sport === "basketball" ? (
              <BasketballMarker />
            ) : (
              <FootballMarker />
            )}
          </Marker>
          {marker._id === currentMarkerId && (
            <Popup
              key={marker._id}
              latitude={marker.location.coordinates[0]}
              longitude={marker.location.coordinates[1]}
              closeOnClick={false}
              closeButton={false}
              anchor="top"
              maxWidth="380px"
              style={{ width: "80%", maxWidth: "380px" }}
              offset={15}
            >
              <CourtPopup courtId={marker.courtId} onClose={onClosePopup} />
            </Popup>
          )}
        </Fragment>
      )),
    [markers, currentMarkerId]
  );

  return (
    <Map
      onLoad={closeLoadingScreen}
      reuseMaps
      {...viewState}
      style={{ width: "100%", height: "100%" }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle={theme === "light" ? lightTheme.mapStyle : darkTheme.mapStyle}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {markersAndPopup}
    </Map>
  );
};

export default MainMap;
