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
  PhotoWindow,
} from "./index";
import { setCourtIdForNav } from "../store/navigateSlice";
import { MarkerIcon } from "./svgIcons";

const MainMap = ({ closeLoadingScreen, setAddCourtMarker, addCourtMarker }) => {
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
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
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

  const openPhotoModal = () => setIsPhotoModalOpen(true);
  const closePhotoModal = () => setIsPhotoModalOpen(false);

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
        style={{ width: "100%", height: "100%" }}
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
                openPhoto={openPhotoModal}
                setUserPhoto={setUserPhoto}
              />
            )}
          </CSSTransition>
        </SwitchTransition>
      </ModalWindow>
      <PhotoWindow
        image={userPhoto}
        opened={isPhotoModalOpen}
        closeModal={closePhotoModal}
      />
    </>
  );
};

export default MainMap;
