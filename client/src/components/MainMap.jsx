import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { randomPoint } from "@turf/random";
import MapGL, { Marker } from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { lightTheme, darkTheme } from "../styles/themes";
import { useGetMarkersQuery } from "../api/courtsApi";
import {
  FootballMarker,
  BasketballMarker,
  ModalWindow,
  BallsAnimation,
} from "./index";
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
  const theme = useSelector((s) => s.storage.theme);
  const token = useSelector((s) => s.storage.user?.token);
  const user = useSelector((s) => s.storage?.user);
  const favCourts = useSelector(
    (state) => state.storage?.user?.favouriteCourts
  );
  const mapStyle = useSelector((s) => s.storage.mapStyle);
  const viewState = useSelector((s) => s.storage.viewState);
  const courtsType = useSelector((s) => s.storage.courtsType);
  // const markerSize =
  //   viewState.zoom.toFixed(0) < 12
  //     ? viewState.zoom.toFixed(1) * 1.2
  //     : viewState.zoom.toFixed(0) < 13
  //     ? viewState.zoom.toFixed(1) * 1.5
  //     : viewState.zoom.toFixed(1) * 1.7;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    data: markers = [],
    isLoading,
    isError,
    isSuccess,
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
        })
      );
    }
  }, [token, user?.city?.value]);

  useEffect(() => {
    location.pathname === "/" && setIsModalOpen(false);
  }, [location]);

  useEffect(() => {
    location.pathname !== "/" && navigate("/");
  }, []);

  const onMapMove = useCallback((evt) => {
    dispatch(setViewState(evt));
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

  const renderMarker = (marker) => (
    <div key={marker.id} onClick={(e) => e.stopPropagation()}>
      <Marker
        key={marker.id}
        latitude={marker.geometry.coordinates[0]}
        longitude={marker.geometry.coordinates[1]}
        onClick={() => {
          onOpenCourtPopup(marker.courtId);
        }}
      >
        {marker.sport === "basketball" ? (
          <BasketballMarker size={25} />
        ) : (
          <FootballMarker size={25} />
        )}
      </Marker>
    </div>
  );

  const filteredMarkers =
    courtsType === "all"
      ? markers
      : markers.filter((marker) => marker.sport === courtsType);

  const markersMemo = useMemo(
    () => filteredMarkers?.map(renderMarker),
    [filteredMarkers, markers]
  );

  const ClusterMarker = ({ longitude, latitude, pointCount }) => (
    <Marker longitude={longitude} latitude={latitude}>
      <div style={{ background: "#f28a25" }}>{pointCount}</div>
    </Marker>
  );

  console.log(filteredMarkers);

  const bbox = [-160, -70, 160, 70];
  const points = randomPoint(50, { bbox }).features;
  points.forEach((point, index) => (point.id = index));

  return (
    <>
      <MapGL
        onLoad={closeLoadingScreen}
        // reuseMaps
        {...viewState}
        style={{ width: "100%", height: "100vh" }}
        onViewportChange={onMapMove}
        mapStyle={mapStyle}
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onClick={handleMapClick}
      >
        {isLoading && (
          <LoadingWrapper>
            <BallsAnimation />
          </LoadingWrapper>
        )}
        <Cluster
          radius={100}
          extent={512}
          nodeSize={64}
          component={ClusterMarker}
        >
          {/* {filteredMarkers.map(renderMarker)} */}
          {filteredMarkers.map((point) => (
            <Marker
              key={point.id}
              longitude={point.geometry.coordinates[1]}
              latitude={point.geometry.coordinates[0]}
            >
              <BasketballMarker size={25} />
            </Marker>
          ))}
        </Cluster>

        {addCourtMarker && (
          <Marker latitude={addCourtMarker.lat} longitude={addCourtMarker.lng}>
            <MarkerIcon />
          </Marker>
        )}
      </MapGL>

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

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
