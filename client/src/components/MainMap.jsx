import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Map, { Marker, Popup } from "react-map-gl";
import { lightTheme, darkTheme } from "../styles/themes";
import { useGetMarkersQuery } from "../api/courtsApi";
import { FootballMarker, BasketballMarker, ModalWindow } from "./index";
import { MarkerIcon } from "./svgIcons";
import { setViewState } from "../store/storageSlice";

const MainMap = ({
  closeLoadingScreen,
  setAddCourtMarker,
  addCourtMarker,
  setOpenedCourt,
  openedCourt,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useSelector((state) => state.storage.theme);
  const token = useSelector((state) => state.storage.user?.token);
  const user = useSelector((state) => state.storage?.user);
  const favCourts = useSelector(
    (state) => state.storage?.user?.favouriteCourts
  );
  const mapStyle = useSelector((state) => state.storage.mapStyle);
  const viewState = useSelector((state) => state.storage.viewState);
  const markerSize =
    viewState.zoom.toFixed(0) < 12
      ? viewState.zoom.toFixed(1) * 1.2
      : viewState.zoom.toFixed(0) < 13
      ? viewState.zoom.toFixed(1) * 1.5
      : viewState.zoom.toFixed(1) * 1.7;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    data: markers = [],
    isLoading,
    isError,
    error,
  } = useGetMarkersQuery();

  useEffect(() => {
    if (
      token &&
      user?.city?.coordinates?.length === 2 &&
      !user?.favouriteCourts?.length
    ) {
      dispatch(
        setViewState({
          longitude: user?.city?.coordinates[1],
          latitude: user?.city?.coordinates[0],
          zoom: 10,
          pitch: 0,
          bearing: 0,
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        })
      );
    } else if (token && !!user.favouriteCourts?.length) {
      dispatch(
        setViewState({
          longitude: favCourts[favCourts?.length - 1]?.coordinates[1],
          latitude: favCourts[favCourts?.length - 1]?.coordinates[0],
          zoom: 14,
          pitch: 0,
          bearing: 0,
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        })
      );
    }
  }, [token, user?.city?.value]);

  useEffect(() => {
    location.pathname === "/" && setIsModalOpen(false);
  }, [location]);

  const onMapMove = useCallback((evt) => {
    dispatch(setViewState(evt.viewState));
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
    viewState.zoom > 14.5 && setAddCourtMarker({ lat, lng });
  };

  // const markersMemo = useMemo(
  //   () =>
  //     markers.map((marker) => (
  //       <div key={marker._id} onClick={(e) => e.stopPropagation()}>
  //         <Marker
  //           latitude={marker.location.coordinates[0]}
  //           longitude={marker.location.coordinates[1]}
  //           onClick={() => {
  //             onOpenCourtPopup(marker.courtId);
  //           }}
  //         >
  //           {marker.sport === "basketball" ? (
  //             <BasketballMarker size={markerSize} />
  //           ) : (
  //             <FootballMarker size={markerSize} />
  //           )}
  //         </Marker>
  //       </div>
  //     )),
  //   [markers]
  // );

  return (
    <>
      <Map
        onLoad={closeLoadingScreen}
        reuseMaps
        {...viewState}
        style={{ width: "100%", height: "100vh" }}
        onMove={onMapMove}
        mapStyle={mapStyle}
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
                <BasketballMarker size={markerSize} />
              ) : (
                <FootballMarker size={markerSize} />
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
        opened={isModalOpen}
        closeModal={onCloseModal}
        openedCourt={openedCourt}
        setOpenedCourt={setOpenedCourt}
      />
    </>
  );
};

export default MainMap;
