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
import { AvatarChanged } from "./index";
import { ChangeIcon } from "./svgIcons";

const ChangeCityBtn = styled(IconBtnBg)`
  position: absolute;
  border-radius: 7px;
  right: 5px;
  top: 9px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const UserCityChanged = ({ city }) => {
  return (
    <Wrapper>
      <TextLineWrapper p="9px 33px 9px 15px">
        <Text fS="20px">
          <span>{city.label || null}</span>
        </Text>
      </TextLineWrapper>
      <ChangeCityBtn color="green">
        <ChangeIcon />
      </ChangeCityBtn>
    </Wrapper>
  );
};

export default UserCityChanged;
