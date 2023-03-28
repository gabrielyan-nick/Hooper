import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useCheckInMutation, useGetCourtPlayersQuery } from "../api/courtsApi";
import {
  Button,
  TextLineWrapper,
  FlexBetweenBox,
  Text,
} from "./microComponets";

const CourtPlayers = ({ changeModalType, court, courtId }) => {
  const { user } = useSelector((state) => state.storage);
  const [checkIn, result] = useCheckInMutation();
  const {
    data = {},
    isLoading,
    isSuccess,
    refetch,
  } = useGetCourtPlayersQuery(courtId);
  console.log(data);

  const checkInOnCourt = () => {
    if (user !== null) {
      const formData = new FormData();
      formData.append("_id", user._id);
      formData.append("username", user.username);
      checkIn({ courtId, formData, token: user.token })
        .then((result) => {
          console.log(result);
          refetch();
        })
        .catch((e) => console.log(e));
    } else changeModalType("logReg");
  };

  const getUniquePlayers = (arr) => {
    return arr?.reduce((acc, obj) => {
      const exists = acc.some((item) => item.username === obj.username);
      if (!exists) {
        acc.push(obj);
      }
      return acc;
    }, []);
  };

  return (
    <>
      <CourtPlayersWrapper>
        <ColumnWrapper>
          <Title>Були тут</Title>
          <PlayersList>
            {getUniquePlayers(data?.checkinPlayers)?.map((player) => (
              <Text key={player.createdAt}>{player.username}</Text>
            ))}
          </PlayersList>
        </ColumnWrapper>
        <ColumnWrapper>
          <Title>
            Зараз на {court.sport === "basketball" ? "майданчику" : "полі"}
          </Title>
          <PlayersList>
            {data?.players?.map((player) => (
              <Text key={player.createdAt}>{player.username}</Text>
            ))}
          </PlayersList>
        </ColumnWrapper>
      </CourtPlayersWrapper>
      <CheckInBtn onClick={checkInOnCourt}>
        Я на {court.sport === "basketball" ? "майданчику" : "полі"}
      </CheckInBtn>
    </>
  );
};

const PlayersList = styled(TextLineWrapper)`
  min-height: 50px;
  height: calc(100% - 24px);
`;

const Title = styled.h6`
  font-family: "Play", sans-serif;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 5px 5px;
  color: ${(props) => props.theme.textSecondary};
  @media ${(props) => props.theme.media.smallMobile} {
    font-size: 14px;
  }
`;

const ColumnWrapper = styled.div`
  width: 50%;
`;

const CourtPlayersWrapper = styled(FlexBetweenBox)`
  margin-top: 10px;
  align-items: normal;
  gap: 5px;
`;

const CheckInBtn = styled(Button)`
  padding: 5px 15px;
  margin: 20px auto 0;
  height: auto;
`;

export default CourtPlayers;
