import React, { useState, useMemo, Fragment, useRef, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Map, { Marker, Popup } from "react-map-gl";
import { lightTheme, darkTheme } from "../styles/themes";
import { useGetMarkersQuery } from "../api/courtsApi";
import { FootballMarker, BasketballMarker, ModalWindow } from "./index";
import { MarkerIcon } from "./svgIcons";

const MainMap = ({ closeLoadingScreen, setAddCourtMarker, addCourtMarker }) => {
  const theme = useSelector((state) => state.storage.theme);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 36.40292260918253,
    latitude: 49.91435295466242,
    zoom: 14,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: markers = [],
    isLoading,
    isError,
    error,
  } = useGetMarkersQuery();

  useEffect(() => {
    location.pathname !== "/" ? setIsModalOpen(true) : setIsModalOpen(false);
  }, []);

  const onOpenCourtPopup = (id) => {
    setIsModalOpen(true);
    navigate(`/courts/${id}`);
  };
  const onCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/`);
  };

  const handleMapClick = (e) => {
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    setAddCourtMarker({ lat, lng });
  };

  return (
    <>
      <Map
        onLoad={closeLoadingScreen}
        reuseMaps
        {...viewState}
        style={{ width: "100%", height: "100vh" }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={theme === "light" ? lightTheme.mapStyle : darkTheme.mapStyle}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <div key={marker._id} onClick={(e) => e.stopPropagation()}>
            <Marker
              latitude={marker.location.coordinates[0]}
              longitude={marker.location.coordinates[1]}
              onClick={() => {
                onOpenCourtPopup(marker.courtId);
              }}
            >
              {marker.sport === "basketball" ? (
                <BasketballMarker />
              ) : (
                <FootballMarker />
              )}
            </Marker>
          </div>
        ))}
        {addCourtMarker && (
          <Marker latitude={addCourtMarker.lat} longitude={addCourtMarker.lng}>
            <MarkerIcon />
          </Marker>
        )}
      </Map>

      <ModalWindow opened={isModalOpen} closeModal={onCloseModal} />
    </>
  );
};

export default MainMap;
