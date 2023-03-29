import React, { useEffect, useState, forwardRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useCheckInMutation, useGetCourtPlayersQuery } from "../api/courtsApi";
import {
  Button,
  TextLineWrapper,
  FlexBetweenBox,
  Text,
  IconBtnBg,
} from "./microComponets";
import { EnterIcon } from "./svgIcons";

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

  return (
    <div>
      <TitlesWrapper>
        <Title>Були тут</Title>
        <Title>
          Зараз на {court.sport === "basketball" ? "майданчику" : "полі"}
        </Title>
      </TitlesWrapper>
      <PlayersList>
        <ColumnWrapper>
          {data?.checkinPlayers?.map((player) => (
            <Player
              key={player.createdAt}
              user={player}
              changeModalType={changeModalType}
            />
          ))}
        </ColumnWrapper>
        <Divider />
        <ColumnWrapper>
          {data?.players?.map((player) => (
            <Player
              key={player.createdAt}
              user={player}
              changeModalType={changeModalType}
            />
          ))}
        </ColumnWrapper>
      </PlayersList>
      <CheckInBtn onClick={checkInOnCourt}>
        Я на {court.sport === "basketball" ? "майданчику" : "полі"}
      </CheckInBtn>
    </div>
    // <CourtPlayersWrapper>
    //   <ColumnWrapper>
    //     <PlayersList>
    //       {data?.checkinPlayers?.map((player) => (
    //         <Text key={player.createdAt}>{player.username}</Text>
    //       ))}
    //     </PlayersList>
    //   </ColumnWrapper>
    //   <ColumnWrapper>
    //     <PlayersList>
    //       {data?.players?.map((player) => (
    //         <Text key={player.createdAt}>{player.username}</Text>
    //       ))}
    //     </PlayersList>
    //   </ColumnWrapper>
    // </CourtPlayersWrapper>
    // <CheckInBtn onClick={checkInOnCourt}>
    //   Я на {court.sport === "basketball" ? "майданчику" : "полі"}
    // </CheckInBtn>
  );
};

const Player = memo(
  forwardRef((props, ref) => {
    const { user, changeModalType } = props;
    const onChangeToUser = () => changeModalType("user");

    return (
      <LineWrapper ref={ref}>
        <UserName>{user.username}</UserName>
        <GoToBtn color="green" onClick={onChangeToUser}>
          <EnterIcon />
        </GoToBtn>
      </LineWrapper>
    );
  })
);

const LineWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 5px;
  height: 25px;
  align-items: center;
  & + div {
    margin-top: 3px;
  }
`;

const UserName = styled(Text)`
  width: 83%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const GoToBtn = styled(IconBtnBg)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1px;
  border-radius: 7px;
`;

const PlayersList = styled(TextLineWrapper)`
  min-height: 30px;
  display: flex;
  padding: 3px 0;
`;

const Divider = styled.div`
  width: 3px;
  border-radius: 80px;
  background-color: ${(props) => props.theme.textSecondary};
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

const TitlesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 10px;
`;

const ColumnWrapper = styled.div`
  width: 50%;
  padding: 0 3px 0 7px;
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
