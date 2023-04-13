import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button, FlexBetweenBox, Text, UserWidgetBtn } from "./microComponets";
import { darkTheme, lightTheme } from "../styles/themes";
import { ModalWindow } from "./index";

const SettingsWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onOpenModal = () => {
    setIsModalOpen(true);
    navigate("/my-info");
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/`);
  };
  return (
    <>
      <SettingsBtn onClick={onOpenModal}></SettingsBtn>

      <ModalWindow opened={isModalOpen} closeModal={onCloseModal} />
    </>
  );
};

export default SettingsWidget;

const SettingsBtn = styled(UserWidgetBtn)`
  background-color: ${lightTheme.greenUserWidget};
`;
