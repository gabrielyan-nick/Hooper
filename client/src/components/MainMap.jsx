import React, { useState, useMemo, Fragment, useRef, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
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
  ModalWindow,
  LoginRegisterScreen,
} from "./index";

const MainMap = ({ closeLoadingScreen }) => {
  const theme = useSelector((state) => state.storage.theme);
  const [currentCourtId, setCurrentCourtId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 36.40292260918253,
    latitude: 49.91435295466242,
    zoom: 14,
  });
  const [modalType, setModalType] = useState("court");
  const logRegRef = useRef(null);
  const courtRef = useRef(null);
  const nodeRef = modalType === "court" ? courtRef : logRegRef;

  const {
    data: markers = [],
    isLoading,
    isError,
    error,
  } = useGetMarkersQuery();

  const onOpenCourtPopup = (id) => {
    setCurrentCourtId(id);
    setIsPopupOpen(true);
  };
  const onCloseCourtPopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      modalType === "logReg" && setModalType("court");
    }, 300);
  };

  const changeModalType = (type) => {
    setModalType(type);
    // setCourtId(id);
  };

  return (
    <>
      <Map
        onLoad={closeLoadingScreen}
        reuseMaps
        {...viewState}
        style={{ width: "100%", height: "100%" }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={theme === "light" ? lightTheme.mapStyle : darkTheme.mapStyle}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {markers.map((marker) => (
          <Marker
            key={marker._id}
            latitude={marker.location.coordinates[0]}
            longitude={marker.location.coordinates[1]}
            onClick={() => onOpenCourtPopup(marker.courtId)}
          >
            {marker.sport === "basketball" ? (
              <BasketballMarker />
            ) : (
              <FootballMarker />
            )}
          </Marker>
        ))}
      </Map>

      <ModalWindow
        opened={isPopupOpen}
        closeModal={onCloseCourtPopup}
        closeClickOutside={false}
        isEmptyHeader={false}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            nodeRef={nodeRef}
            key={modalType}
            classNames="switch"
            timeout={300}
          >
            {modalType === "court" ? (
              <CourtPopup
                courtId={currentCourtId}
                closeModal={onCloseCourtPopup}
                changeModalType={changeModalType}
                ref={courtRef}
              />
            ) : (
              <LoginRegisterScreen
                closeModal={onCloseCourtPopup}
                ref={logRegRef}
                changeModalType={changeModalType}
                backBtn
              />
            )}
          </CSSTransition>
        </SwitchTransition>
      </ModalWindow>
    </>
  );
};

export default MainMap;
