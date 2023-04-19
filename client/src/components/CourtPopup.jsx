import React, { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { useGetCourtQuery } from "../api/courtsApi";
import {
  FlexBetweenBox,
  FlexCenterBox,
  IconButton,
  Title,
  CourtImg,
  CloseBtn,
  IconBtnBg,
  BackBtn,
  Button,
  BtnSpinnerWrapper,
  LoadingScreenWrapper,
} from "./microComponets";
import {
  FavouriteIcon,
  CloseIcon,
  BasketballCourtIcon,
  ShowHideIcon,
  BackIcon,
} from "./svgIcons";
import {
  CourtInfo,
  CourtPlayers,
  CourtChat,
  CourtPhotosSlider,
  CourtChatPreview,
  BallsAnimation,
  LoadingScreen,
  BallSpinner,
} from "./index";
import { setViewState } from "../store/storageSlice";

const CourtPopup = forwardRef((props, ref) => {
  const {
    closeModal,
    history,
    goBack,
    setEditedCourt,
    setOpenedCourt,
    socket,
  } = props;
  const { courtId } = useParams();
  const {
    data: court = {},
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetCourtQuery(courtId);
  const dispatch = useDispatch();
  const loadingRef = useRef(null);

  useEffect(() => {
    if (isSuccess) {
      setEditedCourt(court);
      setOpenedCourt(court?.name);
      dispatch(
        setViewState({
          longitude: court?.location?.coordinates[1],
          latitude: court?.location?.coordinates[0],
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
  }, [court, isSuccess]);

  const isBackBtn = history.length > 1 && history[history.length - 2] !== "/";

  return (
    <PopupWrapper ref={ref}>
      <CSSTransition
        nodeRef={loadingRef}
        in={isLoading}
        timeout={1700}
        classNames="loading-hide"
        unmountOnExit
      >
        <LoadingScreenWrapper ref={loadingRef}>
          <BallSpinner />
        </LoadingScreenWrapper>
      </CSSTransition>
      <div style={{ width: "100%", paddingBottom: "10px" }}>
        <FlexBetweenBox style={{ padding: "5px 5px 0 5px" }}>
          {isBackBtn && (
            <BackBtn onClick={goBack}>
              <BackIcon />
            </BackBtn>
          )}
          <CourtTitle backBtn={isBackBtn}>{court?.name}</CourtTitle>
          <CloseBtn onClick={closeModal}>
            <CloseIcon />
          </CloseBtn>
        </FlexBetweenBox>
        <CourtPhotosSlider
          courtId={courtId}
          sport={court?.sport}
          photos={court?.photos}
        />
        <CourtInfo data={court} />
        <CourtChatPreview
          messages={court?.messages}
          courtId={court?._id}
          chatId={court?.chatId}
          socket={socket}
        />
        <CourtPlayers court={court} courtId={courtId} />
      </div>
    </PopupWrapper>
  );
});

export default CourtPopup;

const PopupWrapper = styled.div`
  width: 100%;
  min-height: 465px;
  background: ${(props) => props.theme.popupBg};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CourtTitle = styled(Title)`
  margin: ${(props) => (props.backBtn ? 0 : "0 auto")};
  padding-left: ${(props) => (props.backBtn ? 0 : "29px")};
`;

CourtPopup.propTypes = {
  courtId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  backBtn: PropTypes.bool,
};
