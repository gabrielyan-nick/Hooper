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
} from "./microComponets";
import { FavouriteIcon, CloseIcon, BasketballCourtIcon } from "./svgIcons";
import { CourtInfo, CourtPlayers, CourtChat } from "./index";
import { useAddRemoveFavMutation } from "../api/userApi";
import { setFavCourts } from "../store/storageSlice";

const PopupWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  max-height: 700px;
  border-radius: 20px;
  background: ${(props) => props.theme.popupBg};
  box-shadow: 0 0 5px 0 #001107;
`;

const CourtHeader = styled(FlexBetweenBox)`
  padding: 3px 7px;
`;

const CourtPopup = forwardRef((props, ref) => {
  const { token, _id, favouriteCourts } = useSelector(
    (state) => state.storage.user
  );

  const dispatch = useDispatch();
  const {
    data: court = {},
    isLoading,
    isError,
    error,
  } = useGetCourtQuery(props.courtId);
  console.log(court);
  const isFavCourt = favouriteCourts.some((item) => court._id === item._id);

  const [addRemoveFav, result] = useAddRemoveFavMutation();

  const onAddRemoveFav = async () => {
    const res = await addRemoveFav({ _id, courtId: court._id, token });
    if (!res.error && res.data) {
      dispatch(setFavCourts(res.data));
    }
  };

  return (
    <PopupWrapper ref={ref}>
      <CourtHeader>
        <IconButton onClick={onAddRemoveFav}>
          {isFavCourt ? <FavouriteIcon color="gold" /> : <FavouriteIcon />}
        </IconButton>
        <Title>{court.name}</Title>
        <IconButton onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </CourtHeader>
      <CourtImg src={court.picturePath} />
      <CourtInfo data={court} />
      <CourtPlayers />
      <CourtChat />
    </PopupWrapper>
  );
});

export default CourtPopup;
