import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button, FlexBetweenBox, Text, UserWidgetBtn } from "./microComponets";
import { darkTheme, lightTheme } from "../styles/themes";

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Username = styled(Text)`
  color: ${lightTheme.username};
  padding-left: 5px;
`;

const UserWidget = () => {
  const { picturePath, username } = useSelector((state) => state.user.user);
  const name = username.slice(0, 15);

  return (
    <UserWidgetBtn style={{fontFamily: "inherit"}}>
      <Username>{name || null}</Username>
      <Avatar src={picturePath || null} />
    </UserWidgetBtn>
  );
};

export default UserWidget;
