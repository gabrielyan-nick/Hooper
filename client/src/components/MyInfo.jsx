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
import { AvatarChanged, UserCityChanged, FavouriteCourts } from "./index";
import { ChangeIcon } from "./svgIcons";

const Wrapper = styled.div`
  padding: 30px 5px 20px;
`;

const FirstLineWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 58% 42%;
  width: 100%;
`;

const TextWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: space-between;
`;

const MyInfo = ({ openPhoto }) => {
  const { picturePath, username, city, favouriteCourts } = useSelector(
    (state) => state.storage.user
  );

  return (
    <Wrapper>
      <FirstLineWrapper>
        <TextWrapper>
          <TextLineWrapper>
            <Text fS="22px">{username || null}</Text>
          </TextLineWrapper>
          <UserCityChanged city={city} />
        </TextWrapper>
        <AvatarChanged photo={picturePath} openPhoto={openPhoto} />
      </FirstLineWrapper>
      <FavouriteCourts courts={favouriteCourts} />
    </Wrapper>
  );
};

export default MyInfo;
