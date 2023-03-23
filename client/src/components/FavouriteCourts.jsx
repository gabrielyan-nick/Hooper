import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  Button,
  FlexBetweenBox,
  Text,
  UserWidgetBtn,
  TextLineWrapper,
  FlexCenterBox,
  IconBtnBg,
} from "./microComponets";
import { darkTheme, lightTheme } from "../styles/themes";
// import {  } from "./index";
import { EnterIcon } from "./svgIcons";
import { BasketballMarker, FootballMarker } from "./markers";

const Title = styled.h6`
  font-family: "Play", sans-serif;
  font-weight: 600;
  font-size: 17px;
  margin: 20px 0 5px 17px;
  color: ${(props) => props.theme.textSecondary};
`;

const ListWrapper = styled(TextLineWrapper)`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 9px 10px;
`;

const EmptyText = styled(Text)`
  color: #7e7a7a;
`;

const FavouriteCourts = ({ corts }) => {
  return (
    <>
      <Title>Улюблені майданчики</Title>
      <ListWrapper>
        {corts.length ? (
          corts.map((court) => <FavCourt court={court} />)
        ) : (
          <EmptyText>Немає</EmptyText>
        )}
      </ListWrapper>
    </>
  );
};

export default FavouriteCourts;

const LineWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 10px;
  height: 27px;
  align-items: center;
`;

const GoToBtn = styled(IconBtnBg)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
  border-radius: 7px;
`;

const markers = {
  basketball: <BasketballMarker size={18} />,
  football: <FootballMarker size={18} />,
};

const FavCourt = ({ court }) => {
  return (
    <LineWrapper>
      {markers[court.sport]}
      <Text fS="18px">{court.name}</Text>
      <GoToBtn color={court.sport === "basketball" ? "orange" : "green"}>
        <EnterIcon />
      </GoToBtn>
    </LineWrapper>
  );
};
