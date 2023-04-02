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
import { CourtInfo, CourtPlayers, CourtChat } from "./index";
import { useAddRemoveFavMutation } from "../api/userApi";
import { setFavCourts } from "../store/storageSlice";
import {
  setUserIdForNav,
  setCourtIdForNav,
  setModalTypeForNav,
} from "../store/navigateSlice";

const CourtPopup = forwardRef((props, ref) => {
  const { courtId, closeModal, changeModalType } = props;
  const dispatch = useDispatch();
  const { modalType, userId } = useSelector((state) => state.navigate);
  const {
    data: court = {},
    isLoading,
    isError,
    error,
  } = useGetCourtQuery(courtId);

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
      <ImgWrapper>
        <CourtImage src={court?.photos} />

        <FavBtn>
          <AddRemoveFavourite
            courtId={court._id}
            changeModalType={changeModalType}
          />
        </FavBtn>
      </ImgWrapper>

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

const AddRemoveFavourite = ({ courtId, changeModalType }) => {
  const { user = {} } = useSelector((state) => state.storage);
  const dispatch = useDispatch();
  const isFavCourt = user?.favouriteCourts.some((item) => courtId === item._id);
  const [addRemoveFav, result] = useAddRemoveFavMutation();

  const onAddRemoveFav = async () => {
    if (user !== null) {
      const res = await addRemoveFav({
        _id: user._id,
        courtId,
        token: user.token,
      });
      if (!res.error && res.data) {
        dispatch(setFavCourts(res.data));
      }
    } else changeModalType({ type: "logReg" });
  };
  return (
    <AddFavBtn onClick={onAddRemoveFav}>
      {result.isLoading ? (
        <BtnSpinnerWrapper style={{ width: "27px", height: "27px" }}>
          <FavouriteIcon size={27} color="#19665480" />
        </BtnSpinnerWrapper>
      ) : isFavCourt ? (
        <FavouriteIcon size={27} color="#e4c307" />
      ) : (
        <FavouriteIcon size={27} color="#19665480" />
      )}
    </AddFavBtn>
  );
};

const AddFavBtn = styled(IconButton)`
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px;
`;

const PopupWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  background: ${(props) => props.theme.popupBg};
  border-radius: 10px;
`;

const CourtImage = styled(CourtImg)`
  width: 100%;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 5px;
`;

const FavBtn = styled.div`
  position: absolute;
  bottom: 9px;
  left: 5px;
  padding: 1px;
  border-radius: 7px;
  background: ${(props) => props.theme.popupBg};
  &:hover {
    background: ${(props) => props.theme.popupBg};
  }
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

AddRemoveFavourite.propTypes = {
  courtId: PropTypes.string,
  changeModalType: PropTypes.func.isRequired,
};
