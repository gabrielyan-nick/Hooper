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
  UserInfo,
  MyInfo,
} from "./index";
import { setCourtIdForNav } from "../store/navigateSlice";

const MainMap = ({ closeLoadingScreen }) => {
  const theme = useSelector((state) => state.storage.theme);
  const userIdNav = useSelector((state) => state.navigate.userId);
  const dispatch = useDispatch();
  const [courtId, setCourtId] = useState(null);
  const [userId, setUserId] = useState(userIdNav);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 36.40292260918253,
    latitude: 49.91435295466242,
    zoom: 14,
  });
  const [modalType, setModalType] = useState("court");
  const logRegRef = useRef(null);
  const courtRef = useRef(null);
  const userRef = useRef(null);
  const nodeRef =
    modalType === "court"
      ? courtRef
      : modalType === "logReg"
      ? logRegRef
      : userRef;
  console.log(userId, userIdNav);
  const {
    data: markers = [],
    isLoading,
    isError,
    error,
  } = useGetMarkersQuery();

  const onOpenCourtPopup = (id) => {
    dispatch(setCourtIdForNav(id));
    setCourtId(id);
    setIsPopupOpen(true);
  };
  const onCloseCourtPopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      (modalType === "logReg" || modalType === "userInfo") &&
        setModalType("court");
    }, 300);
  };

  const changeModalType = ({ type, courtid = null, userid = userIdNav }) => {
    setModalType(type);
    setCourtId(courtid);
    setUserId(userid);
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
                courtId={courtId}
                closeModal={onCloseCourtPopup}
                changeModalType={changeModalType}
                ref={courtRef}
              />
            ) : modalType === "logReg" ? (
              <LoginRegisterScreen
                closeModal={onCloseCourtPopup}
                ref={logRegRef}
                changeModalType={changeModalType}
                backBtn
              />
            ) : (
              <UserInfo
                id={userId}
                closeModal={onCloseCourtPopup}
                changeModalType={changeModalType}
                ref={userRef}
              />
            )}
          </CSSTransition>
        </SwitchTransition>
      </ModalWindow>
    </>
  );
};

export default MainMap;
