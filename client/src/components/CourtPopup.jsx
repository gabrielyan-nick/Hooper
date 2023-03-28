import React, { forwardRef } from "react";
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
import { lightTheme } from "../styles/themes";

const PopupWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  background: ${(props) => props.theme.popupBg};
`;

const CourtImage = styled(CourtImg)`
  width: 103%;
  transform: translateX(-5px);
  margin-top: 5px;
`;

const ImgWrapper = styled.div`
  position: relative;
`;

const FavBtn = styled.div`
  position: absolute;
  bottom: 9px;
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

const CourtPopup = forwardRef((props, ref) => {
  const { courtId, closeModal, changeModalType, backBtn = false } = props;
  const {
    data: court = {},
    isLoading,
    isError,
    error,
  } = useGetCourtQuery(courtId);
  console.log(court);

  const onBackToUserInfo = () => changeModalType("userInfo");

  return (
    <PopupWrapper ref={ref}>
      <FlexBetweenBox>
        {backBtn && (
          <BackBtn onClick={onBackToUserInfo}>
            <BackIcon />
          </BackBtn>
        )}
        <CourtTitle>{court.name}</CourtTitle>
        <CloseBtn onClick={closeModal}>
          <CloseIcon />
        </CloseBtn>
      </FlexBetweenBox>
      <ImgWrapper>
        <CourtImage src={court.picturePath} />
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
    } else changeModalType("logReg");
  };
  return (
    <IconButton onClick={onAddRemoveFav}>
      {isFavCourt ? (
        <FavouriteIcon size={27} color="gold" />
      ) : (
        <FavouriteIcon size={27} />
      )}
    </IconButton>
  );
};
