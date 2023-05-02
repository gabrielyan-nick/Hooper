import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";
import Map, { Marker, useMap, NavigationControl } from "react-map-gl";
import useSupercluster from "use-supercluster";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { lightTheme } from "../styles/themes";
import { useGetMarkersQuery } from "../api/courtsApi";
import {
  FootballMarker,
  BasketballMarker,
  ModalWindow,
  BallsAnimation,
  ErrorBoundary,
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
  const token = useSelector((s) => s.storage.user?.token);
  const user = useSelector((s) => s.storage?.user);
  const favCourts = useSelector(
    (state) => state.storage?.user?.favouriteCourts
  );
  const mapStyle = useSelector((s) => s.storage.mapStyle);
  const viewState = useSelector((s) => s.storage.viewState);
  const courtsType = useSelector((s) => s.storage.courtsType);
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
  const { map } = useMap();

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
    viewState.zoom > 14.5 &&
      !e.originalEvent.target.closest(".mapboxgl-marker") &&
      setAddCourtMarker({ lat, lng });
  };

  const filteredMarkers =
    courtsType === "all"
      ? markers
      : markers.filter((marker) => marker.properties.sport === courtsType);

  const bounds = map?.getBounds().toArray().flat();

  const { clusters, supercluster } = useSupercluster({
    points: filteredMarkers,
    bounds: map ? [bounds[1], bounds[0], bounds[3], bounds[2]] : null,
    zoom: viewState.zoom,
    options: {
      radius: 40,
      maxZoom: 14,
    },
  });

  const onZoomCluster = (id, longitude, latitude) => {
    const zoom = supercluster.getClusterExpansionZoom(id);
    map?.flyTo({ center: [longitude, latitude], zoom });
  };

  return (
    <>
      <Map
        id="map"
        reuseMaps
        {...viewState}
        onMove={onMapMove}
        mapStyle={mapStyle}
        onClick={handleMapClick}
        onLoad={closeLoadingScreen}
        style={{ width: "100%", height: "100vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {isLoading && (
          <LoadingWrapper>
            <BallsAnimation />
          </LoadingWrapper>
        )}
        {clusters?.map((point) => {
          const [latitude, longitude] = point.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            point.properties;
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${point.id}`}
                longitude={longitude}
                latitude={latitude}
                onClick={() => onZoomCluster(point.id, longitude, latitude)}
              >
                <ClusterMark>{pointCount}</ClusterMark>
              </Marker>
            );
          } else
            return (
              <Marker
                key={point._id}
                latitude={latitude}
                longitude={longitude}
                onClick={() => {
                  onOpenCourtPopup(point.properties.courtId._id);
                }}
              >
                {point.properties.sport === "basketball" ? (
                  <BasketballMarker
                    size={25}
                    playersCount={point.properties.courtId?.players?.length}
                  />
                ) : (
                  <FootballMarker
                    size={25}
                    playersCount={point.properties.courtId?.players?.length}
                  />
                )}
              </Marker>
            );
        })}

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

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ClusterMark = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 3px solid #039751;
  background: ${lightTheme.orange};
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
  width: 30px;
  height: 30px;
  font-weight: 700;
  font-size: 16px;
  font-family: "Play", sans-serif;
  color: ${lightTheme.username};
`;
