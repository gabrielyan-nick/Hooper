import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useCheckInMutation, useGetCourtPlayersQuery } from "../api/courtsApi";
import { Button, TextLineWrapper, FlexBetweenBox } from "./microComponets";

const CourtPlayersWrapper = styled(TextLineWrapper)`
  margin-top: 10px;
  padding: 5px;
`;

const CheckInBtn = styled(Button)`
  padding: 5px 15px;
  margin: 0 auto;
  height: auto;
`;

const CourtPlayers = ({ changeModalType, court, courtId }) => {
  const { user } = useSelector((state) => state.storage);
  const [checkIn, result] = useCheckInMutation();
  const {
    data = {},
    isLoading,
    isSuccess,
  } = useGetCourtPlayersQuery(courtId);
  console.log(data);

  const checkInOnCourt = () => {
    if (user !== null) {
      const formData = new FormData();
      formData.append("_id", user._id);
      formData.append("username", user.username);
      checkIn({ courtId: court._id, formData, token: user.token })
        .then((result) => {
          console.log(result);
        })
        .catch((e) => console.log(e));
    } else changeModalType("logReg");
  };

  return (
    <CourtPlayersWrapper>
      <FlexBetweenBox style={{ gap: "5px" }}>
        <PlayersList>{}</PlayersList>
        <PlayersList>{}</PlayersList>
      </FlexBetweenBox>

      <CheckInBtn onClick={checkInOnCourt}>
        Я на {court.sport === "basketball" ? "майданчику" : "полі"}
      </CheckInBtn>
    </CourtPlayersWrapper>
  );
};

const PlayersList = styled.div`
  border: 2px solid black;
  width: 50%;
  min-height: 100px;
  border-radius: 7px;
  margin-bottom: 10px;
`;

export default CourtPlayers;
