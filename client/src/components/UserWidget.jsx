import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button, FlexBetweenBox, Text, UserWidgetBtn } from "./microComponets";
import { darkTheme, lightTheme } from "../styles/themes";
import { ModalWindow, MyInfo } from "./index";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { picturePath, username } = useSelector((state) => state.storage.user);
  const name = username.slice(0, 15);

  const opeUserWidgetModal = () => setIsModalOpen(true);
  const closUserWidgetModal = () => setIsModalOpen(false);

  return (
    <>
      <UserWidgetBtn
        style={{ fontFamily: "inherit" }}
        onClick={opeUserWidgetModal}
      >
        <Username>{name || null}</Username>
        <Avatar src={picturePath || null} />
      </UserWidgetBtn>

      <ModalWindow
        opened={isModalOpen}
        closeModal={closUserWidgetModal}
        closeClickOutside={false}
      ><MyInfo/></ModalWindow>
    </>
  );
};

export default UserWidget;
