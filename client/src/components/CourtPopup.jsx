import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
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
} from "./microComponets";
import {
  FavouriteIcon,
  CloseIcon,
  BasketballCourtIcon,
  ShowHideIcon,
  BackIcon,
} from "./svgIcons";
import { CourtInfo, CourtPlayers, CourtChat, CourtPhotosSlider } from "./index";
import { useAddRemoveFavMutation } from "../api/userApi";
import { setFavCourts } from "../store/storageSlice";
import {
  setUserIdForNav,
  setCourtIdForNav,
  setModalTypeForNav,
} from "../store/navigateSlice";

const CourtPopup = forwardRef((props, ref) => {
  const { id, closeModal, changeModalType } = props;
  const dispatch = useDispatch();
  const { modalType, userId, courtId } = useSelector((state) => state.navigate);
  const {
    data: court = {},
    isLoading,
    isError,
    error,
  } = useGetCourtQuery(id || courtId);

  const onBackToUserInfo = () => {
    if (modalType === "userInfo" || modalType === "court") {
      changeModalType({ type: "userInfo", userid: userId });
    } else changeModalType({ type: "myInfo" });
  };

  const closeCourt = () => {
    closeModal();
    setTimeout(() => {
      dispatch(setModalTypeForNav("court"));
      dispatch(setUserIdForNav(""));
    }, 300);
  };

  return (
    <PopupWrapper ref={ref}>
      <FlexBetweenBox style={{ padding: "0 5px" }}>
        {(modalType === "userInfo" ||
          modalType === "myInfo" ||
          userId !== "") && (
          <BackBtn onClick={onBackToUserInfo}>
            <BackIcon />
          </BackBtn>
        )}
        <CourtTitle>{court.name}</CourtTitle>
        <CloseBtn onClick={closeCourt}>
          <CloseIcon />
        </CloseBtn>
      </FlexBetweenBox>
      <CourtPhotosSlider
        courtId={courtId}
        sport={court.sport}
        photos={court?.photos}
        changeModalType={changeModalType}
      />
      <CourtInfo data={court} />
      {/* <CourtChat /> */}
      <CourtPlayers
        changeModalType={changeModalType}
        court={court}
        courtId={courtId}
      />
    </PopupWrapper>
  );
});

export default CourtPopup;

const PopupWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  background: ${(props) => props.theme.popupBg};
  border-radius: 10px;
`;

const CourtTitle = styled(Title)`
  margin: ${(props) => (props.backBtn ? 0 : "0 auto")};
`;

CourtPopup.propTypes = {
  courtId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  changeModalType: PropTypes.func.isRequired,
  backBtn: PropTypes.bool,
};
