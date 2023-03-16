import React, { forwardRef } from "react";
import styled from "styled-components";
import { useGetCourtQuery } from "../api/courtsApi";
import {
  FlexBetweenBox,
  FlexCenterBox,
  IconButton,
  CourtTitle,
  CourtImg,
} from "./microComponets";
import { FavouriteIcon, CloseIcon, BasketballCourtIcon } from "./svgIcons";
import { CourtInfo, CourtPlayers, CourtChat } from "./index";

const PopupWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  max-height: 700px;
  border-radius: 20px;
  background: ${(props) => props.theme.popupBg};
  border: ${(props) => props.theme.popupBorder};
  box-shadow: 0 0 5px 0 #001107;
`;

const CourtHeader = styled(FlexBetweenBox)`
  padding: 3px 7px;
`;

const CourtPopup = ({ courtId, onClose }) => {
  const {
    data: court = {},
    isLoading,
    isError,
    error,
  } = useGetCourtQuery(courtId);
  console.log(court);
  return (
    <PopupWrapper>
      <CourtHeader>
        <IconButton>
          <FavouriteIcon />
        </IconButton>
        <CourtTitle>{court.name}</CourtTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </CourtHeader>
      <CourtImg src={court.picturePath} />
      <CourtInfo data={court} />
      <CourtPlayers />
      <CourtChat />
    </PopupWrapper>
  );
};

export default CourtPopup;
